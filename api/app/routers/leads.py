from fastapi import APIRouter

router = APIRouter(prefix="/leads", tags=["Leads"])


@router.post("/capture")
async def capture_lead(payload: dict):
    """Capture a lead from the pricing page."""
    return {"message": "Lead captured", "lead_id": "mock"}
