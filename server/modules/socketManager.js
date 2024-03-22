const { Server } = require("socket.io");
const { verifyStudentData } = require("./auth");

function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3001"],  
        },
    });

    let numConnected = 0;

    io.on('connection', socket => {
        console.log("numClients connected", ++numConnected);
        console.log(`Client connected: ${socket.id}`);

        verifyStudentData(socket);

        socket.on('disconnect', () => {
            console.log("numClients connected", --numConnected);
        });
    });
}

function disconnectAllClients(io) {
    io.of("/").sockets.forEach(socket => {
        socket.disconnect(true);
    });
}

module.exports = { initSocket, disconnectAllClients };