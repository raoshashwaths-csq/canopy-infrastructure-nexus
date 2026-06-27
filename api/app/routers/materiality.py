from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter(prefix="/esg/materiality", tags=["ESG — Materiality"])


@router.get("/entries")
async def fetch_entries(company_id: str, db: AsyncSession = Depends(get_db)):
    """Fetch materiality entries."""
    return []


@router.post("/entries")
async def create_entry(payload: dict, db: AsyncSession = Depends(get_db)):
    """Create a new materiality entry."""
    return {"message": "Entry created", "entry_id": "mock"}
