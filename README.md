# 🛍️ Full-Stack E-Commerce Store

### Node.js + Express + Prisma + PostgreSQL + React + TypeScript + TailwindCSS

This is a full-stack e-commerce application featuring user shopping flow, cart, checkout, discount coupons, admin product control, and analytics dashboard.

The project includes:

- **Backend (Node + Express + Prisma)**
- **Frontend (React + TypeScript + TailwindCSS)**

---

# 🚀 Features Overview

## 👤 User Features

- User signup & login (JWT)
- Browse products
- Add to cart
- Update cart quantity
- Remove items from cart
- Checkout with:

  - Total price calculation
  - Discount code validation
  - 10% discount applied

- Auto-clear cart after checkout
- Auto-receive discount code every **Nth order**
- View active discount codes

---

## 👨‍💼 Admin Features

- Admin login
- Admin can create new admins
- Add/edit/delete products
- View all products
- View system statistics
- Auto-generate discount codes at Nth order
- Only admins can manage products
- Beautiful admin dashboard layout with sidebar

---

# 🧾 Admin Statistics API Includes

- Total orders
- Total revenue before discount
- Total revenue after discount
- Total discount given
- Total items sold
- List of all discount codes (active + used)

---

# 🏗️ Tech Stack

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt Password Hashing
- CORS + dotenv

## Frontend

- React
- TypeScript
- TailwindCSS
- React Router v6
- Axios
- Custom Auth Hooks + LocalStorage

---

# 📁 Project Structure

```
project/
 ├── backend/
 │    ├── src/
 │    │    ├── controller/
 │    │    ├── routes/
 │    │    ├── middlewares/
 │    │    ├── generated/ (prisma client)
 │    │    └── index.ts
 │    ├── prisma/schema.prisma
 │    ├── package.json
 │    └── tsconfig.json
 │
 └── frontend/
      ├── src/
      │    ├── components/
      │    ├── pages/
      │    ├── utils/
      │    ├── App.tsx
      │    └── main.tsx
      └── package.json
```

---

# ⚙️ Backend Setup

## 1️⃣ Install dependencies

```
cd backend
npm install
```

## 2️⃣ Create `.env`

```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<dbname>
JWT_SECRET=your-secret-key
NTH_ORDER=5
```

## 3️⃣ Prisma setup

```
npx prisma generate
npx prisma migrate dev
```

## test script

npm run test

## 4️⃣ Run server

```
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# 🔥 Backend API Endpoints

### 🔑 Auth

```
POST /auth/user-register
POST /auth/user-login
POST /auth/admin-login
POST /auth/admin-register
```

### 📦 Products (Admin)

```
POST /product/add-product
POST /product/update-product/:id
POST /product/delete-product/:id
POST /product/get-products
POST /product/get-product/:id
```

### 🛒 Cart (User)

```
POST /cart/add
GET  /cart
POST /cart/update
POST /cart/remove
```

### 💳 Checkout (User)

```
POST /cart/checkout
```

### 🎟️ Discounts

```
GET /discount/active
```

### 📊 Admin Stats

```
GET /admin/stats
```

---

# 🎨 Frontend Setup

## 1️⃣ Install dependencies

```
cd frontend
npm install
```

## 2️⃣ Create `.env`

```
VITE_BACKEND_URL=http://localhost:5000
```

## 3️⃣ Run app

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔐 Frontend Route Structure

## User Routes

```
/signin
/signup
/products
/cart
/checkout
```

## Admin Routes

```
/admin/signin
/admin/signup
/admin/products
/admin/add-product
/admin/create-admin
/admin/stats
```

---

# 🛡️ Security

- JWT protected API routes
- Separate middleware for user & admin
- Admin-only access control
- Tokens stored in localStorage
- Discount codes tied to user

---

# ⭐ Completed Requirements

- [x] User cart system
- [x] Checkout system
- [x] Discount code logic
- [x] Nth-order discount generation
- [x] Admin product management
- [x] Full admin analytics API
- [x] Complete UI with protected routes
- [x] Clean folder structure
- [x] Readable code with comments
- [x] Functional full-stack demo

---

# 🎉 Final Notes

This project demonstrates:

- Full-stack architecture
- Clean REST APIs
- Prisma schema design
- Real-world e-commerce flows
- Admin analytics
- Role-based access
- Beautiful & functional UI

You can extend this with:

- Charts (Recharts / Chart.js)
- Orders page for users
- Admin order history table
- Product filters & search

---

# 👾 Author

Built by Ashish — with clean code, proper architecture, and love ❤️.
