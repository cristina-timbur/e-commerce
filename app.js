const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

async function start(port) {
  return new Promise((resolve) => app.listen({ port }, resolve));
}

module.exports = {
  start
};