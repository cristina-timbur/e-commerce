const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');

const schema = require('./graphql');

const app = express();
app.use(express.json());

const db = require('./graphql/db')

const checkAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  const userId = authorization.split(':')[1];

  const user = db.users.find((user) => user.id === userId);

  req.auth = {
    user,
  }

  next();
}

app.all('/graphql', checkAuthorization, createHandler({ schema }))

async function start(port) {
  return new Promise((resolve) => app.listen({ port }, resolve));
}

module.exports = {
  start,
};

app.start(3001).then(() => {
    console.log("Running");
});

module.exports = app;