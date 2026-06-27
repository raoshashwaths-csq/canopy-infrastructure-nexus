from fastapi import APIRouter

router = APIRouter(prefix="/telemetry", tags=["Telemetry"])


@router.get("/vriksh")
async def vriksh_telemetry():
    """Get Vriksh AI telemetry data."""
    return {
        "total_queries": 0,
        "avg_response_time_ms": 0,
        "error_rate": 0.0,
    }
