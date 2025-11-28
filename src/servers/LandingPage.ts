import rateLimit from 'express-rate-limit'
import { getExpressApp } from './Express'

/**
 * Auto-sets up landing page with zero manual path configuration
 */
export function setupLandingPage() {
  const { app } = getExpressApp()

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many attempts, try again later.'
  })

  // Auto-serve landing page (Express handles path resolution)
  app.get('/', limiter, (_, res) => {
    res.sendFile('public/index.html', { root: '.' })
  })

  console.info(`🏠 Landing page setup at: /`)
}
