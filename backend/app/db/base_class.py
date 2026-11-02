# Import all models here so Alembic can detect them
from app.db.base import Base  # noqa
from app.models.user import User  # noqa
from app.models.product import Product  # noqa
from app.models.variant import Variant  # noqa
from app.models.media import ProductMedia  # noqa
