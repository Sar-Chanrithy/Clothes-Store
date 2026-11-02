from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# ── Shared ──────────────────────────────────────────────────────────────────
class ProductMediaBase(BaseModel):
    url: str
    alt_text: Optional[str] = None
    is_primary: bool = False
    sort_order: int = 0


# ── Create ───────────────────────────────────────────────────────────────────
class ProductMediaCreate(ProductMediaBase):
    product_id: int


# ── Update ───────────────────────────────────────────────────────────────────
class ProductMediaUpdate(BaseModel):
    alt_text: Optional[str] = None
    is_primary: Optional[bool] = None
    sort_order: Optional[int] = None


# ── Response ─────────────────────────────────────────────────────────────────
class ProductMediaResponse(ProductMediaBase):
    id: int
    product_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
