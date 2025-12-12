# BuyNest Backend (Node/Express + MongoDB)

This is a minimal backend skeleton for BuyNest. It includes:

- Express server
- MongoDB via Mongoose
- JWT Authentication (register/login)
- Products, Categories, Orders
- Seed script to populate sample data

## Setup

1. Copy `.env.example` to `.env` and update `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
npm install
```

3. Seed sample data (creates admin user `admin@buynest.test` with password `admin123`):

```bash
npm run seed
```

4. Start server:

```bash
npm start
# or for dev with nodemon:
npm run dev
```

## API (example)

- `POST /api/auth/register` `{ name, email, password }`
- `POST /api/auth/login` `{ email, password }`
- `GET /api/products`
- `GET /api/categories`
- `POST /api/orders` (auth required)
