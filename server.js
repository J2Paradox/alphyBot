const express = require('express');
const path = require('path');
const app = express();
const config = require('./configs/config.json');

// CONSOLE LOG VARIABLES
var dateData = String(new Date());
var dateSplit = dateData.split(" ")
var datePrint = dateSplit[1] + " " + dateSplit[2] + " " +
    dateSplit[3] + " " + dateSplit[4]
var dateL = "[" + datePrint + "] "
var errorL = " [ ERROR ] "
var infoL = " [ INFO ] "

// SERVER
module.exports = {
    init: function () {
        console.log(dateL + infoL + "SERVER TEST")
    },
    server: function () {
        // serverSettings
        var serverPort = 1337;

        // SERVER ROUTES
        app.use(require('body-parser').urlencoded({extended: true}));

        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.static(__dirname + '/public'));

        app.get('/', function(req, res){
            res.render('index');
        });

        app.post('/settings', function (req, res) {
            console.log(dateL + infoL + "DATA FROM " + req.query.form);
            console.log(dateL + infoL + "USER: " + req.body.alphName)
            console.log(dateL + infoL + "PASS :" + req.body.alphPW)
            // res.redirect(303, 'settings')
            if (req.body.alphPW == config.alphyServerMaster){
                res.render('settings')
                console.log(dateL + infoL + "GRANTED ACCESS")
            } else {
                res.render('wrongpass')
                console.log(dateL + errorL + "DENIED WRONG ACCESS")
            };
        });

        app.use(function (req, res) {
            res.type('text/html');
            res.status(404);
            res.render('404');
        });

        app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.status(500);
            res.send("SERVER ERROR");
        });

        app.listen(serverPort, function () {
          console.log(dateL + infoL + "alphyBot website avaible on port " + serverPort + "!");
        });
        // app.express.use(bodyParser.json());
        // app.express.use(bodyParser.urlencoded({ extended: false }));
    }
}
