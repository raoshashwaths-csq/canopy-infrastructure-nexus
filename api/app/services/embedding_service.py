"""
CIN Embedding Service
Generates vector embeddings for document chunks.
"""

import os

from app.core.logging import get_logger

logger = get_logger(__name__)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")


def generate_embedding(text: str) -> list[float] | None:
    """Generate embedding vector for text. Returns None if OpenAI unavailable."""
    if not OPENAI_API_KEY:
        logger.warning("OpenAI API key not configured, returning None for embedding")
        return None

    try:
        import openai
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text[:8000],  # Token limit safety
        )
        return response.data[0].embedding
    except Exception as e:
        logger.error("Embedding generation failed", error=str(e))
        return None
