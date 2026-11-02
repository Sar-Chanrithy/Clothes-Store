from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class Variant(Base):
    """
    Represents a product variant (size + color combination).
    Each variant has its own stock quantity.
    Sizes: XS, S, M, L, XL
    """

    __tablename__ = "variants"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(
        Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True
    )
    size = Column(String(10), nullable=False)   # XS, S, M, L, XL
    color = Column(String(100), nullable=False)
    color_hex = Column(String(7), nullable=True)  # e.g. #FF5733
    stock_quantity = Column(Integer, default=0, nullable=False)
    sku = Column(String(100), unique=True, nullable=True)

    # Relationships
    product = relationship("Product", back_populates="variants")
