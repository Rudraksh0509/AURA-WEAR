# AURA-WEAR 🛍️

Welcome to **AURA-WEAR**, a professional eCommerce platform built specifically for an apparel brand. This application features a premium fashion aesthetic, dual-level authentication, a comprehensive admin module, and secure payment processing.

## 🚀 Features

*   **Modern Tech Stack:** Built with Next.js 14 (App Router), React, and TypeScript.
*   **Database:** Prisma ORM for seamless and type-safe database access.
*   **Secure Authentication:** Dual-level authentication system for Customers and Administrators.
*   **Payments & Checkout:** Integrated with Stripe for secure payment processing.
*   **Admin Dashboard:** 
    * Manage Product Inventory (Create, Read, Update, Delete).
    * Manage Product Categories.
    * Handle direct image uploads for products.
    * Order Tracking & Management.
*   **Premium Design:** Professionally tuned UI/UX focusing on a high-end fashion brand aesthetic.

## 🛠️ Getting Started

First, make sure to install all dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables
You will need to set up a `.env` file in the root directory and add securely generated keys for your database, NextAuth, and Stripe.

```env
DATABASE_URL="your_database_url_here"

# NextAuth
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Stripe 
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

*(Note: Never commit your real `.env` file to GitHub)*

### Prisma Setup
Once your environment variables are set, initialize the database schema:

```bash
npx prisma generate
npx prisma db push
```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📚 Structure

* `src/app`: Contains the Next.js App Router Pages (Client and Admin).
* `src/lib`: Contains utility functions, database configs, auth configs, and Stripe setups.
* `prisma/`: Contains the database schema definition. 

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Rudraksh0509/AURA-WEAR/issues).

---

Built with ❤️ for **AURA-WEAR**
