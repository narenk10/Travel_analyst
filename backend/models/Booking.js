import mongoose from 'mongoose'

const { Schema } = mongoose

const bookingSchema = new Schema(
  {
    package: {
      type: Schema.Types.ObjectId,
      ref: 'TravelPackage',
      required: true,
      index: true,
    },
    travelerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    travelerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    travelStartDate: {
      type: Date,
      required: true,
    },
    travelEndDate: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          return !this.travelStartDate || value >= this.travelStartDate
        },
        message: 'Travel end date must be on or after the start date',
      },
    },
    travelers: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
      required: true,
    },
  },
  { timestamps: true },
)

bookingSchema.index({ status: 1, travelStartDate: 1 })

const Booking =
  mongoose.models.Booking || mongoose.model('Booking', bookingSchema)

export default Booking
