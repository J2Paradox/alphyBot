const express = require('express');
const path = require('path');
const app = express();
const config = require('./configs/config.json');
const bodyParser = require('body-parser')

// SERVER
module.exports = {
    init: function () {
        console.log("SERVER TEST")
    },
    server: function () {
        // serverSettings
        var serverPort = 1337;

        // SERVER ROUTES

        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.static(__dirname + '/public'));

        app.get('/', (req, res) => res.render('index'));

        app.listen(serverPort, function () {
          console.log("alphyBot website avaible on port " + serverPort + "!");
        });
        // app.express.use(bodyParser.json());
        // app.express.use(bodyParser.urlencoded({ extended: false }));
    }
}
