var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);


/* GET home page. */
router.get('/', function(req, res, next) {
  connection.connect();
  connection.query('USE test', function(err, rows, fields) {
    if (err) throw err;
  });

  connection.query('SELECT name FROM test', function(err, rows, fields) {
    if (err) throw err;

    res.render('index', { title: rows['name'].solution });
  });

  connection.end();


});

module.exports = router;
