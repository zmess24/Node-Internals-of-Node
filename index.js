const 
    express = require('express'),
    app = express();

app.get('/', (req, res) => {
    res.send('Hi there');
});

app.listen(3000);