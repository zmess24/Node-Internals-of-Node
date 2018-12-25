const 
    EventEmitter = require('events'),
    readLine = require('readline');

// Creates an instance of the readline interface.
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new EventEmitter();
const server = require('./server')(client);
server.on('response', resp => {
    // Clears terminal to to the top
    process.stdout.write('\u001B[2J\u001B[0;0f');
    // Writes the response.
    process.stdout.write(resp);
    // Creates a new line to await an input
    process.stdout.write(`\n\>`);
});

let command, args;

rl.on('line', (input) => {
    [command, ...args] = input.split(' ');
    client.emit('command', command, args)
});