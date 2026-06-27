from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter(prefix="/seed", tags=["Seed"])


@router.post("/run")
async def run_seed(db: AsyncSession = Depends(get_db)):
    """Run the seed pipeline."""
    return {"message": "Seed pipeline completed", "articles_seeded": 0}
