import { printSchema } from "graphql"
import * as fs from "node:fs"
import * as path from "node:path"
import { schema } from "../resolvers/resolvers"

/**
 * Generates and writes GraphQL schema to file
 */
fs.writeFileSync(path.join(__dirname, "schema.graphql"), printSchema(schema))
