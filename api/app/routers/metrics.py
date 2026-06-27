from fastapi import APIRouter

router = APIRouter(prefix="/metrics", tags=["Metrics"])


@router.get("/")
async def get_metrics():
    """Get platform metrics."""
    return {
        "total_documents": 0,
        "total_users": 0,
        "total_searches": 0,
    }
