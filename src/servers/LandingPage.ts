import fs from 'fs'
import path from 'path'
import { getExpressApp } from './Express'

/**
 * Inizializza la landing page principale
 */
export function setupLandingPage() {
  const { app } = getExpressApp()

  // Rotta per la landing page
  app.get('/', (req, res) => {
    const filePath = path.join('public/index.html')

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Errore nella lettura di index.html:', err)
        return res.status(500).send('Errore nel caricamento della pagina')
      }

      // Sostituzione dinamica dell'anno
      const html = data.replace('<!--YEAR-->', new Date().getFullYear().toString())

      res.setHeader('Content-Type', 'text/html')
      res.send(html)
    })
  })

  console.info(`🏠 Landing page setup at: /`)
}
