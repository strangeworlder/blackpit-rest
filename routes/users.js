var express = require('express');
var router = express.Router();
var db = mysql.createConnection(process.env.JAWSDB_MARIA_URL);


/*
 * GET userlist.
 */
router.get('/', function(req, res) {
  res.json({"data": "poop"});


});

module.exports = router;
