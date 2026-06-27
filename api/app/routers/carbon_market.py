from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter(prefix="/esg/carbon-market", tags=["ESG — Carbon Market"])

# Hardcoded BEE CCTS 2026 sector baselines
SECTOR_BASELINES = {
    "Cement": {"intensity": 0.576, "unit": "MT"},
    "Steel": {"intensity": 2.213, "unit": "MT"},
    "Aluminium": {"intensity": 1.899, "unit": "MT"},
    "Power": {"intensity": 0.499, "unit": "MWh"},
    "Fertilizer": {"intensity": 1.137, "unit": "MT"},
    "Refinery": {"intensity": 0.024, "unit": "MT"},
    "Paper": {"intensity": 0.729, "unit": "MT"},
    "Textile": {"intensity": 0.644, "unit": "MT"},
}


@router.get("/sectors")
async def fetch_sectors():
    """Fetch available carbon sectors with baselines."""
    return {
        "sectors": [
            {"name": k, "baseline_intensity_tco2e": v["intensity"], "unit": v["unit"]}
            for k, v in SECTOR_BASELINES.items()
        ]
    }


@router.post("/project")
async def project_carbon(payload: dict, db: AsyncSession = Depends(get_db)):
    """Project carbon compliance for a sector."""
    sector = payload.get("sector", "Cement")
    baseline = SECTOR_BASELINES.get(sector, {"intensity": 1.0, "unit": "MT"})
    production = payload.get("production_output_mt", 0)
    emissions = payload.get("actual_emissions_tco2e", 0)

    bee_target = baseline["intensity"] * production
    actual_intensity = emissions / production if production > 0 else 0
    surplus = max(0, bee_target - emissions)
    shortfall = max(0, emissions - bee_target)

    return {
        "bee_target_intensity": baseline["intensity"],
        "actual_intensity": actual_intensity,
        "compliance_status": "surplus" if surplus > 0 else "shortfall",
        "surplus_credits": surplus,
        "shortfall_units": shortfall,
        "financial_exposure_inr": shortfall * 800,
        "projection_message": f"{sector}: {'Surplus' if surplus > 0 else 'Shortfall'} of {abs(surplus or shortfall):.1f} tCO2e",
    }
