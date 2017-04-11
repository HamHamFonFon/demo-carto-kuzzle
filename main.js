// Express
var express = require('express');
var app = express();

function enableCors (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Expose-Headers', 'Content-Disposition')
    next()
}

function optionsHandler (methods) {
    return function (req, res, next) {
        res.header('Allow', methods)
        res.send(methods)
    }
}

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:7511");
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3330);