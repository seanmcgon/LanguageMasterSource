const express = require('express');
const { createServer } = require('http');
const { initSocket } = require('./modules/socketManager');
var cors = require('cors')

const app = express();
//create a new Express application

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  request(
    { url: 'https://languagemastersource-server.onrender.com' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const server = createServer(app);
//app is passed to createServer which creates an HTTP server that uses the Express app to handle requests

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//socketManager handles all of our communications with the clients
//enables real-time, bi-directional communication between server and clients
initSocket(server);