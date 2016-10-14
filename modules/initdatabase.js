// CONSOLE LOG VARIABLES
var dateData = String(new Date());
var dateSplit = dateData.split(" ")
var datePrint = dateSplit[1] + " " + dateSplit[2] + " " +
    dateSplit[3] + " " + dateSplit[4]
var dateL = "[" + datePrint + "] "
const errorL = " [ ERROR ] "
const infoL = " [ INFO ] "

// MAIN
module.exports = (container) => {
    'use strict';

    // lib start
    const lib = {};

    // here the config, "imported" from the container
    const config = container.config;
    const mysql = require('mysql');

    // DATABASE SETUP
    const connection = mysql.createConnection({
        host : 'localhost',
        user : config.database.dbuser,
        password : config.database.dbpassword,
        database : config.database.db
    });

    connection.connect(function(err) {
        if (err) {
            console.error(dateL + errorL + "Couldn't conntect to DB" + err.stack);
        return;
    };
    console.log(dateL + infoL + 'Connected with ID: ' + connection.threadId);
    });
    connection.query(`CREATE TABLE IF NOT EXISTS chatters(
        chatter_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        display_name VARCHAR(30) NOT NULL,
        username VARCHAR(30) NOT NULL,
        points INT UNSIGNED NOT NULL,
        first_seen TIMESTAMP);`, function (err) {
            if (err){
                console.log(dateL + errorL + "Couldn't create chatters table: "
                + err);
            } else {
                 console.log(dateL + infoL + "Chatters table avaible.");
            };
        });

        connection.query(`CREATE TABLE IF NOT EXISTS commands(command_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        command VARCHAR(30) NOT NULL,
        echo VARCHAR(140) NOT NULL,
        count INT UNSIGNED NOT NULL,
        CONSTRAINT uq_command UNIQUE (command));`, function (err) {
            if (err){
                console.log(dateL + errorL + "Could't create commands table: "
                +err);
            }else {
                console.log(dateL + infoL + "Commands table avaible.");
            };
        });
        connection.query(`INSERT INTO commands VALUES
        (NULL, "!test", "this is a test message", 0)`, function(err) {
            if (err){
                console.log(dateL + errorL + "Could't add test command: "
                + err);
            };
        });
        connection.query(`CREATE TABLE IF NOT EXISTS emotes(
        emote_id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY,
        emote_name VARCHAR(30) NOT NULL,
        image_id INT UNSIGNED NOT NULL,
        emote_count INT UNSIGNED NOT NULL
        CONSTRAINT uq_image_id UNIQUE (image_id));`, function (err) {
            if (err){
                console.log(dateL + errorL + "Coulnd't create emote table: "
                + err);
            }else {
                console.log(dateL + infoL + "Emotes table avaible.");
            };
        });
        connection.query('INSERT INTO emotes VALUES(NULL, "4Head", 354, 0);',
	function (err) {
            if (err){
                console.log(dateL + errorL + "Coulnd't add 4Head emote to table: "
                + err);
            };
        });

  // lib end
  return lib;
};
