const express = require("express");

const accountsRouter = require("./accounts/accounts-router");

const server = express();

// Suppress console errors during testing
if (process.env.NODE_ENV === 'testing') {
  const originalConsoleError = console.error; //eslint-disable-line
  console.error = () => {}; // Suppress console.error during tests
}

server.use(express.json());

server.use("/api/accounts", accountsRouter)

server.use("*", (req, res) => {
    res.status(404).json({
        message: 'not found',
    })
})

module.exports = server;
