/**
|--------------------------------------------------
| BENCHMARKING:
|
| command: `ab -c 50 -n 500 localhost:3000/fast`
|
| - ab = apache benchmark
| -n 500 = Make a total of 500 request
| -c 50 =  Make sure there are always 50 requests pending (concurrency)
|--------------------------------------------------
*/
// set every child in cluster to only have one thread available
process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');
// Is the file being executed in master mode
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but
    // in child mode.
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {
    // I'm a child, I'm going to act like a server 
    // and do nothing else.
    const 
        express = require('express'),
        crypto = require('crypto'),
        app = express();

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => res.send('Hi there'))
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!')
    });

    app.listen(3000);
};
