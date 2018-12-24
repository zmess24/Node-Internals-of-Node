/**
|--------------------------------------------------
| Question: What order will this code execute in?
|--------------------------------------------------
*/

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

fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS:', Date.now() - start);
});

doRequest();
doHash();
doHash();
doHash();
doHash();


/**
|--------------------------------------------------
| Explanation:
|--------------------------------------------------
*/

// 1. HTTP Module doesn't involve the threadpool, makes use of underlying OS.
// 2. Thread #1 starts working on FS call (reach out to HD).
// 3. FS call pops off thread #1 while awaiting data, starts working on Hash #4.
// 4. Thread #2 finishes up, repicks up FS Module.
// 5. Thread #2 finishes FS call, threads #1,#3,#4 resolve hash calls.