# GreenCart --- Team Project Workflow

## 1. Project Overview

**Project:** GreenCart\
**Type:** Full-stack agricultural marketplace

GreenCart connects:

1.  Farmers
2.  Dealers
3.  Customers
4.  Delivery Personnel
5.  Support Staff
6.  Administrators

## 2. Technology Stack

  Layer             Technology
  ----------------- ---------------------------------------------
  Frontend          React.js, JavaScript, HTML5, CSS, Bootstrap
  Backend           Node.js, Express.js
  Database          MySQL
  Version Control   Git + GitHub

## 3. Six Main Modules

### Farmer Module

-   Farmer registration
-   Profile management
-   Agricultural product listing
-   Product management

### Dealer Module

-   Dealer registration
-   Bulk product management
-   Inventory management
-   Stock availability management

### Customer Module

-   Customer registration
-   Product browsing
-   Product selection
-   Order placement
-   Order status tracking

### Delivery Personnel Module

-   Assigned order management
-   Delivery handling
-   Delivery/order status updates

### Support Staff Module

-   Customer queries
-   Support requests
-   Customer assistance

### Administrator Module

-   User management
-   Product management
-   Overall platform management

> Features may be added when development reveals a genuine requirement.
> New features must be discussed and documented before being treated as
> final scope.

# 4. Overall Development Workflow

``` text
PROJECT DOCUMENTS
       ↓
REQUIREMENTS FINALIZATION
       ↓
SYSTEM ARCHITECTURE
       ↓
DATABASE DESIGN
       ↓
PROJECT INITIALIZATION
       ↓
BACKEND FOUNDATION
       ↓
AUTHENTICATION & AUTHORIZATION
       ↓
FRONTEND FOUNDATION
       ↓
FARMER MODULE
       ↓
DEALER MODULE
       ↓
CUSTOMER MODULE
       ↓
DELIVERY MODULE
       ↓
SUPPORT MODULE
       ↓
ADMIN MODULE
       ↓
API INTEGRATION
       ↓
TESTING & BUG FIXING
       ↓
UI POLISH
       ↓
DOCUMENTATION
       ↓
FINAL DEMO / DEPLOYMENT
```

# 5. Phase-by-Phase Plan

## Phase 0 --- Documents & Requirements

### Goal

Collect and finalize all project documents before coding.

### Tasks

-   Abstract
-   Module details
-   Functional requirements
-   Non-functional requirements
-   Project scope
-   User roles
-   Reference documents

### Output

Approved project requirements.

## Phase 1 --- Repository Setup

### Goal

Prepare GitHub and local development.

### Tasks

-   Clone repository
-   Configure Git
-   Create project structure
-   Initialize React frontend
-   Initialize Node/Express backend
-   Configure MySQL
-   Create `.env.example`
-   Configure `.gitignore`
-   Update README

### Output

A clean runnable project skeleton.

## Phase 2 --- System Architecture

### Goal

Define communication between frontend, backend, database,
authentication, and modules.

``` text
React Frontend
      |
    REST API
      |
Node + Express
      |
     SQL
      |
    MySQL
```

### Output

Architecture diagram, API structure, and module boundaries.

## Phase 3 --- Database Design

### Tasks

-   Identify entities
-   Define relationships
-   Create ER diagram
-   Define tables
-   Define primary/foreign keys
-   Define constraints
-   Create `schema.sql`
-   Create seed data if required

### Output

Approved database schema.

## Phase 4 --- Backend Foundation

### Tasks

-   Express application
-   Server configuration
-   Database connection
-   Environment configuration
-   Error handling
-   Middleware
-   API routing structure
-   Validation structure
-   Controller/service structure

### Output

Backend starts successfully and connects to MySQL.

## Phase 5 --- Authentication & Authorization

### Tasks

-   Registration
-   Login
-   Password hashing
-   Authentication
-   Role-based authorization
-   Protected routes
-   Token/session handling
-   Logout

### Roles

Farmer, Dealer, Customer, Delivery Personnel, Support Staff,
Administrator.

# 6. Module Development Workflow

Every module follows:

``` text
Module Requirements
       ↓
Database Requirements
       ↓
Backend API
       ↓
API Validation
       ↓
Frontend Pages
       ↓
Frontend Components
       ↓
API Integration
       ↓
Testing
       ↓
Documentation
       ↓
Git Commit
```

### Farmer

Database → Backend → API → Validation → Frontend → Integration → Testing
→ Documentation

### Dealer

Database → Backend → API → Validation → Frontend → Integration → Testing
→ Documentation

### Customer

Customer account → Product browsing → Product selection → Order
placement → Order status → Testing

### Delivery Personnel

Delivery access → Assigned orders → Delivery handling → Status updates →
Testing

### Support Staff

Support access → Customer queries → Support requests →
Response/resolution → Testing

### Administrator

Admin access → User management → Product management → Overall platform
management → Testing

# 7. Team GitHub Workflow

Use:

``` text
main
  ↑
develop
  ↑
feature branch
```

### main

Stable/demo-ready code.

### develop

Integrated development branch.

### Feature branches

``` text
feature/authentication
feature/farmer-module
feature/dealer-module
feature/customer-module
feature/delivery-module
feature/support-module
feature/admin-module
```

# 8. Standard Git Workflow

Before work:

``` bash
git checkout develop
git pull origin develop
```

Create branch:

``` bash
git checkout -b feature/farmer-module
```

After work and testing:

``` bash
git add .
git commit -m "feat: implement farmer module"
git push origin feature/farmer-module
```

Then create a Pull Request:

``` text
feature/farmer-module
        ↓
      develop
```

After integration and testing:

``` text
develop
   ↓
main
```

# 9. Commit Message Standard

  Prefix     Use
  ---------- ---------------------------
  feat       New functionality
  fix        Bug fix
  docs       Documentation
  db         Database changes
  ui         UI changes
  test       Testing
  refactor   Code restructuring
  chore      Maintenance/configuration

Examples:

``` text
feat: add farmer registration API
feat: implement customer product browsing
db: create orders table
ui: add farmer dashboard
fix: resolve login validation issue
docs: update customer module documentation
test: add authentication test cases
```

Avoid:

``` text
final
final2
new
changes
test
abc
```

# 10. GitHub Issue Management

Suggested issues:

``` text
#1 Project setup
#2 Database architecture
#3 Authentication
#4 Farmer module
#5 Dealer module
#6 Customer module
#7 Delivery module
#8 Support module
#9 Admin module
#10 API testing
#11 UI testing
#12 Final documentation
```

Normal flow:

``` text
Issue
  ↓
Development branch
  ↓
Implementation
  ↓
Testing
  ↓
Pull Request
  ↓
Review
  ↓
Merge
```

# 11. Pull Request Checklist

Before merging:

-   [ ] Feature works
-   [ ] No obvious console errors
-   [ ] API tested
-   [ ] Database changes tested
-   [ ] Frontend tested
-   [ ] Existing functionality still works
-   [ ] No `.env` or secrets committed
-   [ ] Documentation updated
-   [ ] Meaningful commit message

# 12. Documentation Workflow

Documentation is updated along with development.

``` text
docs/
├── 01-project-overview/
├── 02-requirements/
├── 03-modules/
├── 04-system-design/
├── 05-api/
├── 06-ui/
├── 07-testing/
└── 08-project-management/
```

# 13. Database Change Workflow

``` text
Requirement
    ↓
Identify affected entities
    ↓
Update ER design
    ↓
Update schema
    ↓
Update backend
    ↓
Test
    ↓
Document
```

Database files:

``` text
database/
├── schema.sql
├── seed.sql
└── migrations/
```

# 14. API Development Workflow

``` text
Requirement
   ↓
Route
   ↓
Controller
   ↓
Validation
   ↓
Service/business logic
   ↓
Database
   ↓
Response
   ↓
Testing
   ↓
API documentation
```

Document each API's endpoint, method, authentication requirement,
request body, response, and errors.

# 15. Testing Workflow

### Backend

-   API testing
-   Authentication testing
-   Validation testing
-   Database testing
-   Error handling

### Frontend

-   Page testing
-   Form validation
-   Navigation
-   API integration
-   Role-based UI

### Integration

-   Frontend ↔ Backend
-   Backend ↔ MySQL
-   Authentication ↔ Protected APIs

### Final

-   End-to-end user flows
-   Cross-module testing
-   Regression testing

# 16. Security Workflow

Never commit:

``` text
.env
database passwords
JWT secrets
API keys
private credentials
```

Use `.env` locally and `.env.example` in GitHub.

Security checks: - Password hashing - Authentication - Authorization -
Input validation - Protected APIs - Safe database access - Safe error
messages

# 17. Team Work Division

The six modules can be divided according to actual team availability.

Each member should:

-   Own assigned features.
-   Work on a feature branch.
-   Document their work.
-   Test before PR.
-   Report blockers.

If multiple members work on one module, divide by layers:

``` text
Member A → Backend/API
Member B → Frontend/UI
Member C → Database/Testing/Documentation
```

Avoid multiple members editing the same files unnecessarily.

# 18. Daily Team Workflow

### Start

``` text
Pull latest develop
↓
Check assigned issue
↓
Create/update feature branch
```

### During work

``` text
Code
↓
Run application
↓
Test feature
↓
Fix issues
↓
Update documentation
```

### End

``` text
git status
↓
git add .
↓
git commit
↓
git push
↓
Update GitHub Issue
```

# 19. Weekly Team Workflow

At the end of each week:

-   Review completed features.
-   Review open issues.
-   Test integrated `develop`.
-   Update project documentation.
-   Update screenshots/diagrams.
-   Record progress.
-   Plan next week's tasks.

# 20. Final Project Workflow

``` text
Requirements Complete
        ↓
Database Complete
        ↓
Backend Complete
        ↓
Frontend Complete
        ↓
All 6 Modules Complete
        ↓
API Integration Complete
        ↓
Testing Complete
        ↓
Bug Fixing
        ↓
UI/UX Polish
        ↓
Documentation Complete
        ↓
Screenshots & Diagrams
        ↓
README Complete
        ↓
Final GitHub Review
        ↓
Final Demo
```

# 21. Definition of Done

A task is DONE only when:

-   [ ] Code implemented
-   [ ] Database/API changes completed if required
-   [ ] Validation added
-   [ ] Error handling added
-   [ ] Feature tested
-   [ ] Documentation updated
-   [ ] Git commit created
-   [ ] Branch pushed
-   [ ] Pull Request reviewed
-   [ ] Changes merged

# 22. Important Team Rule

Do not add features just because they are common in e-commerce projects.

Every new feature must answer:

1.  Why is it needed?
2.  Which module does it belong to?
3.  Does it fit the project scope?
4.  Does it require database changes?
5.  Does it require API changes?
6.  Does it require UI changes?
7.  Has it been documented?

If approved, add it to the project requirements before implementation.

## Team Goal

Build GreenCart as a clean, maintainable, documented, professional
full-stack project that every team member can understand and demonstrate
during the final project presentation and viva.
