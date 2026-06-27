from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter(prefix="/esg/social-framework", tags=["ESG — Social Framework"])


@router.get("/projects")
async def fetch_projects(company_id: str, db: AsyncSession = Depends(get_db)):
    """Fetch FPIC projects."""
    return []


@router.post("/projects")
async def create_project(payload: dict, db: AsyncSession = Depends(get_db)):
    """Create a new FPIC project."""
    return {"message": "Project created", "project_id": "mock"}
