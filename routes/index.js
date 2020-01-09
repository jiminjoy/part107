var express = require('express');
var router = express.Router();
var fs = require('fs');
var csvjson = require('csvjson');
var Cloudant = require('cloudant');
var passport = require('passport');

var account = '28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix';
var password = '2c1421638e034374abc8a5ddc8ae1ca5d77febf1397774284c0582684b23d559';
var host = '28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix.cloudant.com';
var port = '443';
var url = 'https://28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix:2c1421638e034374abc8a5ddc8ae1ca5d77febf1397774284c0582684b23d559@28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix.cloudant.com';

var cloudant = Cloudant({ account: account, password: password, host: host, port: port, url: url });

/* GET home page. */
router.get('/',  function (req, res, next) {
 // console.log(req.user);
  //console.log(req.isAuthenticated());
  res.render('login');
});

router.get('/main', authenticationMiddleware(), function (req, res, next) {
  res.render('index');
});

router.get('/logout', authenticationMiddleware(),function (req, res, next) {
  req.logout();
  req.session.destroy();
  res.clearCookie('connect.sid', {path: '/'}).redirect('/');
});

router.get('/registration', function (req, res, next) {
  res.render('registration');
});

router.get('/forgotpassword', function (req, res, next) {
  res.render('forgot_username_password');
});

router.get('/reset/token=:token', function (req, res, next) {
  res.render('reset_password');
});

router.get('/quiz_regulations', authenticationMiddleware(),function (req, res, next) {
  res.render('quiz_regulations');
});

router.get('/quiz_airspace', authenticationMiddleware(),function (req, res, next) {
  res.render('quiz_airspace');
});

router.get('/quiz_airport_operations',authenticationMiddleware(), function (req, res, next) {
  res.render('quiz_airport_operations');
});

router.get('/quiz_loading_and_performance', authenticationMiddleware(),function (req, res, next) {
  res.render('quiz_loading_performance');
});

router.get('/quiz_weather_part1', authenticationMiddleware(),function (req, res, next) {
  res.render('quiz_weather_part1');
});

router.get('/quiz_weather_part2', authenticationMiddleware(), function (req, res, next) {
  res.render('quiz_weather_part2');
});

router.get('/quiz_aviation_weather_services', authenticationMiddleware(),function (req, res, next) {
  res.render('quiz_aviation_weather_services');
});

router.get('/quiz_aeronautical_decision_making',authenticationMiddleware(), function (req, res, next) {
  res.render('quiz_aeronautical_decision_making');
});

router.get('/quiz_physiological_factors', authenticationMiddleware(),function (req, res, next) {
  res.render('quiz_physiological_factors');
});

router.get('/quiz/title=:title/id=:id',authenticationMiddleware(), function (req, res, next) {
  res.render('quiz');
});

router.get('/drone_report_card', authenticationMiddleware(),function (req, res, next) {
  res.render('drone_report_card');
});

router.get('/custom_exam', authenticationMiddleware(),function (req, res, next) {
  res.render('custom_exam');
});

router.get('/quiz/title=:title', authenticationMiddleware(),function (req, res, next) {
  res.render('quiz');
});

router.get('/figure/num=:num', authenticationMiddleware(),function (req, res, next) {
  res.render('figure');
});

router.get('/account', authenticationMiddleware(),function (req, res, next) {
  res.render('account_settings');
});

router.get('/drone_report_review/title=:title', authenticationMiddleware(),function (req, res, next) {
  res.render('drone_report_review');
});

router.get('/quiz/title=:title/type=:Review/trial=:trial/id=:id', authenticationMiddleware(),function (req, res, next) {
  res.render('quiz');
});


//to upload questions from csv file
router.get('/upload_questions', authenticationMiddleware(), function (req, res, next) {
  var user_db = cloudant.db.use('question_bank');

  var json;

  fs.readFile(__dirname + "/../public/DroneQuestionBank.csv", 'utf8', function (err, content) {
    if (err) {
      throw err;
    }
    var options = {
      delimiter: ',', // optional
      quote: '"' // optional
    };

    json = csvjson.toObject(content, options);

    var counter = 0;
    timer = setInterval(function () {
      console.log(json[counter]);
      user_db.insert(json[counter], function (err, body) {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: 'database error' });
        }
      });
      counter++
      if (counter === json.length) {
        clearInterval(timer);
        res.json({ msg: 'success' });
      }
    }, 2000);
  });
  res.json(content);
});


//load questions for quiz
router.get('/load_qestions', authenticationMiddleware(), function (req, res, next) {

  var user_db = cloudant.db.use('question_bank');

  user_db.find({ selector: { "Study Unit": req.query.unit } }, function (err, result) {

    //console.log(result.docs);
    //console.log(err);
    if (err) {
      //console.log("err");
      res.status(404).json({ msg: 'database error' });
    }
    if (result.docs.length < 1) {
      //console.log("not found");
      res.status(404).json({ msg: 'not found' });
      return;
    }
    else {
      res.json(result.docs);
    }
  });
});

router.get('/load_all_qestions', authenticationMiddleware(), function (req, res, next) {

  var user_db = cloudant.db.use('question_bank');

  user_db.find({ selector: {} }, function (err, result) {

    //console.log(result.docs);
    //console.log(err);
    if (err) {
      //console.log("err");
      res.status(404).json({ msg: 'database error' });
    }
    if (result.docs.length < 1) {
      //console.log("not found");
      res.status(404).json({ msg: 'not found' });
      return;
    }
    else {
      res.json(result.docs);
    }
  });
});

//sends user's quiz data to database
router.get('/send_user_score', authenticationMiddleware(),function (req, res, next) {

  var user_db = cloudant.db.use('pts_user_quiz');

  user_db.insert(req.query.quizData, function (err, body) {
    if (err) {
      console.log(err);
      res.status(400).json({ msg: 'database error' });
    } else {
      res.json({ msg: 'success' });
    }
  });
});

router.get('/load_review_data',authenticationMiddleware(), function (req, res, next) {

  var user_db = cloudant.db.use('pts_user_quiz');
  var email = decodeURIComponent(req.query.email);
  var id = req.query.id;
  var unit = req.query.unit;

  user_db.find({ selector: { "_id": id, "Email": email, "Type": unit } }, function (err, result) {
    if (err) {
      //console.log("err");
      res.status(404).json({ msg: 'database error' });
    }
    if (result.docs.length < 1) {
      //console.log("not found");
      res.status(404).json({ msg: 'not found' });
      return;
    }
    else {
      console.log(result.docs);
      res.json(result.docs);
    }
  });
});

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/')
	}
}

module.exports = router;
