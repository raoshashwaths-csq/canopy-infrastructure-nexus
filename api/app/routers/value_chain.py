from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter(prefix="/esg/value-chain", tags=["ESG — Value Chain"])


@router.get("/summary")
async def fetch_summary(company_id: str, db: AsyncSession = Depends(get_db)):
    """Fetch value chain summary."""
    return {
        "total_vendors": 0,
        "verified_vendors": 0,
        "gap_identified": 0,
        "pending_intake": 0,
        "total_scope1_tco2e": 0,
        "total_scope2_tco2e": 0,
        "total_procurement_share": 0,
    }


@router.get("/vendors")
async def fetch_vendors(company_id: str, db: AsyncSession = Depends(get_db)):
    """Fetch vendors for a company."""
    return []


@router.post("/vendors")
async def create_vendor(payload: dict, db: AsyncSession = Depends(get_db)):
    """Create a new vendor."""
    return {"message": "Vendor created", "vendor_id": "mock"}
