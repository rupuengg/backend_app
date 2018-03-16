var orm = require('orm');
var db = orm.connect('mysql://root:qainfotech@localhost/node', function (err, db) {
    if (err)
        return console.error('Connection error: ' + err);
    console.log("database connected")
    return db;
});

module.exports = {orm: orm, db: db, abc: 'abc'}