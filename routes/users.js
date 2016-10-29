var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection(process.env.JAWSDB_MARIA_URL);


/*
 * GET userlist.
 */
router.get('/', function(req, res) {
  db.connect();

  db.query('SELECT * FROM sarjataulukkodata', function(err, rows, fields) {
    if (err) throw err;
              console.log('Connection result error '+err);
              console.log('no of records is '+rows.length);
              res.json(rows);

      });

      db.end();


});

module.exports = router;
