const 
    express = require('express'),
    Worker = require('webworker-threads').Worker,
    app = express();

app.get('/', (req, res) => {
    // Creates worker interface.
    const worker = new Worker(function() {
        this.onmessage = function() {
            let counter = 0;
            // '1e9' is equivilent to to 10^9
            while(counter < 1e9) {
                counter++;
            };

            postMessage(counter);
        }
    });

    worker.onmessage = function({ data }) {
        console.log(data);
        res.send(`${data}`)
    };

    // 
    worker.postMessage();
});

app.get('/fast', (req, res) => {
    res.send('This was fast!')
});

app.listen(3000);