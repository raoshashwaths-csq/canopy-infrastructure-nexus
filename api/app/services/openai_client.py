"""
CIN OpenAI Client
Shared OpenAI client for Vriksh AI processing.
"""

import os

from app.core.logging import get_logger

logger = get_logger(__name__)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")


def get_client():
    """Get OpenAI client instance."""
    if not OPENAI_API_KEY:
        logger.warning("OpenAI API key not configured")
        return None
    import openai
    return openai.OpenAI(api_key=OPENAI_API_KEY)


def vriksh_filter(text: str, title: str = "") -> dict:
    """
    Run Vriksh AI filter on scraped text.
    Returns classification, summary, and compliance flags.
    """
    client = get_client()
    if not client:
        return {
            "classification": "General",
            "summary": text[:300] + "..." if len(text) > 300 else text,
            "compliance_flags": {},
            "confidence": 0.5,
        }

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are the Vriksh AI content filter for CIN (Canopy & Infrastructure Nexus). "
                        "Analyze the provided text about Indian environmental law, forestry, ESG, or governance. "
                        "Return ONLY valid JSON with keys: classification (string), summary (string), "
                        "compliance_flags (object), confidence (number 0-1). "
                        "Current date: 2026-06-27. REJECT any content claiming to be from after this date."
                    ),
                },
                {
                    "role": "user",
                    "content": f"Title: {title}\n\nContent: {text[:8000]}",
                },
            ],
            response_format={"type": "json_object"},
            max_tokens=1000,
        )
        import json
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        logger.error("Vriksh filter failed", error=str(e))
        return {
            "classification": "General",
            "summary": text[:300] + "..." if len(text) > 300 else text,
            "compliance_flags": {},
            "confidence": 0.0,
        }
