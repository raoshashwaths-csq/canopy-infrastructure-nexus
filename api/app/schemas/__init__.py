"""
CIN Pydantic Schemas
All request/response models for the API.
"""

from pydantic import BaseModel, Field


# ── Auth ──
class UserCreate(BaseModel):
    email: str
    full_name: str = ""
    persona: str = "civil_aspirant"


class UserOut(BaseModel):
    user_id: str
    email: str
    full_name: str
    persona: str


# ── Library ──
class SearchRequest(BaseModel):
    query: str
    limit: int = 10


class DocumentOut(BaseModel):
    registry_id: str
    document_title: str
    statutory_act: str
    year_of_origin: int


# ── CAT Plan ──
class CatZoneInput(BaseModel):
    area_ha: float = Field(..., gt=0)
    weightage_factor: float = Field(..., ge=1, le=20)
    delivery_ratio: float = Field(..., ge=0.1, le=1.0)


class CatPlanRequest(BaseModel):
    project_id: str
    zones: list[CatZoneInput]
    total_catchment_area_ha: float = Field(..., gt=0)
    free_draining_area_ha: float = Field(..., gt=0)
    total_estimated_cost_inr: float = Field(..., gt=0)


class CatPlanResponse(BaseModel):
    simulation_id: str
    calculated_silt_yield_index: float
    priority_rating: str
    biological_treatment_cost_inr: float
    engineering_structures_cost_inr: float
    final_allocated_cat_budget_inr: float
    statutory_floor_2_5_pct_tec: float
    meets_statutory_floor: bool
    message: str


# ── Green Credit ──
class GreenCreditRequest(BaseModel):
    project_id: str
    plantation_area_hectares: float = Field(..., gt=0)
    target_tree_density_per_ha: int = Field(..., ge=100, le=10000)
    predominant_species_group: str = "Teak"
    avg_dbh_cm: float = 25.0


class GreenCreditResponse(BaseModel):
    ledger_id: str
    estimated_carbon_sequestration_tco2e: float
    issued_green_credits_tokenized: float
    meets_canopy_threshold: bool
    timber_volume_m3: float


# ── Wildlife Mitigation ──
class WildlifeMitigationRequest(BaseModel):
    project_id: str
    target_fauna_species: str
    forest_diversion_ha: float = Field(..., gt=0)
    historical_annual_incidents: int = 0
    human_fatalities_5yr: int = 0


class WildlifeMitigationResponse(BaseModel):
    mitigation_id: str
    calculated_biodiversity_impact_levy_inr: float
    projected_ex_gratia_payout_reserve_inr: float
    total_mitigation_budget_inr: float
    risk_classification: str


# ── CRZ Mangrove ──
class CrzMangroveRequest(BaseModel):
    project_id: str
    crz_classification: str = "CRZ-I"
    affected_area_sqm: float = Field(..., gt=0)
    hypersalinity_correction_scalar: float = 1.0
    engineering_intervention_required: bool = False


class CrzMangroveResponse(BaseModel):
    restoration_id: str
    total_mishti_budget_inr: float
    restoration_note: str
