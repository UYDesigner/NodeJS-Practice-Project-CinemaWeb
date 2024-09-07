var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.get('/cinemainterface', function (req, res, next) {
  res.render('cinemainterface', { message: '' });
});

router.post('/submit_details', upload.single('formFile'), function (req, res, next) {
  // console.log(req.body);
  console.log("file", req.file);
  pool.query("insert into moviedetails(stateid, cityid, cinemaid, screenid, moviename, description, price, status, releasedate, picture)values(?,?,?,?,?,?,?,?,?,?)", [req.body.stateid, req.body.cityid, req.body.cinemaid, req.body.screenid, req.body.moviename, req.body.description, req.body.price, req.body.status, req.body.releasedate, req.file.filename], function (error, result) {

    if (error) {
      console.log(error);
      res.render('cinemainterface', {
        message: 'failed to submit'
      })
    }
    else {
      res.render('cinemainterface', {
        message: 'kaam chal gya '
      })
    }
  })
})

router.get('/displayallmovies', function (req, res, next) {
  pool.query('select md.*, (select s.statename from states s where s.stateid = md.stateid ) as statename, (select c.cityname from city c where c.cityid=md.cityid) as cityname, ( select ci.cinemaname from cinema ci where ci.cinemaid=md.cinemaid )as cinemaname , (select sc.screenname from screens sc where sc.screenid=md.screenid) as screenname from moviedetails md', function (error, result) {
    if (error) {
      console.log(error)
      res.render('displayallmovies', { status: false, message: 'failed to serve', data: [] })
    }
    else {
      if (result.length == 0) {
        res.render('displayallmovies', { data: [], message: 'no record found', status: false });
      }
      else {
        res.render('displayallmovies', { message: 'succes', data: result, status: true })
      }
    }

  })
  // res.render('displayallmovies');
})

router.get('/display_product_by_id',
  function (req, res, next) {

    pool.query('select md.*, (select s.statename from states s where s.stateid = md.stateid ) as statename, (select c.cityname from city c where c.cityid=md.cityid) as cityname, ( select ci.cinemaname from cinema ci where ci.cinemaid=md.cinemaid )as cinemaname , (select sc.screenname from screens sc where sc.screenid=md.screenid) as screenname from moviedetails md where movieid=?', [req.query.movieid], function (error, result) {
      if (error) {
        res.render('displayproductbyid', { data: [], status: false, message: 'failed to serve' })
      }
      else {
        {
          console.log(result)
          res.render('displayproductbyid', { data: result[0], message: 'success', status: true })
        }
      }
    })

    // res.render('displayproductbyid', { message : ''});
  })

  //  display card details------------------

  router.get('/display_movie_by_id',
  function (req, res, next) {

    pool.query('select md.*, (select s.statename from states s where s.stateid = md.stateid ) as statename, (select c.cityname from city c where c.cityid=md.cityid) as cityname, ( select ci.cinemaname from cinema ci where ci.cinemaid=md.cinemaid )as cinemaname , (select sc.screenname from screens sc where sc.screenid=md.screenid) as screenname from moviedetails md where movieid=?', [req.query.movieid], function (error, result) {
      if (error) {
        console.log(error)
        res.render('displaymoviebyid', { data: [], status: false, message: 'failed to serve' })
      }
      else {
        {
          console.log("res", result)
          res.render('displaymoviebyid', { data: result[0], message: 'success', status: true })
        }
      }
    })

    // res.render('displaymoviebyid', { message : ''});
  })

router.get('/show_image', function (req, res) {
  console.log(res.query);
  res.render('showimage', { data: req.query })

})

router.post('/edit_image', upload.single('formFile'), function (req, res) {
  pool.query('update moviedetails set picture=? where movieid=?', [req.file.filename, req.body.movieid], function (error, result) {
    if (error) {
      res.redirect('/cinema/displayallmovies')
    }
    else {
      res.redirect('/cinema/displayallmovies')
    }
  })
})

router.post('/edit_details', function (req, res) {
  console.log(res.body);
  // res.status(404).send("404 - Not Found");
  pool.query('update moviedetails set stateid=?, cityid=?, cinemaid=?, screenid=?, moviename=?, description=?, price=?, status=?, releasedate=? where movieid=?', [req.body.stateid, req.body.cityid, req.body.cinemaid, req.body.screenid, req.body.moviename, req.body.description, req.body.price, req.body.status, req.body.releasedate, req.body.movieid], function (error, result) {
    if (error) {
      console.log(error);
      res.redirect('/cinema/displayallmovies')
    }
    else {
      res.redirect('/cinema/displayallmovies')
    }
  })
  // Add this route at the end of your route definitions
  
})

module.exports = router;