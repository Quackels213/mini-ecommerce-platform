# 🛒 ShopIT: Mini E-Commerce Platform

A full-stack e-commerce mini application that allows users to submit and browse products with smart contextual search — built with **React.js**, **Tailwind CSS**, **shadcn/ui**, **Express.js**, **Node.js** and **PostgreSQL**.

---

## 🔮 Features

- ⚡ **Real-Time Product Listing** – new products appear without page reload after submission
- 🧠 **Smart Contextual Search** – breaks natural phrases into keywords for intelligent matching
- 🧩 **Component Library: shadcn/ui** – used for buttons, inputs, cards, and more with accessibility baked in
- 💾 **PostgreSQL + Prisma** – powerful database with scalable schema and ORM queries
- 🎨 **Tailwind CSS + Responsive Design** – clean, mobile-friendly layout with minimal effort
- ✅ **Form Validation** – robust client and server-side validation
- 🔄 **Native Fetch** – simple and direct API data fetching using built-in methods

---

## 🛠 Tech Stack

| Layer      | Tech Used                            |
|------------|--------------------------------------|
| Frontend   | React.js, Tailwind CSS, shadcn/ui    |
| Data Fetch | Native Fetch API / Axios             |
| Backend    | Node.js, Express.js                  |
| ORM        | Prisma                               |
| Database   | PostgreSQL                           |
| State      | React Hook Form (optional)           |
| Versioning | Git & GitHub                         |

---

## 🧠 Contextual Search Logic

If a user types:

> _“Need something to sit with family”_

The app breaks it into **keywords** like `sit`, `family` and returns products where name or description contains relevant words, e.g. **"Wooden Sofa"** — no external AI libraries required.

---

## 📂 Project Structure

```bash
.
├── prisma/                   # Prisma schema and migrations
│   └── schema.prisma
│   └── migrations/
├── public/                  # Static assets
│   └── 404-illustration.svg
│   └── ecommerce.svg
│   └── placeholder.svg
├── server/                  # Backend logic
│   └── server.js
├── src/                     # Frontend app
│   ├── components/          # Reusable UI components
│   ├── pages/               # Route-level components
│   ├── lib/
│   │   ├── api/             # API calls using axios or fetch
│   │   └── utils/           # Helper functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env                     # Environment variables
├── package.json
├── README.md

```


## ⚙️ Installation

1. **Fork this repository:** 
   Click the Fork button located in the top-right corner of this page.

2. **Clone the repository:**
   
   git clone https://github.com/<your-username>/mini-ecommerce-platform.git
   ```
3. **Create .env file:**
   In root directories create `.env` and set:

   ```bash
   PORT=5000
   DATABASE_URL="<Your PostgreSQL DB URI>"
   ```

4. **Install dependencies:**
   ```bash
   npm install     # Run in root directory
   npx prisma init
   npx prisma migrate dev --name init
   npx prisma generate

   ```
5. **Start the servers:**
   Frontend:
   ```bash
   npm run dev
   ```
   Backend:
   ```bash
   npm run start
   ```
6. **Access the application:**
   ```bash
   http://localhost:5173/
   ```


## 📧 Contact Information

For questions or inquiries, please contact [Neeraj Gupta](mailto:guptaneeraj2811@gmail.com).
   