/**
|--------------------------------------------------
| Task 1.
|
| Script to fix files in a directory.
| Each file has it's data duplicated.
| Truncate each file in half.
|--------------------------------------------------
*/

const
    fs = require('fs'),
    path = require('path'),
    dirname = path.join(__dirname, 'files');

// Read the list of files. Okay to use Sync method here since
// script is singular in purpose.
const files = fs.readdirSync(dirname);

files.forEach(file => {
    // Use path.join to make code platform agnostic.
    const filePath = path.join(dirname, file);
    // 'stat' method gives meta info about the file.
    fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        fs.truncate(filePath, (stats.size/2), (err) => {
            if (err) throw err;
        });
    });
});