import { weave } from "@gqloom/core";
import { PrismaResolverFactory } from "@gqloom/prisma";
import * as Resolvers from "../../prisma/generated/gqloom";
import db from "../providers/prismaClient";
import { prismaWeaverConfig } from "../utils/PrismaWeaver.config";

// Usa queriesResolver di PrismaResolverFactory per esporre solo le query resolver per ogni modello
export const schema = weave(
  ...Object.values(Resolvers).map(model =>
    new PrismaResolverFactory(model, db).queriesResolver()
  ),
  prismaWeaverConfig
);
