import { PrismaWeaver } from '@gqloom/prisma';
import { GraphQLDate } from 'graphql-scalars';

// /**
//  * Custom GraphQL scalar type for handling dates in DD-MM-YYYY format
//  */
// const GraphQLDateCustom = new GraphQLScalarType({
//   name: 'Date',
//   description: 'Date custom scalar type in DD-MM-YYYY format',

//   serialize: value => value instanceof Date
//     ? `${String(value.getDate()).padStart(2, '0')}-${String(value.getMonth() + 1).padStart(2, '0')}-${value.getFullYear()}`
//     : null,

//   parseValue: value => {
//     if (typeof value === 'string') {
//       const [day, month, year] = value.split('-').reverse().map(Number);
//       return new Date(year, month - 1, day);
//     }
//     return null;
//   },

//   parseLiteral: ast => {
//     if (ast.kind === Kind.STRING) {
//       const [day, month, year] = ast.value.split('-').reverse().map(Number);
//       return new Date(year, month - 1, day);
//     }
//     return null;
//   }
// });

// export const prismaWeaverConfig = PrismaWeaver.config({
//   presetGraphQLType: type => type === 'DateTime' ? GraphQLDateCustom : undefined
// });


export const prismaWeaverConfig = PrismaWeaver.config({
  presetGraphQLType: (type) => {
    switch (type) {
      case 'DateTime':
        return GraphQLDate;
    }
  },
})
