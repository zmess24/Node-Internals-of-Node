const
    fs = require('fs'),
    path = require('path'),
    dirname = path.join(__dirname, 'files');

// Create destination directory to work with.
fs.mkdirSync(dirname);
const ms1Day = 24*60*60*1000;

for (let i =0; i < 10; i++) {
    // Create filePath
    const filePath = path.join(dirname, `file${i}`);
    // 
    fs.writeFile(filePath, i, err => {
        if (err) throw err;

        const time = (Date.now() - i*ms1Day)/1000;  
        // utimes method changes timestamp.
        // 2nd arguement: accesstime.
        // 3rd argument: modified time.
        fs.utimes(filePath, time, time, err => {
            if (err) throw err;
        });
    });
};