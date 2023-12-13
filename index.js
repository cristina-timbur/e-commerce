const app = require('./app');

app.start(3000).then(() => {
    console.log("Server is running on http://localhost:3000");
});

module.exports = app;