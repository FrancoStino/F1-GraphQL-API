import { Resolver, weave } from "@gqloom/core";
import { PrismaResolverFactory } from "@gqloom/prisma";
import * as Resolvers from "../../prisma/generated/gqloom";
import db from "../providers/prismaClient";
import { prismaWeaverConfig } from "../utils/PrismaWeaver.config";

/**
 * Extract only query operations from a resolver
 * This function filters out mutation operations from the resolver
 */
function extractQuery(resolver: Resolver): Resolver {
  const meta: Resolver["~meta"] = { ...resolver["~meta"], fields: {} };

  for (const [fieldName, field] of Object.entries(resolver["~meta"].fields)) {
    if (typeof field === "object" && field["~meta"].operation !== "mutation") {
      meta.fields[fieldName] = field;
    }
  }

  return { "~meta": meta };
}

// Create resolvers for each model directly in the weave method
// Apply extractQuery to filter out mutations immediately
export const schema = weave(
  ...Object.values(Resolvers).map(model =>
    extractQuery(new PrismaResolverFactory(model, db).resolver())
  ),
  prismaWeaverConfig
);
