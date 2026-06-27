"""
CIN Hardened Scraper Engine
Multi-source scraper with validation checkpoint before LLM processing.
"""

import re
from datetime import datetime

from app.core.logging import get_logger

logger = get_logger(__name__)

SOURCES = {
    "moefcc": {"url": "https://moef.gov.in", "category": "Policy"},
    "pib": {"url": "https://pib.gov.in", "category": "Press Release"},
    "ngt": {"url": "https://greentribunal.gov.in", "category": "Judgment"},
}


def validate_payload(text: str, title: str = "") -> tuple[bool, str]:
    """
    Validation checkpoint: reject empty/blocked payloads BEFORE LLM.
    Returns (is_valid, reason).
    """
    if not text or len(text.strip()) < 50:
        return False, "Payload too short or empty"

    if any(phrase in text.lower() for phrase in [
        "access denied", "403 forbidden", "captcha required",
        "cloudflare", "blocked", "robot check"
    ]):
        return False, "Source blocked or protected"

    # Check for hallucinated future dates
    year_matches = re.findall(r'\b(20[0-9]{2})\b', text)
    current_year = datetime.now().year
    for y in year_matches:
        if int(y) > current_year:
            return False, f"Contains future date {y} — possible hallucination"

    return True, "Valid"


def scrape_source(source: str, max_articles: int = 5) -> list[dict]:
    """Scrape articles from a source with full validation."""
    info = SOURCES.get(source, {})
    if not info:
        logger.warning(f"Unknown source: {source}")
        return []

    # In production, this would do actual HTTP scraping
    # For now, return validated mock data
    articles = [
        {
            "title": f"Sample article from {source}",
            "url": f"{info['url']}/article/1",
            "text": f"This is validated content from {source} about environmental regulations in India. " * 20,
            "date": "2026-06-15",
        }
    ]

    validated = []
    for article in articles:
        is_valid, reason = validate_payload(article["text"], article["title"])
        if is_valid:
            validated.append(article)
        else:
            logger.warning(f"Rejected article: {reason}", title=article["title"])

    return validated
