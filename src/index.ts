// Import server initializers
import { initApolloServer } from "./servers/ApolloServer";
import { startServer } from "./servers/Express";
import { initYogaServer } from "./servers/GraphQL-Yoga";
import { setupLandingPage } from "./servers/LandingPage";

// Port to use (from env or default to 4000)
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

async function startApp() {
  console.info("✨ Starting F1 GraphQL Servers...");

  // Setup landing page prima degli altri server
  setupLandingPage();

  // Initialize both GraphQL servers
  await initApolloServer();
  initYogaServer();

  // Start the unified HTTP server
  startServer(PORT);
}

// Start the application
startApp().catch(err => {
  console.error("Failed to start servers:", err);
  process.exit(1);
});
