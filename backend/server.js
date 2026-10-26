import mongoose from 'mongoose'
import { createApp } from './app.js'

const port = Number(process.env.PORT || 5000)
const mongoUri = process.env.MONGODB_URI

async function startServer() {
  if (!mongoUri) {
    throw new Error('MONGODB_URI must be set before starting the API')
  }

  await mongoose.connect(mongoUri)
  const app = createApp()
  const server = app.listen(port, () => {
    console.log(`Travel analytics API listening on http://localhost:${port}`)
  })

  const closeServer = async () => {
    server.close()
    await mongoose.disconnect()
  }

  process.once('SIGINT', closeServer)
  process.once('SIGTERM', closeServer)
}

startServer().catch((error) => {
  console.error('Unable to start Travel Analytics API:', error)
  process.exitCode = 1
})
