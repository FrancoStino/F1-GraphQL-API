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

  // Serve landing page directly as HTML
  app.get('/', limiter, (_, res) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>F1 GraphQL API | Access Formula 1 Data via GraphQL</title>
  <meta name="description" content="Access real-time and historical Formula 1 data using the F1 GraphQL API with support for GraphQL Yoga and Apollo Server." />
  <link rel="icon" href="/assets/images/f1-graphql-logo.svg" />
  <link rel="stylesheet" href="/assets/css/landing.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
</head>
<body>
  <div class="header">
    <img src="/assets/images/f1-graphql-logo.svg" alt="F1 GraphQL Logo" class="logo">
    <h1>F1 GraphQL API</h1>
    <p class="subtitle">Historical and real-time Formula 1 data accessible via GraphQL</p>
  </div>

  <div class="container">
    <div class="card">
      <img src="/assets/images/graphql-yoga-logo.svg" alt="GraphQL Yoga Logo" class="card-logo" />
      <h2>GraphQL Yoga</h2>
      <p>Integrated GraphiQL interface to execute and test your GraphQL queries in real time.</p>
      <a href="/graphql" class="btn">Open GraphQL Yoga</a>
    </div>

    <div class="card">
      <img src="/assets/images/apollo-logo.svg" alt="Apollo Logo" class="card-logo" />
      <h2>Apollo Server</h2>
      <p>Apollo Sandbox interface with introspection and advanced developer tools.</p>
      <a href="/apollo" class="btn">Open Apollo</a>
    </div>
  </div>

  <div class="social-icons">
    <a href="https://github.com/FrancoStino/F1-GraphQL" target="_blank" aria-label="GitHub">
      <i class="fa-brands fa-github"></i></a>
    <a href="https://www.linkedin.com/in/davide-ladisa/" target="_blank" aria-label="LinkedIn">
      <i class="fab fa-linkedin fa-lg"></i>
    </a>
  </div>

  <footer>
    <span id="year"></span> - F1 GraphQL API. Created by <a href="https://davideladisa.it" target="_blank">Davide Ladisa</a>.
  </footer>

  <script>
    document.getElementById('year').textContent = new Date().getFullYear();
  </script>
</body>
</html>`

    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })

  console.info(`🏠 Landing page setup at: /`)
}
