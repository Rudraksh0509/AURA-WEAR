# Software Requirements Specification
## AURAWEAR eCommerce Platform

---

## 1. Introduction

### 1.1 Purpose
The purpose of this Software Requirements Specification (SRS) is to provide a complete and detailed description of the software requirements for the AURAWEAR eCommerce Platform. This document outlines the functional and non-functional requirements, interfaces, and constraints of the system, serving as the primary reference for the development team, testers, and stakeholders.

### 1.2 Document Conventions
- **USER:** Refers to a guest or authenticated customer interacting with the storefront.
- **ADMIN:** Refers to a privileged user managing the backend inventory and orders.
- **FR:** Functional Requirement.
- **NFR:** Non-Functional Requirement.
Bold text is used to highlight key terms and entities. 

### 1.3 Intended Audience and Reading Suggestions
This document is intended for:
- **Developers:** To understand the specific architecture and implementation goals.
- **Project Managers & Stakeholders:** To track feature completion and scope.
- **QA Testers:** To develop test cases based on defined functional requirements.
Readers should begin with the overall description (Section 2) before proceeding to the specific system features (Section 4).

### 1.4 Product Scope
AURAWEAR is a high-performance, web-based eCommerce platform designed with a premium fashion aesthetic. The software facilitates a complete online shopping experience: product discovery, persistent cart management, secure checkout, and user account tracking. Additionally, it offers an exclusive administrative dashboard for managing storefront inventory (Products and Categories) and fulfilling orders. The platform aims to provide a fast, responsive, and secure shopping experience utilizing modern server-rendered capabilities (Next.js App Router).

### 1.5 References
- IEEE Standard 830-1998, Recommended Practice for Software Requirements Specifications.
- Next.js Documentation (App Router paradigm).
- Stripe API Documentation.
- Prisma ORM Documentation.

---

## 2. Overall Description

### 2.1 Product Perspective
AURAWEAR is a self-contained web platform combining the frontend client and backend API within a unified Next.js instance. It integrates with three external systems:
1. **Google OAuth Server**: For third-party authentication.
2. **Stripe Payment Gateway**: For securely processing financial transactions.
3. **Database (PostgreSQL/MySQL)**: For persistent data storage of users, products, categories, and orders.

### 2.2 Product Functions
The key functionality provided by the platform includes:
- **Authentication**: Secure registration and login via Email/Password or Google.
- **Catalog Browsing**: Browsing products filtered dynamically by categories.
- **Shopping Cart**: Accumulating products, selecting sizes and quantities.
- **Checkout & Payments**: Purchasing products via a secure Stripe checkout session.
- **Admin Management**: CRUD operations for the store catalog and order fulfillment status updates.

### 2.3 User Classes and Characteristics
1. **Customers (USER)**: Typical internet users with varying levels of technical proficiency. They focus on usability, page load speed, and a smooth checkout process. They may optionally create accounts.
2. **Administrators (ADMIN)**: Internal staff members who need efficient tools to manage product data, view sales metrics, and fulfill customer orders. They require protected access to the `/admin` interface.

### 2.4 Operating Environment
- **Client Side**: Responsive across modern desktop (Chrome, Firefox, Edge, Safari) and mobile web browsers.
- **Server Side**: Node.js runtime environment (e.g., hosted on Vercel or AWS), capable of processing server-rendered Next.js pages and internal API routes.

### 2.5 Design and Implementation Constraints
- The platform must be strictly built using **Next.js 14 App Router**.
- Database interactions must rely on **Prisma ORM** to enforce typesafety and schema syncing.
- Payment processing must never store credit card data directly in the proprietary database, relying wholly on Stripe.

### 2.6 User Documentation
No specific user manual is provided for standard customers; the UI will be self-explanatory. Tooltips and context labels may be present within the Admin dashboard.

### 2.7 Assumptions and Dependencies
- The application assumes the availability of an active internet connection.
- Dependencies include consistent uptime of the Stripe API and the chosen Database hosting provider.

---

## 3. External Interface Requirements

### 3.1 User Interfaces
- The web app will feature a sleek, modern UI with high-quality imagery logic, implementing mobile-first responsive design principles.
- The Admin dashboard (`/admin/*`) will feature a sidebar navigation panel with table-based layouts for managing catalog inventory.

### 3.2 Hardware Interfaces
Not applicable. The software interacts purely through standard web protocols and hardware-agnostic browsers.

### 3.3 Software Interfaces
- **Database System**: Connection via Prisma Client to a relational database instance.
- **OAuth 2.0**: Utilizing NextAuth.js to interface with Google's authorization endpoints.

### 3.4 Communications Interfaces
- HTTPS must be enforced for all interactions between the client browser and the server.
- The server will communicate with Stripe via secure Webhooks over HTTPS, validating requests using Stripe cryptographic signatures.

---

## 4. System Features

### 4.1 Authentication System
- **4.1.1 Description**: The system provides user identity verification.
- **4.1.2 Stimulus/Response**: 
  - User submits email/password -> System validates against bcrypt hashed DB entry -> Returns JWT session.
  - User selects Google Login -> System redirects to Google -> Google redirects back with profile -> System issues session.
- **4.1.3 Functional Requirements**:
  - The system must use Role-Based Access Control to distinguish `USER` from `ADMIN`.

### 4.2 Product Catalog & Detail Pages
- **4.2.1 Description**: Displays the current inventory to customers.
- **4.2.2 Stimulus/Response**: 
  - User clicks a category -> System queries products mapped to that `categoryId` and renders the list.
- **4.2.3 Functional Requirements**:
  - The system must display product names, prices, images, and track available stock levels.
  - Customers must be able to leave authenticated reviews mapping to specific products.

### 4.3 Shopping Cart & Secure Checkout
- **4.3.1 Description**: The purchasing flow mechanism.
- **4.3.2 Stimulus/Response**: 
  - User clicks checkout -> System generates a Stripe checkout URL and redirects -> User pays -> Stripe sends an asynchronous webhook to `/api/webhook` -> System creates an `Order` with `status: PENDING`.
- **4.3.3 Functional Requirements**:
  - The system must lock current `priceAtTime` per order item at the exact moment of the webhook resolution.

### 4.4 Admin Dashboard
- **4.4.1 Description**: Management interface for staff.
- **4.4.2 Functional Requirements**:
  - Admins must be able to perform Create, Read, Update, and Delete actions on the `Product` and `Category` tables.
  - Admins can upload bulk product configurations via `/api/products/bulk`.
  - Admins can update `Order` status to `SHIPPED` or `DELIVERED`, and assign tracking numbers.

---

## 5. Other Nonfunctional Requirements

### 5.1 Performance Requirements
- Server-Rendered pages should aim for a First Input Delay (FID) of less than 100ms.
- Use global `PrismaClient` singletons to eliminate database connection pool locking during development and high-load cycles.

### 5.2 Safety Requirements
- Database backups should be established through the deployment provider.
- Changes to Product Prices must not retroactively affect historical `OrderItems`.

### 5.3 Security Requirements
- All passwords must be hashed using `bcryptjs` with salt.
- The `/admin` route group and its respective `/api/admin` endpoints must explicitly validate the NextAuth token and verify `role === ADMIN`.
- Stripe webhooks must enforce signature verification to prevent spoofed `checkout.session.completed` events.

### 5.4 Software Quality Attributes
- **Maintainability**: Strict usage of TypeScript is required across all components, enforcing explicit typing of models matching the Prisma schema.
- **Usability**: The design must adapt logically from mobile (320px) to wide-desktop sizes.

### 5.5 Business Rules
- Orders are only marked as `PENDING` if Stripe confirms payment validation.
- Only users who hold the role `ADMIN` in the database may access internal routes.

---

## 6. Other Requirements
### Appendix A: Glossary
- **JWT**: JSON Web Token.
- **ORM (Object-Relational Mapping)**: Abstraction layer (Prisma) converting SQL DB rows into JavaScript objects.
- **Webhook**: An HTTP request generated by a 3rd party (Stripe) indicating an event has occurred.
