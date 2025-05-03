import express from 'express'
import { createServer } from 'node:http'
import path from 'path'

// Create Express App
const app = express()

// Use express to serve static files
app.use('/assets', express.static(path.join(__dirname, '../../assets')))
app.use('/public', express.static(path.join(__dirname, '../../public')))

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
