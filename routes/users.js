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

  var sql = 'SELECT m.team_id as team_id, m.series_id, m.season_id, m.kierros_id, j.teamName, j.teamNameShort, m.voitot, m.tasan, m.haviot, m.tdf, m.tda, m.casf, m.casa, m.tr, m.MISS FROM sarjataulukkodata m '+
              'LEFT JOIN joukkuedata j '+
              'ON m.team_id = j.team_id AND m.kierros_id = j.kierros_id AND j.season_id = m.season_id AND j.series_id = m.series_id '+
              'LEFT JOIN sarjataulukkodata b '+
              'ON m.team_id = b.team_id AND m.kierros_id < b.kierros_id AND b.season_id = m.season_id AND b.series_id = m.series_id '+
              'WHERE b.kierros_id IS NULL '+
              'AND m.season_id = 1 '+
              'ORDER BY (m.voitot*3+m.tasan) DESC, (m.tdf-m.tda) DESC, (m.casf-m.casa) DESC';
  db.query(sql, function(err, rows, fields) {
      console.log('Connection result error '+err);
      if (err) throw err;
      var i = 1;
      rows.forEach(function(element) {
          element['ranking'] = i++;
      });
      console.log('Connection result error '+err);
      console.log('no of records is '+rows.length);
      res.json(rows);

      });
});
router.get('/2016/:kierrosId', function(req, res) {
  var kierros = 0;
  kierros = kierros + parseInt(req.params.kierrosId) + 1;
  var sql = 'SELECT m.* FROM sarjataulukkodata m LEFT JOIN sarjataulukkodata b ON m.team_id = b.team_id AND m.kierros_id < b.kierros_id AND b.kierros_id < '+db.escape(kierros)+' AND b.season_id = 1 WHERE b.kierros_id IS NULL AND m.kierros_id < '+db.escape(kierros)+' AND m.season_id = 1 ORDER BY (m.voitot*3+m.tasan) DESC, (m.tdf-m.tda) DESC, (m.casf-m.casa) DESC';
  db.query(sql, function(err, rows, fields) {
      console.log('Connection result error '+err);
      if (err) throw err;
      var i = 1;
      rows.forEach(function(element) {
          element['ranking'] = i++;
      });
      console.log('Connection result error '+err);
      console.log('no of records is '+rows.length);
      res.json(rows);

      });
});

module.exports = router;
