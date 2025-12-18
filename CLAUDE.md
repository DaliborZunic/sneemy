# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sneemy is an e-commerce application with a React frontend and .NET 8 Web API backend. The backend serves the SPA in production via a unified deployment pipeline.

## Development Commands

### Backend (.NET 8)
```bash
# Run from repo root or backend folder
dotnet run --project backend/Sneemy.API.csproj

# Apply EF migrations
dotnet ef database update --project backend/Sneemy.API.csproj

# Add a new migration
dotnet ef migrations add <MigrationName> --project backend/Sneemy.API.csproj
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev      # Dev server at http://localhost:5173
npm run build    # Production build to dist/
npm run lint     # ESLint
```

### Full Stack Development
Run both concurrently:
- Backend: `dotnet run` (HTTPS on port 7265)
- Frontend: `npm run dev` (proxies /api to backend)

## Architecture

### Backend Structure (`backend/`)
- **Controllers/** - API endpoints (Auth, Orders)
- **Services/** - Business logic (AuthService, JwtService, UserService, OrderService, StripeService)
- **Interfaces/** - Service contracts
- **Models/** - EF entities (User, Order)
- **DTOs/** - Data transfer objects
- **Data/** - ApplicationDbContext (IdentityDbContext<User>) and SeedData

Key technologies:
- ASP.NET Core Identity for auth
- JWT Bearer authentication
- PostgreSQL via Npgsql
- Stripe integration for payments

### Frontend Structure (`frontend/src/`)
- **modules/admin/** - Admin panel (lazy-loaded via AdminApp.tsx)
- **modules/site/** - Public site (lazy-loaded via SiteApp.tsx)
- **modules/shared/** - Shared components
- **auth/** - AuthContext with JWT token management
- **api.ts** - Axios instance with auth interceptor

Routing: React Router v7 with two main route groups (`/*` for site, `/admin/*` for admin panel).

### Unified Deployment
The csproj includes MSBuild targets that:
1. Run `npm install` and `npm run build` in frontend/
2. Copy dist/ contents to publish/wwwroot/
3. Backend serves SPA via UseStaticFiles() with fallback to index.html

## Database

PostgreSQL with Entity Framework Core. Connection string in appsettings.json (gitignored - use appsettings.Development.json as template).

Tables: Users (Identity), Orders
