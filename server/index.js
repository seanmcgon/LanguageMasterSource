const express = require('express');
const { createServer } = require('http');
const { initSocket } = require('./modules/socketManager');

const app = express();
const server = createServer(app);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

initSocket(server);