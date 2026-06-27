"""
CIN Environmental Clearance Calculators — Model Suite
"""
from __future__ import annotations

import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class GeoEcologicalBaseline(Base):
    __tablename__ = "geo_ecological_baselines"

    baseline_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    state_name: Mapped[str] = mapped_column(String(100), nullable=False)
    agro_climatic_zone: Mapped[str] = mapped_column(String(150), nullable=False)
    default_soil_erosivity_factor: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    mangrove_restoration_base_cost_per_sqm: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    average_wildlife_underpass_unit_cost: Mapped[float] = mapped_column(Numeric(14, 2), nullable=False)
    green_credit_weight_per_hectare: Mapped[float] = mapped_column(Numeric(6, 2), default=1.00)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )


class CorporateClearanceProject(Base):
    __tablename__ = "corporate_clearance_projects"

    project_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    company_identifier: Mapped[str] = mapped_column(String(100), nullable=False)
    project_name: Mapped[str] = mapped_column(String(255), nullable=False)
    target_state: Mapped[str] = mapped_column(String(100), nullable=False)
    total_investment_cr: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    forest_diverted_hectares: Mapped[float] = mapped_column(Numeric(10, 2), default=0.0)
    coastal_diversion_sqm: Mapped[float] = mapped_column(Numeric(12, 2), default=0.0)
    closest_wildlife_corridor_km: Mapped[float | None] = mapped_column(Numeric(6, 2), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class CatPlanSimulation(Base):
    __tablename__ = "cat_plan_simulations"

    simulation_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    project_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False),
        ForeignKey("corporate_clearance_projects.project_id", ondelete="CASCADE"),
        nullable=False,
    )
    total_catchment_area_ha: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    free_draining_area_ha: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    calculated_silt_yield_index: Mapped[float | None] = mapped_column(Numeric(8, 2))
    priority_rating: Mapped[str | None] = mapped_column(String(50))
    biological_treatment_cost_inr: Mapped[float | None] = mapped_column(Numeric(14, 2))
    engineering_structures_cost_inr: Mapped[float | None] = mapped_column(Numeric(14, 2))
    final_allocated_cat_budget_inr: Mapped[float | None] = mapped_column(Numeric(14, 2))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class GreenCreditCarbonLedger(Base):
    __tablename__ = "green_credit_carbon_ledger"

    ledger_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    project_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False),
        ForeignKey("corporate_clearance_projects.project_id", ondelete="CASCADE"),
        nullable=False,
    )
    plantation_area_hectares: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    target_tree_density_per_ha: Mapped[int] = mapped_column(nullable=False)
    predominant_species_group: Mapped[str | None] = mapped_column(String(100))
    projected_5yr_canopy_density: Mapped[float | None] = mapped_column(Numeric(5, 2))
    estimated_carbon_sequestration_tco2e: Mapped[float | None] = mapped_column(Numeric(12, 2))
    issued_green_credits_tokenized: Mapped[float] = mapped_column(Numeric(12, 2), default=0.0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class WildlifeMitigationLedger(Base):
    __tablename__ = "wildlife_mitigation_ledger"

    mitigation_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    project_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False),
        ForeignKey("corporate_clearance_projects.project_id", ondelete="CASCADE"),
        nullable=False,
    )
    target_fauna_species: Mapped[str] = mapped_column(String(100), nullable=False)
    historical_annual_incidents: Mapped[int] = mapped_column(default=0)
    mitigation_structures_count: Mapped[int] = mapped_column(default=0)
    calculated_biodiversity_impact_levy_inr: Mapped[float | None] = mapped_column(Numeric(14, 2))
    projected_ex_gratia_payout_reserve_inr: Mapped[float | None] = mapped_column(Numeric(14, 2))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class CrzMangroveRestoration(Base):
    __tablename__ = "crz_mangrove_restoration"

    restoration_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    project_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False),
        ForeignKey("corporate_clearance_projects.project_id", ondelete="CASCADE"),
        nullable=False,
    )
    crz_classification: Mapped[str] = mapped_column(String(20), nullable=False)
    affected_area_sqm: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    hypersalinity_correction_scalar: Mapped[float] = mapped_column(Numeric(4, 2), default=1.0)
    inundation_index: Mapped[float] = mapped_column(Numeric(4, 2), default=1.0)
    estimated_restoration_cost_inr: Mapped[float | None] = mapped_column(Numeric(14, 2))
    engineering_intervention_cost_inr: Mapped[float | None] = mapped_column(Numeric(14, 2))
    total_mishti_budget_inr: Mapped[float | None] = mapped_column(Numeric(14, 2))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
