from typing import Literal, Optional

from pydantic import BaseModel, field_validator

VALID_SIZES = {"XS", "S", "M", "L", "XL"}


# ── Shared ──────────────────────────────────────────────────────────────────
class VariantBase(BaseModel):
    size: str
    color: str
    color_hex: Optional[str] = None
    stock_quantity: int = 0
    sku: Optional[str] = None

    @field_validator("size")
    @classmethod
    def validate_size(cls, v: str) -> str:
        v = v.upper()
        if v not in VALID_SIZES:
            raise ValueError(f"Size must be one of {VALID_SIZES}")
        return v

    @field_validator("color_hex")
    @classmethod
    def validate_color_hex(cls, v: Optional[str]) -> Optional[str]:
        if v and not v.startswith("#"):
            raise ValueError("color_hex must start with '#'")
        return v

    @field_validator("stock_quantity")
    @classmethod
    def validate_stock(cls, v: int) -> int:
        if v < 0:
            raise ValueError("stock_quantity cannot be negative")
        return v


# ── Create ───────────────────────────────────────────────────────────────────
class VariantCreate(VariantBase):
    product_id: int


# ── Update ───────────────────────────────────────────────────────────────────
class VariantUpdate(BaseModel):
    size: Optional[str] = None
    color: Optional[str] = None
    color_hex: Optional[str] = None
    stock_quantity: Optional[int] = None
    sku: Optional[str] = None


# ── Response ─────────────────────────────────────────────────────────────────
class VariantResponse(VariantBase):
    id: int
    product_id: int

    model_config = {"from_attributes": True}
