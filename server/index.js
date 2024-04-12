const express = require('express');
const { createServer } = require('http');
const { initSocket } = require('./modules/socketManager');
var cors = require('cors')

const app = express();
//create a new Express application

app.use(cors())

const server = createServer(app);
//app is passed to createServer which creates an HTTP server that uses the Express app to handle requests

const port = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//socketManager handles all of our communications with the clients
//enables real-time, bi-directional communication between server and clients
initSocket(server);