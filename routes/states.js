var express = require('express');
var router = express.Router();
var pool = require('./pool');


// states drop down 

/* GET home page. */
router.get('/fetch_all_states', function(req, res, next) {
  pool.query("SELECT * FROM states", function(error, result) {
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ result: [], message: 'Internal server error: issue in the database' });
    } else {
      res.status(200).json({
        result: result,
        message: 'Success'
      });
    }
  });
});

// city drop down 

router.get('/fetch_all_cities', function(req, res, next) {
  console.log(res.query)
  pool.query("select * from city where stateid=?", [req.query.stateid], function(error, result) {
    // console.log(res.query)
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ result: [], message: 'Internal server error: issue in the database' });
    } else {
      res.status(200).json({
        
        result: result,
        message: 'Success'
      });
    }
  });
});

// for cinema drop down 

router.get('/fetch_all_cinemas', function(req, res, next) {
  console.log(res.query)
  pool.query("select * from cinema where cityid=?", [req.query.cityid], function(error, result) {
    // console.log(res.query)
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ result: [], message: 'Internal server error: issue in the database' });
    } else {
      res.status(200).json({
        
        result: result,
        message: 'Success'
      });
    }
  });
});


// for screen drop down 

router.get('/fetch_all_screens', function(req, res, next) {
  console.log(res.query)
  pool.query("select * from screens where cinemaid=?", [req.query.cinemaid], function(error, result) {
    // console.log(res.query)
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ result: [], message: 'Internal server error: issue in the database' });
    } else {
      res.status(200).json({
        
        result: result,
        message: 'Success'
      });
    }
  });
});


module.exports = router;
