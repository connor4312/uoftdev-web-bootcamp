var express = require('express'),
    parser  = require('body-parser'),
    app     = express();

app.use(express.static(__dirname + '/../../static'));
app.use(parser.json());

app.get('/',       require('./../routes/index'));
app.get('/search', require('./../routes/search'));

app.get('/favorites',    require('./../routes/favorite/all'));
app.post('/favorites',   require('./../routes/favorite/add'));
app.delete('/favorites', require('./../routes/favorite/remove'));

module.exports = app;
