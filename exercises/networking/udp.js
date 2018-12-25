const 
    dgram = require('dgram'),
    server = dgram.createSocket('udp4'),
    PORT = 3333,
    HOST = '127.0.0.1';

/**
|--------------------------------------------------
| SERVER
|--------------------------------------------------
*/
server.on('listening', () => console.log('UDP Server listening.'));

server.on('message', (msg, rinfo) => {
    console.log(`${rinfo.address}:${rinfo.port} - ${msg}`)
})
server.bind(PORT, HOST);

/**
|--------------------------------------------------
| CLIENT
|--------------------------------------------------
*/

const client = dgram.createSocket('udp4');
const msg = Buffer.from('Pluralsight rocks');
client.send(msg, 0, msg.length, PORT, HOST, err => {
  if (err) throw err;

  console.log('UDP message sent.');
  client.close();
})