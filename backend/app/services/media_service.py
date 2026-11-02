import os
import uuid
from pathlib import Path
from typing import List, Optional

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.media import ProductMedia
from app.schemas.media import ProductMediaCreate, ProductMediaUpdate

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}


async def save_upload_file(file: UploadFile, product_id: int) -> str:
    """Save uploaded file to disk and return the relative URL path."""
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise ValueError(
            f"Unsupported file type: {file.content_type}. "
            f"Allowed: {ALLOWED_CONTENT_TYPES}"
        )

    upload_dir = Path(settings.UPLOAD_DIR) / "products" / str(product_id)
    upload_dir.mkdir(parents=True, exist_ok=True)

    ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else "jpg"
    filename = f"{uuid.uuid4().hex}.{ext}"
    file_path = upload_dir / filename

    content = await file.read()

    max_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
    if len(content) > max_bytes:
        raise ValueError(
            f"File too large. Max size is {settings.MAX_FILE_SIZE_MB}MB."
        )

    with open(file_path, "wb") as f:
        f.write(content)

    return f"/uploads/products/{product_id}/{filename}"


def get_media_by_product(db: Session, product_id: int) -> List[ProductMedia]:
    return (
        db.query(ProductMedia)
        .filter(ProductMedia.product_id == product_id)
        .order_by(ProductMedia.sort_order)
        .all()
    )


def get_media_by_id(db: Session, media_id: int) -> Optional[ProductMedia]:
    return db.query(ProductMedia).filter(ProductMedia.id == media_id).first()


def create_media(db: Session, media_in: ProductMediaCreate) -> ProductMedia:
    # If this is marked as primary, unset any existing primary
    if media_in.is_primary:
        db.query(ProductMedia).filter(
            ProductMedia.product_id == media_in.product_id,
            ProductMedia.is_primary == True,
        ).update({"is_primary": False})

    media = ProductMedia(**media_in.model_dump())
    db.add(media)
    db.commit()
    db.refresh(media)
    return media


def update_media(
    db: Session, media: ProductMedia, media_in: ProductMediaUpdate
) -> ProductMedia:
    update_data = media_in.model_dump(exclude_unset=True)

    if update_data.get("is_primary"):
        db.query(ProductMedia).filter(
            ProductMedia.product_id == media.product_id,
            ProductMedia.is_primary == True,
        ).update({"is_primary": False})

    for field, value in update_data.items():
        setattr(media, field, value)
    db.commit()
    db.refresh(media)
    return media


def delete_media(db: Session, media: ProductMedia) -> None:
    # Optionally remove file from disk
    file_path = Path(".") / media.url.lstrip("/")
    if file_path.exists():
        file_path.unlink()
    db.delete(media)
    db.commit()
