import cors from 'cors'
import express from 'express'
import Booking from './models/Booking.js'
import TravelPackage from './models/TravelPackage.js'

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next)
}

export function createApp({
  TravelPackageModel = TravelPackage,
  BookingModel = Booking,
  clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173',
} = {}) {
  const app = express()

  app.use(cors({ origin: clientOrigin }))
  app.use(express.json({ limit: '100kb' }))

  app.get(
    '/api/health',
    asyncHandler(async (_req, res) => {
      res.json({ status: 'ok', database: 'connected' })
    }),
  )

  app.get(
    '/api/overview',
    asyncHandler(async (_req, res) => {
      const [overview] = await TravelPackageModel.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$revenue' },
            totalBookings: { $sum: '$bookings' },
            avgSatisfaction: { $avg: '$satisfaction' },
            conversionRate: { $avg: '$conversion' },
            packageCount: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            totalBookings: 1,
            avgSatisfaction: { $round: ['$avgSatisfaction', 2] },
            conversionRate: { $round: ['$conversionRate', 1] },
            packageCount: 1,
          },
        },
      ])

      res.json(
        overview || {
          totalRevenue: 0,
          totalBookings: 0,
          avgSatisfaction: 0,
          conversionRate: 0,
          packageCount: 0,
        },
      )
    }),
  )

  app.get(
    '/api/packages',
    asyncHandler(async (_req, res) => {
      const packages = await TravelPackageModel.find().sort({ createdAt: -1 }).lean()
      res.json(packages)
    }),
  )

  app.get(
    '/api/packages/:id',
    asyncHandler(async (req, res) => {
      const travelPackage = await TravelPackageModel.findById(req.params.id).lean()
      if (!travelPackage) {
        return res.status(404).json({ error: 'Travel package not found' })
      }

      res.json(travelPackage)
    }),
  )

  app.post(
    '/api/packages',
    asyncHandler(async (req, res) => {
      const travelPackage = await TravelPackageModel.create(req.body)
      res.status(201).json(travelPackage)
    }),
  )

  app.get(
    '/api/bookings',
    asyncHandler(async (_req, res) => {
      const bookings = await BookingModel.find()
        .populate('package')
        .sort({ createdAt: -1 })
        .lean()
      res.json(bookings)
    }),
  )

  app.get(
    '/api/bookings/:id',
    asyncHandler(async (req, res) => {
      const booking = await BookingModel.findById(req.params.id).populate('package').lean()
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' })
      }

      res.json(booking)
    }),
  )

  app.post(
    '/api/bookings',
    asyncHandler(async (req, res) => {
      const travelPackage = await TravelPackageModel.exists({ _id: req.body.package })
      if (!travelPackage) {
        return res.status(404).json({ error: 'Travel package not found' })
      }

      const booking = await BookingModel.create(req.body)
      res.status(201).json(booking)
    }),
  )

  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' })
  })

  app.use((error, _req, res, _next) => {
    if (
      error.name === 'ValidationError' ||
      error.name === 'CastError' ||
      error.type === 'entity.parse.failed'
    ) {
      return res.status(400).json({ error: error.message })
    }

    if (error.code === 11000) {
      return res.status(409).json({ error: 'A record with these unique values already exists' })
    }

    console.error('API request failed:', error)
    return res.status(500).json({ error: 'Internal server error' })
  })

  return app
}
