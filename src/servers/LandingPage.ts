import rateLimit, { ipKeyGenerator } from 'express-rate-limit'
import { getExpressApp } from './Express.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Auto-sets up landing page with zero manual path configuration
 */
export function setupLandingPage() {
  const { app } = getExpressApp()

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many attempts, try again later.',
    keyGenerator: (req) => {
      // Use API key or other identifier if available
      if (req.headers['authorization']) {
        return req.headers['authorization'] as string
      }
      
      // Use the helper function to properly handle IPv6
      const forwarded = req.headers['x-forwarded-for'] as string
      let ip = req.ip || '127.0.0.1'
      
      if (forwarded) {
        ip = forwarded.split(',')[0].trim()
      }
      
      return ipKeyGenerator(ip)
    }
  })

  // Serve landing page from file
  app.get('/', limiter, (_, res) => {
    const filePath = path.join(__dirname, '../../public/index.html')

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
