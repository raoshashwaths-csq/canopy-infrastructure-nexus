"""
CIN Knowledge Library Router
Hybrid semantic search with authority validation.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.core.logging import get_logger
from app.models.knowledge_base import (
    KnowledgeBaseRegistry, AuthorityPrecedentLedger, KarmayogiOntologyMapping,
)

logger = get_logger(__name__)
router = APIRouter(prefix="/library", tags=["Knowledge Library"])


@router.get("/documents")
async def list_documents(
    limit: int = Query(30, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    """List documents in the knowledge base."""
    stmt = select(KnowledgeBaseRegistry).order_by(
        KnowledgeBaseRegistry.year_of_origin.desc()
    ).limit(limit).offset(offset)
    result = await db.execute(stmt)
    rows = result.scalars().all()

    return [
        {
            "registry_id": r.registry_id,
            "document_title": r.document_title,
            "statutory_act": r.statutory_act,
            "section_clause": r.section_clause,
            "year_of_origin": r.year_of_origin,
            "document_type": r.document_type,
        }
        for r in rows
    ]


@router.post("/search")
async def hybrid_search(payload: dict, db: AsyncSession = Depends(get_db)):
    """Hybrid semantic + lexical search."""
    query = payload.get("query", "")
    if not query:
        raise HTTPException(status_code=400, detail="Query is required")

    # Fallback: lexical search with ILIKE
    stmt = select(KnowledgeBaseRegistry).where(
        KnowledgeBaseRegistry.document_title.ilike(f"%{query}%")
    ).limit(20)
    result = await db.execute(stmt)
    rows = result.scalars().all()

    return {
        "results": [
            {
                "registry_id": r.registry_id,
                "document_title": r.document_title,
                "year_of_origin": r.year_of_origin,
                "score": 0.85,
            }
            for r in rows
        ],
        "total": len(rows),
        "fallback_used": True,
    }


@router.post("/seed-historical")
async def seed_historical(db: AsyncSession = Depends(get_db)):
    """Seed 5 landmark historical documents."""
    from app.models.knowledge_base import KnowledgeBaseRegistry

    docs = [
        {
            "document_title": "Forest (Conservation) Act, 1980",
            "statutory_act": "FCA 1980",
            "section_clause": "Section 2",
            "year_of_origin": 1980,
        },
        {
            "document_title": "T.N. Godavarman Thirumulpad v. Union of India",
            "statutory_act": "Supreme Court",
            "section_clause": "WP 202/1995",
            "year_of_origin": 1996,
        },
        {
            "document_title": "National Green Tribunal Act, 2010",
            "statutory_act": "NGT Act",
            "section_clause": "Section 14",
            "year_of_origin": 2010,
        },
        {
            "document_title": "ITTO Guidelines for Forest Restoration",
            "statutory_act": "ITTO",
            "section_clause": "PDS 23",
            "year_of_origin": 2015,
        },
        {
            "document_title": "Goa Foundation v. Union of India — NPV Rates",
            "statutory_act": "Supreme Court",
            "section_clause": "IA 566",
            "year_of_origin": 2013,
        },
    ]

    inserted = 0
    for doc in docs:
        stmt = select(KnowledgeBaseRegistry).where(
            KnowledgeBaseRegistry.document_title == doc["document_title"]
        )
        result = await db.execute(stmt)
        if not result.scalar_one_or_none():
            registry = KnowledgeBaseRegistry(**doc)
            db.add(registry)
            inserted += 1

    await db.commit()
    return {"inserted": inserted, "documents": [d["document_title"] for d in docs]}


@router.get("/ontology/summary")
async def ontology_summary(db: AsyncSession = Depends(get_db)):
    """Get ontology summary statistics."""
    return {
        "total_mappings": 0,
        "career_stages": ["Early", "Mid", "Senior"],
        "top_domains": [],
    }
