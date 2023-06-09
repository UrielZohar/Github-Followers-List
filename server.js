const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/build'));

app.listen(process.env.PORT || 8080);

// PathLocationStrategy

app.get('*', function (req, res) {
    res.status(200).sendFile(path.join(__dirname , 'build', 'index.html'));
});

console.log('Console listening to ' + (process.env.PORT || 8080));