var express = require('express');
var router = express.Router();
var db = mysql.createConnection(process.env.JAWSDB_MARIA_URL);


/*
 * GET userlist.
 */
router.get('/', function(req, res) {
  db.connect();

  db.query('SELECT name FROM test', function(err, rows, fields) {
    if (err) throw err;
              console.log('Connection result error '+err);
              console.log('no of records is '+rows.length);
              res.writeHead(200, { 'Content-Type': 'application/json'});
              res.end(JSON.stringify(rows));
      });

      db.end();


});

module.exports = router;
