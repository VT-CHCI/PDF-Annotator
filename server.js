'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname));

var port = 3456;
http.listen(port, function() {
    console.log('listening on *:', port);
  });
