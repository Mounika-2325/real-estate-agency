# EstatePro - Production Real Estate Agency Web Application

EstatePro is a full-stack, responsive real estate web application built using **React.js, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB**. It enables users to browse, search, filter, and view high-end residential and commercial properties across major Indian metro cities (Hyderabad, Bangalore, Mumbai, Chennai, Pune), view agent details, and submit inquiries.

---

## Quick Start Instructions

### 1. Start Backend API Server
```bash
cd backend
npm install
npm run dev
```
*Runs on `http://localhost:5000/api` with automatic database seeding.*

### 2. Start Frontend React App
```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:3000` (or `http://localhost:5173`).*

---

## API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/properties` | Fetch all properties (supports `city`, `propertyType`, `listingType`, `minPrice`, `maxPrice`, `bedrooms`, `search`, `sort`) |
| `GET` | `/api/properties/:id` | Fetch property details by ID with populated Agent data |
| `POST` | `/api/properties` | Create property listing |
| `PUT` | `/api/properties/:id` | Update property listing |
| `DELETE` | `/api/properties/:id` | Delete property listing |
| `GET` | `/api/agents` | Fetch list of agents |
| `GET` | `/api/agents/:id` | Fetch single agent details |
| `POST` | `/api/inquiries` | Submit user inquiry/contact request |
| `GET` | `/api/inquiries` | Fetch submitted inquiries |
| `POST` | `/api/seed` | Trigger database re-seeding |
