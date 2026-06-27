"""
CIN Document Chunking Service
Splits documents into semantic chunks for vector storage.
"""

def chunk_document(text: str, chunk_size: int = 500, overlap: int = 50) -> list[dict]:
    """Split text into overlapping chunks."""
    if not text:
        return []

    chunks = []
    start = 0
    chunk_idx = 0

    while start < len(text):
        end = min(start + chunk_size, len(text))
        # Try to end at a sentence boundary
        if end < len(text):
            for delimiter in ['. ', '\n\n', '\n']:
                pos = text.rfind(delimiter, start, end)
                if pos > start + chunk_size // 2:
                    end = pos + len(delimiter)
                    break

        chunk_text = text[start:end].strip()
        if chunk_text:
            chunks.append({
                "text": chunk_text,
                "index": chunk_idx,
                "metadata": {"start": start, "end": end},
            })
            chunk_idx += 1

        start = end - overlap if end < len(text) else end

    return chunks
