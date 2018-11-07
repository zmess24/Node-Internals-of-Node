/**
|--------------------------------------------------
| BENCHMARKING:
|
| `ab -c 50 -n 500 localhost:3000/fast`
| - ab = apache benchmark
| -n 500 = Make a total of 500 request
| -c 50 =  Make sure there are always 50 requests pending (concurrency)
|--------------------------------------------------
*/

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
        app = express();

    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {}
    }
    app.get('/', (req, res) => {
        doWork(5000); // Handled by the event loop
        res.send('Hi there');
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast!')
    });

    app.listen(3000);
};
