var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection(process.env.JAWSDB_MARIA_URL);


/*
 * GET userlist.
 */
router.get('/', function(req, res) {

  db.query('SELECT * FROM sarjataulukkodata', function(err, rows, fields) {
      console.log('Connection result error '+err);
      if (err) throw err;

      console.log('Connection result error '+err);
      console.log('no of records is '+rows.length);
      res.json(rows);

      });
});
router.get('/2016', function(req, res) {

  db.query('SELECT * FROM sarjataulukkodata WHERE season_id=1', function(err, rows, fields) {
      console.log('Connection result error '+err);
      if (err) throw err;

      console.log('Connection result error '+err);
      console.log('no of records is '+rows.length);
      res.json(rows);

      });
});

module.exports = router;
