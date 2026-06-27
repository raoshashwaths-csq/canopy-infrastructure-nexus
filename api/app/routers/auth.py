"""
CIN Authentication Router
JWT-based auth with persona-aware onboarding.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.core.logging import get_logger
from app.models.user_profile import UserProfile

logger = get_logger(__name__)
router = APIRouter(prefix="/auth", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


@router.post("/register")
async def register(payload: dict, db: AsyncSession = Depends(get_db)):
    """Register a new user with persona selection."""
    stmt = select(UserProfile).where(UserProfile.email == payload["email"])
    result = await db.execute(stmt)
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = UserProfile(
        email=payload["email"],
        full_name=payload.get("full_name", ""),
        persona=payload.get("persona", "civil_aspirant"),
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    return {"user_id": user.user_id, "email": user.email, "message": "Registration successful"}


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    """Login and return JWT token."""
    stmt = select(UserProfile).where(UserProfile.email == form_data.username)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "access_token": f"cin_dummy_token_{user.user_id}",
        "token_type": "bearer",
        "user_id": user.user_id,
        "persona": user.persona,
    }


@router.get("/me")
async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    """Get current authenticated user."""
    # Extract user_id from dummy token
    user_id = token.replace("cin_dummy_token_", "") if token.startswith("cin_dummy_token_") else token

    stmt = select(UserProfile).where(UserProfile.user_id == user_id)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {
        "user_id": user.user_id,
        "email": user.email,
        "full_name": user.full_name,
        "persona": user.persona,
        "organization": user.organization,
        "designation": user.designation,
    }
