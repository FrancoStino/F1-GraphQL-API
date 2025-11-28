import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
    // Optionally support shadow DB if present:
    // shadowDatabaseUrl: env('SHADOW_DATABASE_URL'),
  },
})
