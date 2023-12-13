const express = require('express');
const db = require("./models/index")

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

async function start(port) {
  return new Promise((resolve) => app.listen({ port }, resolve));
}

module.exports = {
  start
};