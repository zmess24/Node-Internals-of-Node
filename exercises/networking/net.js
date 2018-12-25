/**
|--------------------------------------------------
| ***** TERMINAL CHAT APP *****
| 
| To start:
| 1. Open terminal window: 'node net.js'
| 2. In a seperate terminal window: 'nc localhost 8000'
|--------------------------------------------------
*/

// Clears command line.
process.stdout.write('\u001B[2J\u001B[0;0f');

const server = require('net').createServer();
let counter = 0;
let sockets = {};

function timestamp() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`
}
// Whenever a client connects.
server.on('connection', socket => {
    // Assing socket an id.
    socket.id = counter++;

    console.log('Client connection');
    socket.write('Please type your name: ');

    socket.on('data', data => {
        if (!sockets[socket.id]) {
            // Converts input to string and removes white space on either side.
            socket.name = data.toString().trim();
            socket.write(`Welcome ${socket.name}!\n`)
            // Store connection inside the sockets object.
            sockets[socket.id] = socket;
            return;
        }
        // Object entries returns an array of an objcets key/value pairs
        Object.entries(sockets).forEach(([key, cs]) => {
            if (socket.id == key) return;
            cs.write(`${socket.name} ${timestamp()}: ${data}`);
        })
    });

    // Whenever a client disconnects.
    socket.on('end', () => {
        // delete the socket from sockets object;
        delete sockets[socket.id];
        console.log('Client disconnected.')
    })

    // Assumes a utf8 encoding (string) from anything
    // recieved from the socket.
    // socket.setEncoding('utf8');
});

server.listen(8000, () => console.log('Server bound'));