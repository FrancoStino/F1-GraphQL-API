import 'dotenv/config'
import { PrismaClient } from "../../prisma/generated/client/client.js"
import { PrismaPg } from '@prisma/adapter-pg'

// Parse DATABASE_URL to extract connection details
const databaseUrl = process.env.DATABASE_URL ?? 'mysql://root@127.0.0.1:3307/database'

const adapter = new PrismaPg(databaseUrl)

const db = new PrismaClient({ adapter });

export default db

