import { PrismaWeaver } from '@gqloom/prisma';
import { GraphQLDate } from 'graphql-scalars';

export const prismaWeaverConfig = PrismaWeaver.config({
  presetGraphQLType: (type) => {
    if (type === 'DateTime') {
      return GraphQLDate;
    }
  },
})
