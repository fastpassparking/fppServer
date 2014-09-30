var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.end('Server is running');
});

// Return value of index
module.exports = router;