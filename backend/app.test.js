import assert from 'node:assert/strict'
import { once } from 'node:events'
import test from 'node:test'
import { createApp } from './app.js'

async function withServer(app, run) {
  const server = app.listen(0)
  await once(server, 'listening')
  const { port } = server.address()

  try {
    await run(`http://127.0.0.1:${port}`)
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()))
    })
  }
}

function createQuery(value) {
  return {
    populate() {
      return this
    },
    sort() {
      return this
    },
    lean() {
      return Promise.resolve(value)
    },
  }
}

test('GET /api/overview reads aggregated metrics from the package model', async () => {
  let aggregationPipeline
  const app = createApp({
    TravelPackageModel: {
      async aggregate(pipeline) {
        aggregationPipeline = pipeline
        return [{ totalRevenue: 1000, totalBookings: 4, packageCount: 2 }]
      },
    },
  })

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/overview`)

    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), {
      totalRevenue: 1000,
      totalBookings: 4,
      packageCount: 2,
    })
    assert.equal(aggregationPipeline[0].$group.totalRevenue.$sum, '$revenue')
  })
})

test('GET /api/packages reads records from the package model', async () => {
  const packages = [{ name: 'Coastal Escape' }]
  let findCalled = false
  const app = createApp({
    TravelPackageModel: {
      find() {
        findCalled = true
        return createQuery(packages)
      },
    },
  })

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/packages`)

    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), packages)
    assert.equal(findCalled, true)
  })
})

test('POST /api/packages writes a record using the model', async () => {
  const input = { name: 'Coastal Escape', region: 'Goa' }
  const app = createApp({
    TravelPackageModel: {
      async create(document) {
        return { _id: 'package-1', ...document }
      },
    },
  })

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/packages`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
    })

    assert.equal(response.status, 201)
    assert.deepEqual(await response.json(), { _id: 'package-1', ...input })
  })
})

test('POST /api/bookings rejects references to packages that do not exist', async () => {
  let bookingCreated = false
  const app = createApp({
    TravelPackageModel: {
      async exists() {
        return null
      },
    },
    BookingModel: {
      async create() {
        bookingCreated = true
      },
    },
  })

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ package: 'missing-package' }),
    })

    assert.equal(response.status, 404)
    assert.deepEqual(await response.json(), { error: 'Travel package not found' })
    assert.equal(bookingCreated, false)
  })
})

test('POST /api/bookings writes a booking after confirming the package exists', async () => {
  const input = { package: 'package-1', travelerName: 'Asha Rao' }
  let checkedPackageId
  let createdBooking
  const app = createApp({
    TravelPackageModel: {
      async exists(query) {
        checkedPackageId = query._id
        return { _id: query._id }
      },
    },
    BookingModel: {
      async create(document) {
        createdBooking = document
        return { _id: 'booking-1', ...document }
      },
    },
  })

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
    })

    assert.equal(response.status, 201)
    assert.deepEqual(await response.json(), { _id: 'booking-1', ...input })
    assert.equal(checkedPackageId, input.package)
    assert.deepEqual(createdBooking, input)
  })
})

test('Mongoose validation failures are returned as client errors', async () => {
  const app = createApp({
    TravelPackageModel: {
      async create() {
        const error = new Error('Package name is required')
        error.name = 'ValidationError'
        throw error
      },
    },
  })

  await withServer(app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/packages`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })

    assert.equal(response.status, 400)
    assert.deepEqual(await response.json(), { error: 'Package name is required' })
  })
})
