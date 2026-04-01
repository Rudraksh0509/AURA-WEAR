# AURAWEAR eCommerce Platform Implementation Plan

This plan outlines the architecture, technology stack, and step-by-step implementation strategy for the AURAWEAR eCommerce website.

## Technology Stack
- **Framework**: Next.js (App Router) to handle both frontend, admin, and backend API routes seamlessly.
- **Styling**: Vanilla CSS (CSS Modules/Global) to achieve a highly-customized, flexible premium aesthetic without being constrained by utility classes.
- **Database**: PostgreSQL with Prisma ORM for robust data modeling and type safety.
- **Authentication**: NextAuth.js employing JWT. We will utilize Role-Based Access Control (RBAC) with `ADMIN` and `USER` roles to secure admin endpoints.
- **Payments**: Stripe integrations for the user checkout experience.

## Proposed Database Schema (High-Level)
1. **User**: `id`, `name`, `email`, `passwordHash`, `role` (ADMIN/USER), `createdAt`
2. **Product**: `id`, `name`, `description`, `price`, `stock`, `categoryId`, `images[]`, `createdAt`
3. **Category**: `id`, `name` (e.g., Men, Women, New Arrivals)
4. **Order**: `id`, `userId`, `total`, `status` (PENDING, SHIPPED, DELIVERED), `trackingNumber`, `createdAt`
5. **OrderItem**: `id`, `orderId`, `productId`, `quantity`, `priceAtTime`
6. **Review**: `id`, `userId`, `productId`, `rating`, `comment`, `createdAt`

## Proposed Folder Structure
```text
/src
  /app
    /(client)         # Customer facing pages (Home, Shop, Cart, Profile)
    /admin            # Protected admin dashboard pages
    /api              # Backend logic (Auth, Products, Orders Stripe)
  /components
    /client           # Frontend specific components
    /admin            # Admin specific components
    /shared           # Reusable generic components
  /lib                # Utility functions, Prisma client, NextAuth config
  /styles             # Global vanilla CSS files and tokens
```

## User Review Required
> [!IMPORTANT]
> Please review the technology stack and the proposed structure. 
> Specifically, confirm if Next.js + PostgreSQL + Prisma + Vanilla CSS aligns with your vision.

> [!NOTE]
> We can start implementing right away. Would you prefer me to generate the Database Schema (SQL/Prisma) first, or start scaffolding the Next.js application folder structure?
