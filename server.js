// IMPORTS
const express = require('express');
const path = require('path');
const app = express();
var config = require('./configs/config.json');
const tmi = require('tmi.js');
const io = require('socket.io')();

// const clrBot = require('');

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
    server: function (twitchOptions) {
        // SERVER SETTINGS
        var serverPort = 1337;
        app.use(require('body-parser').urlencoded({extended: true}));
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.static(__dirname + '/public'));

        // CLR
        var client = new tmi.client(twitchOptions);
        client.connect();

        // CHAT STREAM
        client.on("chat", function (channel, userstate, message, self) {
            if (self) return;

            if (message.includes("Kappa")){
                console.log(dateL + infoL + "KAPPA DETECTED")
                io.emit('showE', 25)
            };
        });

        // SERVER ROUTES
        app.get('/', function(req, res){
            res.render('index');
        });

        app.get('/clr', function(req, res){
            res.render('clr');
        });

        // LOGIN PARSER
        app.post('/settings', function (req, res) {
            console.log(dateL + infoL + "DATA FROM " + req.query.form);
            console.log(dateL + infoL + "USER: " + req.body.alphName)
            console.log(dateL + infoL + "PASS :" + req.body.alphPW)

            if (req.body.alphPW == config.alphyServerMaster){
                res.render('settings')
                console.log(dateL + infoL + "GRANTED ACCESS")
            } else {
                res.render('wrongpass')
                console.log(dateL + errorL + "DENIED WRONG ACCESS")
            };
        });

        // app.get('*', (req, res) => res.render('404'));

        // // 500 PAGE: SERVER ERROR
        // app.use(function (err, req, res, next) {
        //     console.error(err.stack);
        //     res.status(500);
        //     res.render('500');
        // });

        // SERVER LISTEN
        app.listen(serverPort, function () {
          console.log(dateL + infoL + "alphyBot website avaible on port "
          + serverPort + "!");
        });
    }
}
