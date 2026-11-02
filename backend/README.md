# 👗 Clothes Store — Backend API

A production-ready **FastAPI + PostgreSQL** REST API for a fashion/clothes e-commerce store.

---

## 🏗️ Architecture

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── auth.py       # Signup, Login, Refresh, /me
│   │       │   ├── products.py   # Product CRUD
│   │       │   ├── variants.py   # Variant CRUD (size × color × stock)
│   │       │   ├── media.py      # Image upload & management
│   │       │   └── users.py      # User profile
│   │       └── router.py         # Aggregates all routers at /api/v1
│   ├── core/
│   │   ├── config.py             # Settings from .env
│   │   ├── security.py           # Password hashing, JWT
│   │   └── dependencies.py       # get_db, get_current_user, get_current_admin
│   ├── db/
│   │   ├── base.py               # SQLAlchemy DeclarativeBase
│   │   ├── base_class.py         # Model imports for Alembic
│   │   └── session.py            # Engine + SessionLocal
│   ├── models/
│   │   ├── user.py               # User ORM model
│   │   ├── product.py            # Product ORM model
│   │   ├── variant.py            # Variant ORM model
│   │   └── media.py              # ProductMedia ORM model
│   ├── schemas/
│   │   ├── user.py               # Pydantic user + token schemas
│   │   ├── product.py            # Pydantic product schemas
│   │   ├── variant.py            # Pydantic variant schemas
│   │   └── media.py              # Pydantic media schemas
│   ├── services/
│   │   ├── user_service.py       # User business logic
│   │   ├── product_service.py    # Product business logic
│   │   ├── variant_service.py    # Variant business logic
│   │   └── media_service.py      # File upload + media logic
│   └── main.py                   # FastAPI app entry point
├── alembic/                      # Database migrations
├── alembic.ini
├── .env                          # Environment variables
├── requirements.txt
└── README.md
```

---

## 🚀 Quick Start

### 1. Create & activate virtual environment
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure environment
Copy `.env` and update values as needed (already configured for Render PostgreSQL).

### 4. Run database migrations
```bash
alembic upgrade head
```

### 5. Start the development server
```bash
uvicorn app.main:app --reload
```

Server runs at: **http://localhost:8000**  
Interactive docs: **http://localhost:8000/docs**  
ReDoc: **http://localhost:8000/redoc**

---

## 📦 Database Models

| Model | Key Fields |
|-------|-----------|
| `User` | id, full_name, email, hashed_password, is_active, is_admin |
| `Product` | id, name, brand, category, description, price, discount_price |
| `Variant` | id, product_id, size (XS/S/M/L/XL), color, color_hex, stock_quantity, sku |
| `ProductMedia` | id, product_id, url, alt_text, is_primary, sort_order |

---

## 🔐 Authentication

All write endpoints require a Bearer token. Admin endpoints require `is_admin=True`.

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/auth/signup` | POST | ❌ | Register user |
| `/api/v1/auth/login` | POST | ❌ | Login → tokens |
| `/api/v1/auth/refresh` | POST | ❌ | Refresh tokens |
| `/api/v1/auth/me` | GET | ✅ | Current user |

---

## 🛍️ API Endpoints

### Products
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/products` | GET | ❌ | List products (paginated, filterable) |
| `/api/v1/products/{id}` | GET | ❌ | Product detail |
| `/api/v1/products` | POST | 🔑 Admin | Create product |
| `/api/v1/products/{id}` | PATCH | 🔑 Admin | Update product |
| `/api/v1/products/{id}` | DELETE | 🔑 Admin | Delete product |

### Variants
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/variants/product/{product_id}` | GET | ❌ | List variants |
| `/api/v1/variants/{id}` | GET | ❌ | Single variant |
| `/api/v1/variants` | POST | 🔑 Admin | Create variant |
| `/api/v1/variants/{id}` | PATCH | 🔑 Admin | Update variant |
| `/api/v1/variants/{id}` | DELETE | 🔑 Admin | Delete variant |

### Media
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/media/product/{product_id}` | GET | ❌ | List product images |
| `/api/v1/media/upload/{product_id}` | POST | 🔑 Admin | Upload image (multipart) |
| `/api/v1/media/{id}` | PATCH | 🔑 Admin | Update image metadata |
| `/api/v1/media/{id}` | DELETE | 🔑 Admin | Delete image |

---

## 🗄️ Creating Your First Admin User

After running migrations, you can manually set `is_admin=True` in the DB:

```sql
UPDATE users SET is_admin = true WHERE email = 'your@email.com';
```

Or use a one-off script:
```bash
python -c "
from app.db.session import SessionLocal
from app.models.user import User
db = SessionLocal()
user = db.query(User).filter(User.email=='your@email.com').first()
user.is_admin = True
db.commit()
print('Done!')
"
```
