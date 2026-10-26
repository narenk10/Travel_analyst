import assert from 'node:assert/strict'
import test from 'node:test'
import mongoose from 'mongoose'
import Booking from './Booking.js'
import TravelPackage from './TravelPackage.js'

const validPackage = {
  name: 'Kerala Backwaters',
  region: 'Kerala',
  category: 'Wellness',
  price: 24999,
  occupancy: 84,
  satisfaction: 4.9,
  bookings: 430,
  revenue: 4140000,
  conversion: 17.8,
  nps: 81,
  profitability: 36,
  risk: 'Low',
  trend: 'Rising',
}

test('TravelPackage accepts valid analytics fields and enables timestamps', () => {
  const packageDocument = new TravelPackage(validPackage)

  assert.equal(packageDocument.validateSync(), undefined)
  assert.ok(packageDocument.schema.options.timestamps)
})

test('TravelPackage rejects out-of-range metrics and unsupported risk values', () => {
  const packageDocument = new TravelPackage({
    ...validPackage,
    occupancy: 101,
    satisfaction: 5.1,
    risk: 'Unknown',
  })
  const error = packageDocument.validateSync()

  assert.ok(error)
  assert.ok(error.errors.occupancy)
  assert.ok(error.errors.satisfaction)
  assert.ok(error.errors.risk)
})

test('Booking accepts a valid package reference and travel period', () => {
  const booking = new Booking({
    package: new mongoose.Types.ObjectId(),
    travelerName: 'Asha Rao',
    travelerEmail: 'asha@example.com',
    travelStartDate: new Date('2026-12-10'),
    travelEndDate: new Date('2026-12-15'),
    travelers: 2,
    totalAmount: 49998,
  })

  assert.equal(booking.validateSync(), undefined)
  assert.equal(booking.status, 'Pending')
})

test('Booking rejects invalid email, traveler count, and date order', () => {
  const booking = new Booking({
    package: new mongoose.Types.ObjectId(),
    travelerName: 'Asha Rao',
    travelerEmail: 'not-an-email',
    travelStartDate: new Date('2026-12-15'),
    travelEndDate: new Date('2026-12-10'),
    travelers: 0,
    totalAmount: 49998,
  })
  const error = booking.validateSync()

  assert.ok(error)
  assert.ok(error.errors.travelerEmail)
  assert.ok(error.errors.travelEndDate)
  assert.ok(error.errors.travelers)
})
