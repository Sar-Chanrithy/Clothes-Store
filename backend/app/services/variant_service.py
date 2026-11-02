from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.variant import Variant
from app.schemas.variant import VariantCreate, VariantUpdate


def get_variants_by_product(db: Session, product_id: int) -> List[Variant]:
    return db.query(Variant).filter(Variant.product_id == product_id).all()


def get_variant_by_id(db: Session, variant_id: int) -> Optional[Variant]:
    return db.query(Variant).filter(Variant.id == variant_id).first()


def create_variant(db: Session, variant_in: VariantCreate) -> Variant:
    variant = Variant(**variant_in.model_dump())
    db.add(variant)
    db.commit()
    db.refresh(variant)
    return variant


def update_variant(
    db: Session, variant: Variant, variant_in: VariantUpdate
) -> Variant:
    update_data = variant_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(variant, field, value)
    db.commit()
    db.refresh(variant)
    return variant


def delete_variant(db: Session, variant: Variant) -> None:
    db.delete(variant)
    db.commit()
