from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter(prefix="/karmayogi", tags=["Karmayogi"])


@router.get("/mappings")
async def list_mappings(db: AsyncSession = Depends(get_db)):
    """List Karmayogi ontology mappings."""
    return []


@router.post("/mappings")
async def create_mapping(payload: dict, db: AsyncSession = Depends(get_db)):
    """Create a new ontology mapping."""
    return {"message": "Mapping created"}
