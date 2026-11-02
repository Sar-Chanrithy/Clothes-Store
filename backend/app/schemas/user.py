from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


# ── Shared ──────────────────────────────────────────────────────────────────
class UserBase(BaseModel):
    full_name: str
    email: EmailStr


# ── Create ───────────────────────────────────────────────────────────────────
class UserCreate(UserBase):
    password: str


# ── Update ───────────────────────────────────────────────────────────────────
class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None


# ── Response ─────────────────────────────────────────────────────────────────
class UserResponse(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Auth tokens ──────────────────────────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str
