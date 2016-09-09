// SERVER
module.exports = {
    init: function () {
        console.log("SERVER TEST")
    },
    server: function (app, serverSettings) {
        app.get('/', function (req, res) {
          res.send('This is a place where alphyBot might be controlled with, some day ......');
        });

        app.listen(3000, function () {
          console.log('alphyBot website avaible on port 3000!');
        });
    }
}
