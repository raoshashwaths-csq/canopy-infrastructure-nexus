"""
CIN — Canopy & Infrastructure Nexus
═══════════════════════════════════
FastAPI main entry point. Registers 26+ routers across:
  - Authentication & User Profiles
  - Knowledge Library & Vriksh AI
  - ESG Enterprise (5 modules)
  - Environmental Clearance (4 calculators)
  - Admin Panel (Revenue, Telemetry, Curation)
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import init_db
from app.core.logging import get_logger

# ── Routers ──
from app.routers.auth import router as auth_router
from app.routers.health import router as health_router
from app.routers.library import router as library_router
from app.routers.seed import router as seed_router
from app.routers.vriksh import router as vriksh_router
from app.routers.documents import router as documents_router
from app.routers.agent import router as agent_router
from app.routers.voice_ingest import router as voice_ingest_router
from app.routers.leads import router as leads_router
from app.routers.leads_admin import router as leads_admin_router
from app.routers.metrics import router as metrics_router
from app.routers.telemetry import router as telemetry_router
from app.routers.ingestion_metrics import router as ingestion_metrics_router
from app.routers.admin import router as admin_router
from app.routers.karmayogi import router as karmayogi_router

# ESG Routers
from app.routers.value_chain import router as value_chain_router
from app.routers.carbon_market import router as carbon_market_router
from app.routers.geospatial import router as geospatial_router
from app.routers.social_framework import router as social_framework_router
from app.routers.materiality import router as materiality_router

# Clearance Calculator Routers
from app.routers.cat_plan import router as cat_plan_router
from app.routers.green_credit import router as green_credit_router
from app.routers.wildlife_mitigation import router as wildlife_mitigation_router
from app.routers.crz_mangrove import router as crz_mangrove_router
from app.routers.clearance_projects import router as clearance_projects_router

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing database tables")
    await init_db()
    logger.info("Database ready")
    yield
    logger.info("Shutting down")


app = FastAPI(
    title="Canopy & Infrastructure Nexus API",
    description="Enterprise environmental law intelligence platform",
    version="3.0.0",
    lifespan=lifespan,
)

# ── CORS ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Router Registration ──
app.include_router(health_router)               # /health
app.include_router(auth_router)                 # /auth
app.include_router(library_router)              # /library
app.include_router(seed_router)                 # /seed
app.include_router(vriksh_router)               # /tasks
app.include_router(documents_router)            # /documents
app.include_router(agent_router)                # /agent
app.include_router(voice_ingest_router)         # /voice-ingest
app.include_router(leads_router)                # /leads
app.include_router(leads_admin_router)          # /leads-admin
app.include_router(metrics_router)              # /metrics
app.include_router(telemetry_router)            # /telemetry
app.include_router(ingestion_metrics_router)    # /ingestion-metrics
app.include_router(admin_router)                # /admin
app.include_router(karmayogi_router)            # /karmayogi

# ESG Enterprise
app.include_router(value_chain_router)          # /esg/value-chain
app.include_router(carbon_market_router)        # /esg/carbon-market
app.include_router(geospatial_router)           # /esg/geospatial
app.include_router(social_framework_router)     # /esg/social-framework
app.include_router(materiality_router)          # /esg/materiality

# Clearance Calculators
app.include_router(cat_plan_router)             # /esg/cat-plan
app.include_router(green_credit_router)         # /esg/green-credit
app.include_router(wildlife_mitigation_router)  # /esg/wildlife-mitigation
app.include_router(crz_mangrove_router)         # /esg/crz-mangrove
app.include_router(clearance_projects_router)   # /esg/clearance-projects

logger.info("All routers registered", count=26)


@app.get("/")
async def root():
    return {"name": "CIN API", "version": "3.0.0", "status": "operational"}
