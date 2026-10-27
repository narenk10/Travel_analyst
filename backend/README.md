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
- `GET /api/packages` and `GET /api/packages/:id` — list packages or read one package by ID.
- `POST /api/packages` — create a travel package.
- `PUT /api/packages/:id` — update a package by ID with schema validation.
- `GET /api/bookings` and `GET /api/bookings/:id` — list bookings or read one booking by ID, including its populated package.
- `POST /api/bookings` — create a booking after verifying that its package exists.
- `PUT /api/bookings/:id` — update a booking by ID with schema validation and package-reference checks.

The API validates writes through the Mongoose schemas and returns validation errors as HTTP 400 responses. Keep your actual connection string in an environment variable; do not commit it.
