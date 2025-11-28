import { initApolloServer } from "../src/servers/ApolloServer.js";
import { initYogaServer } from "../src/servers/GraphQL-Yoga.js";
import { setupLandingPage } from "../src/servers/LandingPage.js";
import { getExpressApp } from "../src/servers/Express.js";

// Global state for Vercel serverless
declare global {
  var appInitialized: boolean;
  var app: any;
}

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  console.log("🚀 Request received:", req.method, req.url);
  
  try {
    // Initialize servers only once
    if (!globalThis.appInitialized) {
      console.info("✨ Initializing F1 GraphQL Servers for Vercel...");
      
      setupLandingPage();
      await initApolloServer();
      initYogaServer();
      
      // Get the Express app
      const { app } = getExpressApp();
      globalThis.app = app;
      globalThis.appInitialized = true;
      
      console.info("🚀 F1 GraphQL Servers ready on Vercel");
    }
    
    // Handle the request with Express app
    globalThis.app(req, res);
  } catch (error) {
    console.error("Server initialization error:", error);
    res.status(500).send("Internal Server Error: " + (error instanceof Error ? error.message : 'Unknown error'));
  }
}