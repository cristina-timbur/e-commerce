const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require("./graphql");
const authorizationMiddleware = require('./middlewares/authorization');

const app = express();
app.use(express.json());


app.all('/graphql', authorizationMiddleware, createHandler({
  schema,
  context: (req) => {
    return { user: req.raw.user };
  },
}))

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

async function start(port) {
  return new Promise((resolve) => app.listen({ port }, resolve));
}

module.exports = {
  start
};