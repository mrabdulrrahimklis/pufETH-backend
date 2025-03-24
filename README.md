# PufETH Tracker Backend

A NestJS backend service for tracking PufETH conversion rates using PostgreSQL and Prisma.

## Technologies
```

- NestJS v11
- PostgreSQL
- Prisma ORM
- Node.js (v23)
- Cron Jobs for rate tracking
- Puffer SDK for ETH conversions
```

## Project Structure
```

src/
├── conversion-rate/       # Conversion rate module
│   ├── controllers/      # API endpoints
│   ├── services/        # Business logic
│   └── types/          # Type definitions
├── prisma/              # Prisma schema and migrations
├── config/             # Configuration files
└── utils/              # Utility functions
```

## Prerequisites
```
- Node.js v23
- PostgreSQL
- npm or yarn
```

## Getting Started

1. Clone the repository:
```
git clone <repository-url>
cd pufeth-tracker-backend
```
2. Set up environment variables:
```
cp .env.example .env
```

4. Install dependencies:
```bash
npm install
```

5. Generate Prisma client:
```bash
npx prisma generate
```

6. Run database migrations:
```bash
npx prisma migrate dev
```

7. Start the development server:
```bash
npm run start:dev
```

## Features

- **Automated Rate Tracking**: Cron jobs fetch and store conversion rates periodically
- **RESTful API**: Endpoints for retrieving historical and current rates
- **Database Integration**: PostgreSQL with Prisma ORM for efficient data management

## API Endpoints

- `GET /conversion-rates`: Get historical conversion rates
- `GET /conversion-rates/current`: Get current conversion rate

## Database Schema

The main tables include:
- `ConversionRate`: Stores historical conversion rates
- `Transaction`: Records individual transactions

## Cron Jobs

The application uses NestJS Scheduled Tasks to:
- Fetch current rates every minute
- Clean up old data daily
- Generate statistical reports hourly

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Application port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Development

To run the project in development mode:

1. Ensure Node.js v23 is installed:
```bash
node --version
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```