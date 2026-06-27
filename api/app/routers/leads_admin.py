from fastapi import APIRouter

router = APIRouter(prefix="/leads-admin", tags=["Admin — Leads"])


@router.get("/")
async def list_leads():
    """List all captured leads."""
    return []
