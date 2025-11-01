import {renderGraphiQL} from "@graphql-yoga/render-graphiql"
import {createYoga} from "graphql-yoga"
import {schema} from "../resolvers/resolvers"
import {getExpressApp} from './Express'

// Function to customize GraphiQL rendering
function customRenderGraphiQL() {
    const html = renderGraphiQL({
        title: 'F1 GraphQL API'
    });
    // Modify CSS and add custom logo
    return html.replace(
        '</head>',
        `
    <link rel="stylesheet" href="/assets/css/graphql-yoga.css" />
    <link rel="icon" href="/assets/images/f1-graphql-logo.svg" />
    </head>
    `
    );
}

// Create yoga server with specific path
const yoga = createYoga({
    schema,
    graphqlEndpoint: '/graphql', // Specifica l'endpoint
    renderGraphiQL: () => customRenderGraphiQL(),
    landingPage: false // Disabilitiamo la landing page di Yoga
})

// Initialize Yoga Server
export function initYogaServer() {
    const {app} = getExpressApp();

    // Mount yoga only at /graphql path
    app.use('/graphql', yoga);

    console.info(`🚀 GraphQL Yoga Server ready at: /graphql`);
}
