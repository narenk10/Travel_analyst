# Backend Mongoose models

This package defines MongoDB models for travel package analytics:

- `TravelPackage` stores package details and performance measures, with bounds and enums for analytics fields.
- `Booking` stores traveler booking details and references a `TravelPackage`.

Both schemas include created/updated timestamps and validation. From this folder, run `npm install` to install Mongoose and `npm test` to run the schema validation tests.
