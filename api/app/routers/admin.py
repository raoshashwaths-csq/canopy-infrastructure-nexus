from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/revenue")
async def revenue_insights():
    """Get revenue insights."""
    return {"subscriptions": [], "total_mrr_inr": 0}


@router.get("/content")
async def content_curation():
    """Get content curation queue."""
    return {"pending_approval": [], "recently_published": []}
