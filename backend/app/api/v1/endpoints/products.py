from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_admin, get_current_user
from app.schemas.product import (
    ProductCreate,
    ProductDetailResponse,
    ProductListResponse,
    ProductUpdate,
)
from app.services import (
    get_products,
    get_product_by_id,
    create_product,
    update_product,
    delete_product,
    count_products,
)

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("", response_model=dict)
def list_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = Query(None),
    brand: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    List all active products with optional filtering and pagination.
    Returns paginated results with total count.
    """
    products = get_products(
        db, skip=skip, limit=limit, category=category, brand=brand, search=search
    )
    total = count_products(db, category=category, brand=brand, search=search)

    # Attach primary image url
    items = []
    for p in products:
        primary = next((m.url for m in p.media if m.is_primary), None)
        if primary is None and p.media:
            primary = p.media[0].url
        d = ProductListResponse.model_validate(p).model_dump()
        d["primary_image"] = primary
        items.append(d)

    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "items": items,
    }


@router.get("/{product_id}", response_model=ProductDetailResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get full product detail by ID including variants and media."""
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    # Compute primary image
    primary = next((m.url for m in product.media if m.is_primary), None)
    if primary is None and product.media:
        primary = product.media[0].url

    result = ProductDetailResponse.model_validate(product)
    result.primary_image = primary
    return result


@router.post("", response_model=ProductDetailResponse, status_code=status.HTTP_201_CREATED)
def create_new_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    """Create a new product. Admin only."""
    return create_product(db, product_in)


@router.patch("/{product_id}", response_model=ProductDetailResponse)
def update_existing_product(
    product_id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    """Update product fields. Admin only."""
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return update_product(db, product, product_in)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_product(
    product_id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    """Delete a product and all its variants/media. Admin only."""
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    delete_product(db, product)
