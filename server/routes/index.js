var express = require('express');
var router = express.Router();
var mlApi = require('../apiRequest/ml');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/usernames', function(req, res, next){
  let xquery = req.body.xquery;
  let database = req.body.database;
  let vars = req.body.vars;

  mlApi.getUsers(xquery, database, vars, function(response){
    console.log(response);
    res.send(response);
  });


});

module.exports = router;
