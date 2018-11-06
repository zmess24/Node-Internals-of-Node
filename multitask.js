const 
    https = require('https'),
    crypto = require('crypto'),
    fs = require('fs'),
    start = Date.now();

function doRequest() {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log("ASYNC:", Date.now() - start);
        });
    }).end();
};

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('HASH:', Date.now() - start);
    });
};

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();


/**
|--------------------------------------------------
| Explanation:
|--------------------------------------------------
*/

