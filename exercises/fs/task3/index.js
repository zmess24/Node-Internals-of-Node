/**
|--------------------------------------------------
| Task 3:
|
| Watch a directory and report 3 events.
| File was added, removed, changed.
|--------------------------------------------------
*/

const
    fs = require('fs'),
    path = require('path'),
    dirname = path.join(__dirname, 'files'),
    currentFiles = fs.readdirSync(dirname);

const logWithTime = message => {
    console.log(`${new Date().toUTCString()}: ${message}`);
};

fs.watch(dirname, (eventType, filename) => {
    if (eventType === 'rename') {
        const index = currentFiles.indexOf(filename);
        if (index >= 0) {
            currentFiles.splice(index, 1);
            logWithTime(`${filename} was removed`);
            return;
        };

        currentFiles.push(filename);
        logWithTime(`${filename} was added`);
        return;
    }

    logWithTime(`${filename} was changed`);
});