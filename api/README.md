# CIN — Canopy & Infrastructure Nexus Backend

Python FastAPI backend with 26+ routers covering:

## Routers
| Router | Prefix | Description |
|--------|--------|-------------|
| Auth | `/auth` | JWT-based authentication |
| Library | `/library` | Knowledge base with hybrid semantic search |
| Seed | `/seed` | Historical document seeding |
| Karmayogi | `/karmayogi` | IFS competency ontology |
| Vriksh | `/tasks` | AI processing pipeline |
| ESG — Value Chain | `/esg/value-chain` | Scope 3 supplier tracking |
| ESG — Carbon Market | `/esg/carbon-market` | ICM compliance projector |
| ESG — Geospatial | `/esg/geospatial` | NDVI monitoring |
| ESG — Social | `/esg/social-framework` | FPIC ledger |
| ESG — Materiality | `/esg/materiality` | TNFD double materiality |
| Clearance — CAT | `/esg/cat-plan` | Silt Yield Index calculator |
| Clearance — Green Credit | `/esg/green-credit` | IPCC Tier-2 carbon |
| Clearance — Wildlife | `/esg/wildlife-mitigation` | Biodiversity levy |
| Clearance — CRZ | `/esg/crz-mangrove` | MISHTI restoration |
| Admin | `/admin` | Revenue, telemetry, curation |

## Quick Start
```bash
pip install -r requirements.txt
python main.py
```
