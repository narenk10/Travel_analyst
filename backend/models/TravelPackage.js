import mongoose from 'mongoose'

const { Schema } = mongoose

const travelPackageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    region: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    occupancy: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    satisfaction: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    bookings: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isInteger,
    },
    revenue: {
      type: Number,
      required: true,
      min: 0,
    },
    conversion: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    nps: {
      type: Number,
      required: true,
      min: -100,
      max: 100,
    },
    profitability: {
      type: Number,
      required: true,
      min: -100,
      max: 100,
    },
    risk: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'],
    },
    trend: {
      type: String,
      required: true,
      enum: ['Rising', 'Stable', 'Declining'],
    },
  },
  { timestamps: true },
)

travelPackageSchema.index({ region: 1, category: 1 })

const TravelPackage =
  mongoose.models.TravelPackage ||
  mongoose.model('TravelPackage', travelPackageSchema)

export default TravelPackage
