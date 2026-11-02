from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_admin
from app.schemas.variant import VariantCreate, VariantResponse, VariantUpdate
from app.services import (
    get_variant_by_id,
    get_variants_by_product,
    create_variant,
    update_variant,
    delete_variant,
    get_product_by_id,
)

router = APIRouter(prefix="/variants", tags=["Variants"])


@router.get("/product/{product_id}", response_model=List[VariantResponse])
def list_variants(product_id: int, db: Session = Depends(get_db)):
    """List all variants for a given product."""
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return get_variants_by_product(db, product_id)


@router.get("/{variant_id}", response_model=VariantResponse)
def get_variant(variant_id: int, db: Session = Depends(get_db)):
    """Get a single variant by ID."""
    variant = get_variant_by_id(db, variant_id)
    if not variant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Variant not found")
    return variant


@router.post("", response_model=VariantResponse, status_code=status.HTTP_201_CREATED)
def create_new_variant(
    variant_in: VariantCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    """Create a variant for a product. Admin only."""
    product = get_product_by_id(db, variant_in.product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return create_variant(db, variant_in)


@router.patch("/{variant_id}", response_model=VariantResponse)
def update_existing_variant(
    variant_id: int,
    variant_in: VariantUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    """Update a variant. Admin only."""
    variant = get_variant_by_id(db, variant_id)
    if not variant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Variant not found")
    return update_variant(db, variant, variant_in)


@router.delete("/{variant_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_variant(
    variant_id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    """Delete a variant. Admin only."""
    variant = get_variant_by_id(db, variant_id)
    if not variant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Variant not found")
    delete_variant(db, variant)
