var express = require('express');
var router = express.Router();
var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);


/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
  connection.query('SELECT name FROM test', function(err, rows, fields) {
    if (err) throw err;
     {
              console.log('Connection result error '+err);
              console.log('no of records is '+rows.length);
                      response.writeHead(200, { 'Content-Type': 'application/json'});
              response.end(JSON.stringify(rows));
      });

});

module.exports = router;
