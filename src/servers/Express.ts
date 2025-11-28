import express from 'express'
import { createServer } from 'node:http'

// Auto-create Express app
const app = express()

// Auto-disable headers
app.disable('x-powered-by')

// Auto-serve static files (Express handles paths automatically)
app.use('/assets', express.static('assets'))
app.use('/public', express.static('public'))

// Create HTTP server
const server = createServer(app)

// Function that returns the Express app and server
export function getExpressApp() {
  return { app, server }
}

// Function to start the server
export function startServer(port: number) {
  server.listen(port, () => {
    console.info(`🚀 Server running on http://localhost:${port}`)
  })

  return server
}
