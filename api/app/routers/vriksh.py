from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter(prefix="/tasks", tags=["Vriksh AI"])


@router.post("/ingest")
async def ingest_document(payload: dict, db: AsyncSession = Depends(get_db)):
    """Ingest a document through the Vriksh AI pipeline."""
    return {"task_id": "mock", "status": "queued"}


@router.post("/query")
async def vriksh_query(payload: dict, db: AsyncSession = Depends(get_db)):
    """Query the Vriksh AI engine."""
    return {
        "answer": "I can help you with environmental law queries. Please ask a specific question.",
        "chunks_used": 0,
        "confidence": 0.0,
    }


@router.get("/documents")
async def list_documents(db: AsyncSession = Depends(get_db)):
    """List ingested documents."""
    return []
