from typing import List

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_admin
from app.schemas.media import ProductMediaCreate, ProductMediaResponse, ProductMediaUpdate
from app.services import (
    get_media_by_id,
    get_media_by_product,
    create_media,
    update_media,
    delete_media,
    save_upload_file,
    get_product_by_id,
)

router = APIRouter(prefix="/media", tags=["Media"])


@router.get("/product/{product_id}", response_model=List[ProductMediaResponse])
def list_media(product_id: int, db: Session = Depends(get_db)):
    """List all media for a product, ordered by sort_order."""
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return get_media_by_product(db, product_id)


@router.post(
    "/upload/{product_id}",
    response_model=ProductMediaResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_media(
    product_id: int,
    file: UploadFile = File(...),
    alt_text: str = Form(None),
    is_primary: bool = Form(False),
    sort_order: int = Form(0),
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    """Upload an image file for a product. Admin only."""
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    try:
        url = await save_upload_file(file, product_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    media_in = ProductMediaCreate(
        product_id=product_id,
        url=url,
        alt_text=alt_text,
        is_primary=is_primary,
        sort_order=sort_order,
    )
    return create_media(db, media_in)


@router.patch("/{media_id}", response_model=ProductMediaResponse)
def update_media_item(
    media_id: int,
    media_in: ProductMediaUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    """Update media metadata (alt text, primary flag, sort order). Admin only."""
    media = get_media_by_id(db, media_id)
    if not media:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")
    return update_media(db, media, media_in)


@router.delete("/{media_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_media_item(
    media_id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin),
):
    """Delete a media item and its file. Admin only."""
    media = get_media_by_id(db, media_id)
    if not media:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Media not found")
    delete_media(db, media)
