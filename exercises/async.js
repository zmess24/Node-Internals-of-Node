/**
|--------------------------------------------------
| Question: What order will this code execute in?
|--------------------------------------------------
*/


const 
    https = require('https'),
    start = Date.now();

function doRequest() {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log(Date.now() - start);
        });
    }).end();
};

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();

/**
|--------------------------------------------------
| Explanation:
|--------------------------------------------------
*/

// LIBUV delegates http module to the underlying OS. LIBUV delegates the work
// and listens for the response. This means these calls do not touch the event 
// loop at all.