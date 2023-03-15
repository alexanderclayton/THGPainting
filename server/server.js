import jwt from 'jsonwebtoken';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { authMiddleware } from './utils/auth.js';


import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js'
import db from './config/connection.js';


const PORT = process.env.PORT || 9000;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`)
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

startApolloServer();

