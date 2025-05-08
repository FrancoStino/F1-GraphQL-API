import rateLimit from 'express-rate-limit'
import fs from 'fs'
import path from 'path'
import { getExpressApp } from './Express'

/**
 * Initializes the main landing page
 */
export function setupLandingPage() {
  const { app } = getExpressApp()

  // Rate limiting configuration
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit of 100 requests per window
    message: 'Too many attempts, try again later.'
  })

  // Route for the landing page with rate limiting
  app.get('/', limiter, (req, res) => {
    const filePath = path.join('public/index.html')

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading index.html:', err)
        return res.status(500).send('Error loading the page')
      }

      // Dynamic year replacement
      const html = data.replace('<!--YEAR-->', new Date().getFullYear().toString())

      res.setHeader('Content-Type', 'text/html')
      res.send(html)
    })
  })

  console.info(`🏠 Landing page setup at: /`)
}
