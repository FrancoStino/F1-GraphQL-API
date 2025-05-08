import express from 'express'
import helmet from 'helmet'
import { createServer } from 'node:http'
import path from 'path'

// Create Express App
const app = express()

// Apply Helmet middleware with customized CSP for GraphQL and UI resources
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "/api/placeholder/"],
        connectSrc: ["'self'", "ws:", "wss:"],
        fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "data:"],
        objectSrc: ["'none'"],
        frameSrc: ["'self'"],
      },
    },
    // Permettere l'uso di iframe per GraphiQL e altri strumenti
    frameguard: {
      action: 'sameorigin'
    },
    // Altre configurazioni che potrebbero essere necessarie
    crossOriginEmbedderPolicy: false
  })
)

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
