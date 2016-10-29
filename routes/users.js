var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = mysql.createConnection(process.env.JAWSDB_MARIA_URL);

function stripAlphaChars(source) {
  var out = source.replace(/[^0-9]/g, '');

  return out;
}

/*
 * GET userlist.
 */
router.get('/', function(req, res) {

  db.query('SELECT m.* FROM sarjataulukkodata m LEFT JOIN sarjataulukkodata b ON m.team_id = b.team_id AND m.kierros_id < b.kierros_id AND b.season_id = 1 WHERE b.kierros_id IS NULL AND m.season_id = 1 ORDER BY m.team_id', function(err, rows, fields) {
      console.log('Connection result error '+err);
      if (err) throw err;

      console.log('Connection result error '+err);
      console.log('no of records is '+rows.length);
      res.json(rows);

      });
});
router.get('/2016/:kierrosId', function(req, res) {
  var kierros = parseInt(req.param('kierrosId')) + 1;

  db.query('SELECT m.* FROM sarjataulukkodata m LEFT JOIN sarjataulukkodata b ON m.team_id = b.team_id AND m.kierros_id < b.kierros_id AND b.kierros_id < '+kierros+' AND b.season_id = 1 WHERE b.kierros_id IS NULL AND m.kierros_id < '+kierros+' m.season_id = 1 ORDER BY m.team_id', function(err, rows, fields) {
      console.log('Connection result error '+err);
      if (err) throw err;

      console.log('Connection result error '+err);
      console.log('no of records is '+rows.length);
      res.json(rows);

      });
});

module.exports = router;
