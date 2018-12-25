const fs = require('fs');

// Async Form:
fs.readFile(__filename, (err, data) => {
    if (err) throw err;

    // do something with the data.
})

// Synchronous Form:
const data = fs.readFileSync(__filename);
// exceptions are immediately thrown;
// do something with the data;