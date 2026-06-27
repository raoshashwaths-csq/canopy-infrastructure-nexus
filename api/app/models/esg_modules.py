from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean, DateTime, Float, ForeignKey, Integer, Numeric, String, Text,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class EsgValueChainVendor(Base):
    __tablename__ = "esg_value_chain_vendors"

    vendor_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    parent_company_id: Mapped[str] = mapped_column(String(100), nullable=False)
    vendor_name: Mapped[str] = mapped_column(String(255), nullable=False)
    sector: Mapped[str | None] = mapped_column(String(100))
    state_location: Mapped[str | None] = mapped_column(String(100))
    procurement_share_percentage: Mapped[float | None] = mapped_column(Numeric(5, 2))
    contact_email: Mapped[str | None] = mapped_column(String(255))
    compliance_status: Mapped[str] = mapped_column(String(50), default="Pending Intake")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class VendorEsgMetricsIntake(Base):
    __tablename__ = "vendor_esg_metrics_intake"

    intake_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    vendor_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), ForeignKey("esg_value_chain_vendors.vendor_id"), nullable=False
    )
    reporting_year: Mapped[int] = mapped_column(nullable=False)
    scope1_tco2e: Mapped[float | None] = mapped_column(Numeric(12, 2))
    scope2_tco2e: Mapped[float | None] = mapped_column(Numeric(12, 2))
    renewable_energy_pct: Mapped[float | None] = mapped_column(Numeric(5, 2))
    water_withdrawal_kl: Mapped[float | None] = mapped_column(Numeric(12, 2))
    waste_recycled_pct: Mapped[float | None] = mapped_column(Numeric(5, 2))


class IcmCarbonLedger(Base):
    __tablename__ = "icm_carbon_ledgers"

    ledger_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    company_id: Mapped[str] = mapped_column(String(100), nullable=False)
    sector: Mapped[str] = mapped_column(String(100), nullable=False)
    target_year: Mapped[int] = mapped_column(nullable=False)
    production_output_mt: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    actual_emissions_tco2e: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    bee_target_intensity: Mapped[float | None] = mapped_column(Numeric(8, 4))
    actual_intensity: Mapped[float | None] = mapped_column(Numeric(8, 4))
    compliance_status: Mapped[str | None] = mapped_column(String(20))
    surplus_credits: Mapped[float | None] = mapped_column(Numeric(12, 2))
    shortfall_units: Mapped[float | None] = mapped_column(Numeric(12, 2))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class GeospatialAfforestationPlot(Base):
    __tablename__ = "geospatial_afforestation_plots"

    plot_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    company_id: Mapped[str] = mapped_column(String(100), nullable=False)
    plot_name: Mapped[str] = mapped_column(String(255), nullable=False)
    state_location: Mapped[str] = mapped_column(String(100), nullable=False)
    district: Mapped[str | None] = mapped_column(String(100))
    area_hectares: Mapped[float | None] = mapped_column(Numeric(10, 2))
    baseline_ndvi: Mapped[float | None] = mapped_column(Numeric(4, 3))
    current_ndvi: Mapped[float | None] = mapped_column(Numeric(4, 3))
    canopy_density_percent: Mapped[int] = mapped_column(default=0)
    last_satellite_sync: Mapped[str | None] = mapped_column(String(20))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class SocialFrameworkLedger(Base):
    __tablename__ = "social_framework_ledgers"

    ledger_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    company_id: Mapped[str] = mapped_column(String(100), nullable=False)
    project_name: Mapped[str] = mapped_column(String(255), nullable=False)
    state_location: Mapped[str] = mapped_column(String(100), nullable=False)
    district: Mapped[str | None] = mapped_column(String(100))
    affected_communities_count: Mapped[int] = mapped_column(default=0)
    fpic_workflow_status: Mapped[str] = mapped_column(String(50), default="Initiated")
    fra_rights_settled: Mapped[bool] = mapped_column(Boolean, default=False)
    gram_sabha_resolution_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    social_risk_score: Mapped[float | None] = mapped_column(Numeric(4, 2))
    audit_notes: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class MaterialityEntry(Base):
    __tablename__ = "materiality_entries"

    entry_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    company_id: Mapped[str] = mapped_column(String(100), nullable=False)
    project_name: Mapped[str] = mapped_column(String(255), nullable=False)
    risk_category: Mapped[str] = mapped_column(String(100), nullable=False)
    financial_materiality_score: Mapped[int] = mapped_column(default=1)
    impact_materiality_score: Mapped[int] = mapped_column(default=1)
    risk_description: Mapped[str | None] = mapped_column(Text)
    mitigation_plan: Mapped[str | None] = mapped_column(Text)
    tnfd_pillar: Mapped[str] = mapped_column(String(50), default="Risk_Management")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
