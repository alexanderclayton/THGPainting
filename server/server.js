import jwt from 'jsonwebtoken';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { authMiddleware } from './utils/authMiddleware.js';
import { clientMiddleware } from './utils/clientMiddleware.js';


import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js'
import db from './config/connection.js';

const __dirname = path.resolve();
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { authMiddleware, clientMiddleware, }
});

console.log( "dirname:", __dirname);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// use for production
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
// };

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
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

