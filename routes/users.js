var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection(process.env.JAWSDB_MARIA_URL);


/*
 * GET userlist.
 */
router.get('/', function(req, res) {

  db.query('
  SELECT m.*
  FROM sarjataulukkodata m
      LEFT JOIN sarjataulukkodata b
          ON m.team_id = b.team_id
          AND m.kierros_id < b.kierros_id
          AND season_id = 1
  WHERE b.kierros_id IS NULL
  AND season_id = 1

  ', function(err, rows, fields) {
      console.log('Connection result error '+err);
      if (err) throw err;

      console.log('Connection result error '+err);
      console.log('no of records is '+rows.length);
      res.json(rows);

      });
});
router.get('/2016', function(req, res) {

  db.query('
  SELECT m.*
  FROM sarjataulukkodata m
      LEFT JOIN sarjataulukkodata b
          ON m.team_id = b.team_id
          AND m.kierros_id < b.kierros_id
          AND season_id = 1
  WHERE b.kierros_id IS NULL
  AND season_id = 1
', function(err, rows, fields) {
      console.log('Connection result error '+err);
      if (err) throw err;

      console.log('Connection result error '+err);
      console.log('no of records is '+rows.length);
      res.json(rows);

      });
});

module.exports = router;
