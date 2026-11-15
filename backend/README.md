# Rithy Store Laravel API

Laravel 12, PostgreSQL, and Sanctum. Requires PHP 8.2+, Composer, PostgreSQL, and PHP's pdo_pgsql extension.

## Setup

Create a PostgreSQL database named `clothes_store`. Copy `.env.example` to `.env` if necessary and set DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME and DB_PASSWORD to your PostgreSQL credentials. Keep `.env` private. From the backend directory run:

```sh
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The API is available at `http://127.0.0.1:8000/api`. Seeding imports the existing frontend catalogue with its product IDs and does not overwrite existing records on later runs. Data URL images are not imported.

## Endpoints

Send `Accept: application/json`. Authenticated endpoints require `Authorization: Bearer <token>`; registration and login return `{user, token}`.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/register` | name, email, password (at least 8 characters) |
| POST | `/login` | email, password |
| POST | `/logout` | Revoke current token |
| GET/PATCH | `/me` | View or update name, phone, address |
| GET | `/products` | List; optional search, category, per_page |
| GET | `/products/{id}` | Product details |
| POST/PUT/DELETE | `/products[/{id}]` | Manage products (admin only) |
| GET | `/orders` and `/orders/{id}` | Current user's orders |
| POST | `/orders` | Place an order (authenticated) |

Example order:

```json
{"shipping_address":{"name":"Customer","address":"Street 1","city":"Phnom Penh","country":"Cambodia","phone":"012345678"},"shipping_method":"standard","items":[{"product_id":1,"quantity":1,"size":"M","color":"Black"}]}
```

The server calculates prices, verifies stock, and records orders as pending. Tax is 8%; shipping is $0, $15, or $35 for standard, express, or overnight. No payment is collected. Do not send card details to this API. Grant admin access by setting `is_admin` to true for a trusted user directly in PostgreSQL. No default admin account is created.

The React frontend still uses demo authentication, local products, and simulated checkout; it is not connected to this API and must not be treated as a real payment flow.
