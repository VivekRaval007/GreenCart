# GreenCart --- Claude Project Context & Development Rules

## 1. Project Identity

**Project Name:** GreenCart\
**Project Type:** Full-stack agricultural marketplace\
**Purpose:** Connect farmers, dealers, customers, delivery personnel,
support staff, and administrators through one digital platform for
transparent and efficient agri-commerce.

## 2. Confirmed Main Modules

1.  Farmer Module
2.  Dealer Module
3.  Customer Module
4.  Delivery Personnel Module
5.  Support Staff Module
6.  Administrator Module

These are the six main role-based modules. Do not create additional
top-level modules unless project documents or approved requirements
justify them.

Features inside these modules may be expanded during development when
genuinely required. Any new feature must fit the project scope and be
documented.

## 3. Technology Stack

-   Frontend: React.js, JavaScript, HTML5, CSS, Bootstrap
-   Backend: Node.js, Express.js
-   Database: MySQL
-   Version Control: Git + GitHub

Architecture:

``` text
React Frontend
      |
      | HTTP / REST API
      v
Node.js + Express Backend
      |
      | SQL
      v
MySQL Database
```

## 4. Target Repository Structure

``` text
GreenCart/
├── README.md
├── LICENSE
├── .gitignore
├── .env.example
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── modules/
│       │   ├── farmer/
│       │   ├── dealer/
│       │   ├── customer/
│       │   ├── delivery/
│       │   ├── support/
│       │   └── admin/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── routes/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   ├── migrations/
│   └── README.md
├── docs/
│   ├── 01-project-overview/
│   ├── 02-requirements/
│   ├── 03-modules/
│   ├── 04-system-design/
│   ├── 05-api/
│   ├── 06-ui/
│   ├── 07-testing/
│   └── 08-project-management/
├── diagrams/
├── screenshots/
├── scripts/
└── .github/
    ├── ISSUE_TEMPLATE/
    └── pull_request_template.md
```

## 5. Module Responsibilities

### Farmer Module

**Functionality:** Farmer registration, profile management, agricultural
product listing, and product management.

**Description:** Provides farmers with a digital platform to list and
manage fresh agricultural products and make their produce available
through GreenCart.

### Dealer Module

**Functionality:** Dealer registration, bulk product management,
inventory management, and stock availability management.

**Description:** Allows dealers to manage agricultural products handled
in bulk and maintain their inventory digitally.

### Customer Module

**Functionality:** Customer registration, product browsing, product
selection, order placement, and order status tracking.

**Description:** Allows customers to browse agricultural products,
purchase required products, and monitor order status.

### Delivery Personnel Module

**Functionality:** Managing assigned orders, handling deliveries, and
updating order status.

**Description:** Supports delivery operations and keeps customers
informed through delivery/order status updates.

### Support Staff Module

**Functionality:** Handling customer queries, responding to support
requests, and assisting customers.

**Description:** Provides customer assistance for queries and issues
related to the platform and its services.

### Administrator Module

**Functionality:** User management, product management, and overall
platform management.

**Description:** Provides centralized control over users, products, and
overall GreenCart operations.

## 6. Development Workflow

``` text
Requirements
    ↓
Architecture
    ↓
Database Design
    ↓
Backend Foundation
    ↓
Authentication & Authorization
    ↓
Frontend Foundation
    ↓
Module-by-Module Development
    ↓
API Integration
    ↓
Validation & Error Handling
    ↓
Testing
    ↓
UI Polish
    ↓
Documentation
    ↓
Final Deployment Preparation
```

## 7. Claude File-by-File Rule

The project will be developed one file at a time.

When asked to create a file:

1.  Create ONLY the requested file unless explicitly asked for multiple
    files.
2.  Respect the existing project structure.
3.  Reuse existing functions/components/services instead of duplicating
    logic.
4.  Do not silently change unrelated files.
5.  Clearly state dependencies if the requested file depends on a file
    that does not exist yet.
6.  Provide complete production-quality code, not pseudo-code.
7.  Keep naming consistent across frontend, backend, API, and database.
8.  Do not invent APIs, database columns, environment variables, or
    business rules without explaining the assumption.
9.  Prefer simple, maintainable code suitable for a student final-year
    project.

## 8. Code & Security Rules

-   Use clear names and focused files.
-   Validate user input.
-   Handle errors properly.
-   Never expose secrets.
-   Never hard-code passwords, API keys, JWT secrets, or database
    credentials.
-   Use `.env` for secrets.
-   Commit `.env.example`, never `.env`.
-   Use reusable components and services.
-   Keep API responses consistent.
-   Use password hashing, authentication, role-based authorization,
    server-side validation, safe database access, and protected APIs
    where applicable.
-   Do not claim a security feature is implemented until the code
    actually implements it.

## 9. Git Rules

Recommended branches:

``` text
main
  ↑
develop
  ↑
feature/<feature-name>
```

Examples:

``` text
feature/authentication
feature/farmer-module
feature/customer-orders
fix/login-validation
docs/update-api-documentation
```

Use meaningful commits:

``` text
feat: add farmer registration API
feat: implement product listing
fix: resolve login validation issue
docs: update farmer module documentation
db: add products table
ui: improve customer dashboard
test: add authentication test cases
```

Avoid commits such as `final`, `final2`, `new`, `changes`, `abc`.

## 10. Documentation Rules

Maintain documentation for:

-   Project overview
-   Objectives
-   Scope
-   Requirements
-   Six modules
-   System architecture
-   Database design
-   ER diagram
-   DFD/use cases
-   API documentation
-   UI/screenshots
-   Testing
-   Team responsibilities
-   Development log
-   Changelog

## 11. Source of Truth

When project documents are provided, treat them as the primary source of
truth.

Do not silently replace project-specific requirements with generic
assumptions.

If documents conflict: 1. Point out the conflict. 2. Do not silently
choose one. 3. Ask for a decision or use the latest explicitly approved
requirement.

## 12. Change Control

For a new feature:

``` text
New Requirement
      ↓
Check project scope
      ↓
Check affected module
      ↓
Check database/API/UI impact
      ↓
Approve feature
      ↓
Update documentation
      ↓
Implement
      ↓
Test
```

Do not add large features simply because they are common in e-commerce
applications.

## 13. Definition of Done

A feature is complete only when:

-   Code is implemented.
-   Required database/API changes exist.
-   Validation and error handling are present.
-   Frontend integration works where applicable.
-   The feature is tested.
-   Documentation is updated.
-   Git commit is made with a meaningful message.

## Claude Instruction

You are assisting in the development of the GreenCart project.

Always follow the project context, repository structure, module
boundaries, technology stack, documentation rules, security rules, and
file-by-file development workflow described in this document.

Do not generate the whole project at once.

Wait for the user to specify the next file or task.
