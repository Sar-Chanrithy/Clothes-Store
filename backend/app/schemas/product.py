from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, field_validator

from app.schemas.variant import VariantResponse
from app.schemas.media import ProductMediaResponse


# ── Shared ──────────────────────────────────────────────────────────────────
class ProductBase(BaseModel):
    name: str
    brand: str
    category: str
    description: Optional[str] = None
    price: Decimal
    discount_price: Optional[Decimal] = None
    is_active: bool = True

    @field_validator("price", "discount_price", mode="before")
    @classmethod
    def round_decimal(cls, v):
        if v is not None:
            return round(Decimal(str(v)), 2)
        return v


# ── Create ───────────────────────────────────────────────────────────────────
class ProductCreate(ProductBase):
    pass


# ── Update ───────────────────────────────────────────────────────────────────
class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    discount_price: Optional[Decimal] = None
    is_active: Optional[bool] = None


# ── Response (list / short) ───────────────────────────────────────────────────
class ProductListResponse(ProductBase):
    id: int
    created_at: datetime
    primary_image: Optional[str] = None  # URL of the primary image

    model_config = {"from_attributes": True}


# ── Response (detail / full) ─────────────────────────────────────────────────
class ProductDetailResponse(ProductListResponse):
    variants: List[VariantResponse] = []
    media: List[ProductMediaResponse] = []
    updated_at: datetime
