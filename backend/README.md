# Backend Mongoose models

This package defines MongoDB models for travel package analytics:

- `TravelPackage` stores package details and performance measures, with bounds and enums for analytics fields.
- `Booking` stores traveler booking details and references a `TravelPackage`.

Both schemas include created/updated timestamps and validation. From this folder, run `npm install` to install Mongoose and `npm test` to run the schema validation tests.

## Run the API

Set `MONGODB_URI` to your MongoDB connection string (see `.env.example` for the local format), then run:

```sh
npm install
npm start
```

The server connects to MongoDB before listening on `PORT` (default `5000`). The database-backed routes are:

- `GET /api/health` — confirms the API is running after the database connection succeeds.
- `GET /api/overview` — aggregates revenue, bookings, satisfaction, conversion, and package count.
- `GET /api/packages` and `POST /api/packages` — list and create travel packages.
- `GET /api/bookings` and `POST /api/bookings` — list and create bookings; booking creation verifies that its package exists.

The API validates writes through the Mongoose schemas and returns validation errors as HTTP 400 responses. Keep your actual connection string in an environment variable; do not commit it.
