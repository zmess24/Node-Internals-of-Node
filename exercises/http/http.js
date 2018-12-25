const 
    fs = require('fs'),
    server = require('http').createServer(),
    data = {};

server.on('request', (req, res) => {
    switch (req.url) {
        case '/api':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(`${JSON.stringify(data)}\n`);
            break;
        case '/home':
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(fs.readFileSync(`.${req.url}.html`))
            break;
        case '/':
            res.writeHead(301, { 'Location': '/home' });
            res.end();
            break;
        default:
        res.writeHead(404);
        res.end();

    }
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Hello World\n');
});
server.listen(8000);