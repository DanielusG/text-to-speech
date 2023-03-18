var express = require('express');
var path = require('path');
var app = express();
const torch = require("torch-js");
app.use(express.static(__dirname + 'client'));
app.get('/textToSpeech.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/textToSpeech.js'));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
}
);
app.querySelector("#pause").addEventListener("click", () => {
    console.log("pause");
});