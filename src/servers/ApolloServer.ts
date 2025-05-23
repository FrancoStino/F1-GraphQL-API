import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import express from 'express';
import { schema } from '../resolvers/resolvers';
import { getExpressApp } from './Express';

// Config ApolloServer
const serverApollo = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({
      embed: true,
      includeCookies: true,
    }),
    ApolloServerPluginCacheControl({
      defaultMaxAge: 5,
    }),
  ],
});

// Initialize Apollo Server
export async function initApolloServer() {
  await serverApollo.start();

  // Get Express app
  const { app } = getExpressApp();

  // Apply Apollo middleware at /apollo path
  app.use(
    '/apollo',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(serverApollo, {
      context: ({ req }) => Promise.resolve({ req }),
    }),
  );

  console.info(`🚀 Apollo Server ready at: /apollo`);
}
