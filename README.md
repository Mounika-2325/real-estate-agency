# EstatePro - Production Real Estate Agency Web Application

EstatePro is a full-stack, responsive real estate web application built using **React.js, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB**. It enables users to browse, search, filter, and view high-end residential and commercial properties across major Indian metro cities (Hyderabad, Bangalore, Mumbai, Chennai, Pune), view agent details, and submit inquiries.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Key Features](#key-features)
4. [Technology Stack](#technology-stack)
5. [System Architecture](#system-architecture)
6. [Folder Structure](#folder-structure)
7. [Database Schema Design](#database-schema-design)
8. [REST API Endpoints](#rest-api-endpoints)
9. [Installation & Setup Instructions](#installation--setup-instructions)
10. [Environment Variables](#environment-variables)
11. [Running the Application](#running-the-application)
12. [Testing & Verification Checklist](#testing--verification-checklist)
13. [Future Enhancements](#future-enhancements)

---

## Project Overview
EstatePro is designed to bridge the gap between homebuyers/investors and real estate agencies. It provides an intuitive, high-performance interface where users can find verified property listings with complete details (pricing in Indian Rupee format, location, property type, bedrooms, area in sq.ft, image galleries, and building amenities).

---

## Problem Statement
Traditional property search platforms are often cluttered, slow, contain unverified or hard-coded fake listings, lack proper responsive design for mobile devices, and offer poor search/filter mechanisms. EstatePro addresses these issues by offering:
- Fast backend API queries with dynamic indexing.
- 100% responsive user interface optimized for mobile, tablet, and desktop viewports.
- Automatic database fallback for zero-friction local development setup.
- Real-time search filters for location, city, buy/rent status, price range, property types, and bedrooms.

---

## Key Features

### Frontend (User Interface)
- **Home Page**: Hero banner search bar overlay, real-time stats counter, featured properties carousel/grid, popular city showcase cards, "Why Choose Us" grid, services list, and interactive CTA section.
- **Properties Page**: Comprehensive search & filter bar, city selector, property type selector, buy/rent toggle, minimum/maximum price filters, min bedrooms selector, clear filter actions, result count indicators, and empty state banners.
- **Property Details Page**: Multi-image photo gallery viewer with clickable thumbnail switcher, property badges, detailed description, building amenities with icons, special specifications, and agent contact card.
- **Contact Agent Modal**: Integrated popup form pre-populated with property details, field validation, duplicate submission protection, loading indicators, and success notifications.
- **Contact Page**: Standalone contact page with live client-side validation for general inquiries.
- **About Page**: Agency mission, vision statement, company story, core values, and executive leadership team cards.
- **Responsive Layout**: Mobile menu drawer with smooth toggle animation for smartphones and tablets.

### Backend & Database
- **RESTful API**: Express.js server providing structured JSON endpoints.
- **MongoDB & Mongoose Models**: Schemas for Property, Agent, and Inquiry with relationships and index optimizations.
- **Automatic DB Fallback & Seeding**: Auto-connects to primary MongoDB URI or spawns an in-memory MongoDB instance automatically, seeding realistic Indian property data if empty.
- **Robust Error Handling**: Centralized error middleware masking internal stack traces and providing readable status codes.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Core** | React 18, Vite, JavaScript (ES6+) |
| **Styling & Icons** | Tailwind CSS v3, Lucide React Icons |
| **Routing** | React Router v6 |
| **API Client** | Axios |
| **Backend Runtime** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Dev Tooling** | Nodemon, MongoMemoryServer, PostCSS, Autoprefixer |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      React Frontend                         │
│   (Vite + React Router + Tailwind CSS + Lucide Icons)       │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / REST API (JSON)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Node.js Express API                    │
│    (Controllers + Mongoose Models + Error Middleware)       │
└──────────────────────────────┬──────────────────────────────┘
                               │ Mongoose ODM
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB Database                       │
│    (Collections: agents, properties, inquiries)             │
└─────────────────────────────────────────────────────────────┘
```

---

## Folder Structure

```
real-estate-agency/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & memory fallback
│   ├── controllers/
│   │   ├── propertyController.js # Property search, filter & CRUD
│   │   ├── agentController.js    # Agent list & details
│   │   └── inquiryController.js  # Inquiry submission & retrieval
│   ├── middleware/
│   │   └── errorHandler.js       # Centralized error handler
│   ├── models/
│   │   ├── Agent.js              # Agent Mongoose model
│   │   ├── Property.js           # Property Mongoose model
│   │   └── Inquiry.js            # Inquiry Mongoose model
│   ├── routes/
│   │   ├── propertyRoutes.js     # /api/properties endpoints
│   │   ├── agentRoutes.js        # /api/agents endpoints
│   │   └── inquiryRoutes.js      # /api/inquiries endpoints
│   ├── seed/
│   │   ├── seedData.js           # Sample Indian property dataset
│   │   └── seedRunner.js         # DB seeder execution script
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation header & mobile menu
    │   │   ├── Footer.jsx        # Footer links & contact info
    │   │   ├── PropertyCard.jsx  # Property card display
    │   │   ├── PropertySearch.jsx# Filter search bar component
    │   │   ├── ContactModal.jsx  # Agent inquiry popup form
    │   │   ├── ImageFallback.jsx # Error-resilient image loader
    │   │   └── SkeletonCard.jsx  # Loading state placeholder
    │   ├── layouts/
    │   │   └── MainLayout.jsx    # Common page wrapper layout
    │   ├── pages/
    │   │   ├── Home.jsx          # Hero search, stats, cities, featured
    │   │   ├── Properties.jsx    # Search & filter grid page
    │   │   ├── PropertyDetail.jsx# Detailed property view & agent card
    │   │   ├── Contact.jsx       # Contact page with validation
    │   │   ├── About.jsx         # Agency history, mission, team
    │   │   └── NotFound.jsx      # Custom 404 page
    │   ├── services/
    │   │   └── api.js            # Centralized Axios API service layer
    │   ├── utils/
    │   │   └── formatters.js     # Currency (₹ INR) & area formatters
    │   ├── App.jsx               # Routes setup
    │   ├── main.jsx
    │   └── index.css             # Tailwind CSS & custom styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.example
    └── package.json
```

---

## Database Schema Design

### 1. Agent Model (`Agent`)
- `name` (String, Required)
- `email` (String, Required, Unique)
- `phone` (String, Required)
- `photo` (String, Required Image URL)
- `designation` (String, Required)
- `bio` (String, Required)
- `timestamps` (createdAt, updatedAt)

### 2. Property Model (`Property`)
- `title` (String, Required)
- `description` (String, Required)
- `price` (Number, Required)
- `location` (String, Required Locality)
- `city` (String, Required - e.g., Hyderabad, Bangalore, Mumbai, Chennai, Pune)
- `state` (String, Required)
- `propertyType` (String, Enum: ['Apartment', 'Villa', 'House', 'Plot'])
- `listingType` (String, Enum: ['Sale', 'Rent'])
- `bedrooms` (Number, Default: 0)
- `bathrooms` (Number, Default: 0)
- `area` (Number, Sq.ft)
- `images` ([String], Array of Image URLs)
- `amenities` ([String], Amenities tags)
- `features` ([String], Special specifications)
- `agent` (ObjectId, ref: 'Agent')
- `timestamps` (createdAt, updatedAt)

### 3. Inquiry Model (`Inquiry`)
- `name` (String, Required)
- `email` (String, Required)
- `phone` (String, Required)
- `subject` (String, Required)
- `message` (String, Required)
- `property` (ObjectId, ref: 'Property', Optional)
- `timestamps` (createdAt, updatedAt)

---

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/properties` | Fetch all properties (Supports `city`, `propertyType`, `listingType`, `minPrice`, `maxPrice`, `bedrooms`, `search`, `sort`) |
| `GET` | `/api/properties/:id` | Fetch single property details by ID with populated Agent data |
| `POST` | `/api/properties` | Create a new property listing |
| `PUT` | `/api/properties/:id` | Update property listing by ID |
| `DELETE` | `/api/properties/:id` | Delete property listing by ID |
| `GET` | `/api/agents` | Fetch all agents |
| `GET` | `/api/agents/:id` | Fetch single agent by ID |
| `POST` | `/api/inquiries` | Save user inquiry/contact request |
| `GET` | `/api/inquiries` | Retrieve submitted inquiries |
| `POST` | `/api/seed` | Trigger database re-seeding with sample Indian property data |

---

## Environment Variables

### Backend (`real-estate-agency/backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realestate
NODE_ENV=development
```

### Frontend (`real-estate-agency/frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Running the Application

### 1. Start the Backend Server
```bash
cd real-estate-agency/backend
npm install
npm run dev
```
*The server will run on `http://localhost:5000/api` and automatically populate sample properties if MongoDB is empty.*

### 2. Start the Frontend Application
In a separate terminal window:
```bash
cd real-estate-agency/frontend
npm install
npm run dev
```
*The frontend will start on `http://localhost:3000` (or `http://localhost:5173`).*

---

## Testing & Verification Checklist

- [x] **Backend API Health Check**: `GET /api` returns clean JSON configuration status.
- [x] **Property Filtering**: `GET /api/properties?city=Hyderabad&propertyType=Apartment` correctly filters database results.
- [x] **Single Property Fetch**: `GET /api/properties/:id` returns property specs along with populated agent details.
- [x] **Inquiry Submission**: `POST /api/inquiries` validates inputs and saves records into MongoDB.
- [x] **Frontend Production Build**: `npm run build` compiles cleanly without CSS or JS errors.
- [x] **Responsive Layout**: Tested across mobile (375px), tablet (768px), and desktop (1280px+) screen sizes.
- [x] **Image Error Handling**: ImageFallback component switches broken remote images to fallback placeholders.

---

## Future Enhancements
- User Authentication (JWT-based Login/Signup for Buyers & Agents).
- Saved Favorite Properties / Wishlist (LocalStorage / User Account).
- Interactive Google Maps integration with spatial pins.
- Mortgage / EMI Calculator component on Property Detail page.
