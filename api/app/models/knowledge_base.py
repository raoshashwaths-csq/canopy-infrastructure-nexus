from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    DateTime, ForeignKey, Integer, Numeric, String, Text,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class KnowledgeBaseRegistry(Base):
    __tablename__ = "knowledge_base_registry"

    registry_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    document_title: Mapped[str] = mapped_column(String(500), nullable=False)
    statutory_act: Mapped[str] = mapped_column(String(200), nullable=False)
    section_clause: Mapped[str] = mapped_column(String(200), nullable=False)
    year_of_origin: Mapped[int] = mapped_column(nullable=False)
    jurisdiction_scope: Mapped[str] = mapped_column(String(50), default="India")
    document_type: Mapped[str] = mapped_column(String(50), default="Statute")
    language: Mapped[str] = mapped_column(String(10), default="en")
    domestic_international: Mapped[str] = mapped_column(String(20), default="domestic")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class AuthorityPrecedentLedger(Base):
    __tablename__ = "authority_precedent_ledger"

    precedent_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    registry_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False),
        ForeignKey("knowledge_base_registry.registry_id", ondelete="CASCADE"),
        nullable=False,
    )
    precedent_type: Mapped[str] = mapped_column(String(50), nullable=False)
    court_tribunal: Mapped[str] = mapped_column(String(200), nullable=False)
    case_number: Mapped[str | None] = mapped_column(String(200))
    judgment_date: Mapped[str | None] = mapped_column(String(20))
    key_ratio: Mapped[str | None] = mapped_column(Text)
    authority_weight: Mapped[float | None] = mapped_column(Numeric(3, 2))
    applicable_from: Mapped[str | None] = mapped_column(String(20))
    applicable_until: Mapped[str | None] = mapped_column(String(20))
    is_active: Mapped[bool] = mapped_column(default=True)
    superseded_by: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class KarmayogiOntologyMapping(Base):
    __tablename__ = "karmayogi_ontology_mapping"

    ontology_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    registry_id: Mapped[str] = mapped_column(
        PG_UUID(as_uuid=False),
        ForeignKey("knowledge_base_registry.registry_id", ondelete="CASCADE"),
        nullable=False,
    )
    karmayogi_role: Mapped[str] = mapped_column(String(100), nullable=False)
    career_stage: Mapped[str] = mapped_column(String(50), nullable=False)
    domain_tag: Mapped[str] = mapped_column(String(100), nullable=False)
    competency_level: Mapped[str] = mapped_column(String(20), default="proficient")
    ignfa_module_link: Mapped[str | None] = mapped_column(String(500))
    suggested_training_hours: Mapped[int | None] = mapped_column(Integer)
    relevance_score: Mapped[float | None] = mapped_column(Numeric(4, 2))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
