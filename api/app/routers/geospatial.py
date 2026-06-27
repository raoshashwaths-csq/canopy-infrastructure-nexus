from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter(prefix="/esg/geospatial", tags=["ESG — Geospatial"])


@router.get("/plots")
async def fetch_plots(company_id: str, db: AsyncSession = Depends(get_db)):
    """Fetch afforestation plots."""
    return []


@router.post("/plots")
async def create_plot(payload: dict, db: AsyncSession = Depends(get_db)):
    """Register a new plot."""
    return {"message": "Plot registered", "plot_id": "mock"}
