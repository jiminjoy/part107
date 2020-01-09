var express = require('express');
var router = express.Router();
var Cloudant = require('cloudant');
var request = require('request');
var async = require('async');
var crypto = require('crypto');
var bycrypt = require('bcrypt');
const saltRounds = 10;
var xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');
var passport = require('passport');

var account = '28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix';
var password = '2c1421638e034374abc8a5ddc8ae1ca5d77febf1397774284c0582684b23d559';
var host = '28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix.cloudant.com';
var port = '443';
var url = 'https://28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix:2c1421638e034374abc8a5ddc8ae1ca5d77febf1397774284c0582684b23d559@28b5fb71-d15a-48f8-b78e-b74e1be14305-bluemix.cloudant.com';

var cloudant = Cloudant({ account: account, password: password, host: host, port: port, url: url });

var nano = require("cloudant-nano")(url);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/get_user_cred', authenticationMiddleware(), function (req, res, next) {

  var user_db = cloudant.db.use('pts_users');
  //console.log( req.body.email);
  user_db.find({ selector: { "Email": req.body.email } }, function (err, result) {
    // console.log(result.docs);
    //console.log(err);

    if (err) {
      // console.log("err");
      res.status(404).json({ msg: 'database error' });
    }
    if (result.docs.length < 1) {
      // console.log("not found");
      res.status(404).json({ msg: 'not found' });
    }
    else {
      res.json(result.docs);
    }
  });

});

router.post('/login', function (req, res, next) {

  var user_db = cloudant.db.use('pts_users');

  user_db.find({ selector: { "Email": req.body.username } }, function (err, result) {
    // user_db.get("asd", conflicts=true, function (err, result) {
    // console.log(result);
    //console.log(err);

    if (err) {
      //  console.log("err");
      res.status(404).json({ msg: 'database error' });
    }
    if (result.docs.length < 1) {
      //console.log("not found");
      res.status(404).json({ msg: 'not found' });
    }
    else {
      var email = result.docs[0].Email;
      var password = result.docs[0].Password;
      bycrypt.compare(req.body.password, password, function (err, response) {
        if (response === true) {
          req.login(email, function (err) {
            res.json({ email: email, firstname: result.docs[0]['First Name'], lastname: result.docs[0]['Last Name'] });
          })
        }

      });
      
    }
  });
});

//Registers the user
router.post('/submit_user', function (req, res, next) {
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.

  var user_db1 = cloudant.db.use('pts_users');
  var user_db2 = cloudant.db.use('user_test');
  db = nano.db.use("pts_users");

  //console.log(req.body);
  if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.status(400).json("Please select captcha");
  }
  // Put your secret key here.
  var secretKey = "6LfPJGIUAAAAAG4XJssIlcSSLSyDA8vkLeR6TwqV";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, function (error, response, body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.

    if (body.success !== undefined && !body.success) {

      return res.status(400).json("Failed captcha verification");
    }
    else {
      //hashing the password
      var password = req.body.password;

      bycrypt.hash(password, saltRounds).then(
        function (hash) {
          var user_data = {
            "Email": req.body.email,
            "First Name": req.body.first_name,
            "Last Name": req.body.last_name,
            "Middle Name": req.body.middle_name,
            "Address": req.body.address,
            "Password": hash,
          };

          //Previous user creation didn't work when logging into MapView
          /*var user_data = {
            "Email": req.body.email,
            "First Name": req.body.first_name,
            "Middle Name": req.body.middle_name,
            "Last Name": req.body.last_name,
            "Password": req.body.password,
            "Street Address": req.body.address,
            "City": req.body.city,
            "State/Province": req.body.state,
          //  "Country": req.body.country,
           // "Zip Code": req.body.zipcode,
          }*/

          user_db1.find({ selector: { "Email": req.body.email } }, function (err, result) {

            if (result.docs.length < 1) {

              user_db1.insert(user_data, function (err, body) {

                if (err) {
                  res.status(400).json('Database Error');
                } else {

                  user_db2.insert(user_data, function (err, body) {

                    if (err) {
                      res.status(400).json('Database Error');
                    } else {
                      req.login(req.body.email, function (err) {
                        res.json("Success");
                      })

                    }
                  });
                }
              });
            }
            else {
              //error if duplicate 
              res.status(400).json('Account already exists');
            }
          });


        });
    }
  });
});

//gets user quiz report
router.get('/get_user_report', authenticationMiddleware(), function (req, res, next) {

  var user_db = cloudant.db.use('pts_user_quiz');

  var email = decodeURIComponent(req.query.email);

  user_db.find({ selector: { "Email": email } }, function (err, result) {

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

router.post('/get_quiz_review', authenticationMiddleware(), function (req, res, next) {

  var user_db = cloudant.db.use('pts_user_quiz');

  var email = decodeURIComponent(req.body.email);

  user_db.find({ selector: { "Email": email, "Type": req.body.unit } }, function (err, result) {

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

//Updates user account
router.post('/update_user', authenticationMiddleware(), function (req, res, next) {

  //console.log(req.body);

  // Using nano module to first insert the new document with the latest rev and then deleting the old document.

  // Var user_db is connecting to cloudant using the nano module. Out user account database is names pts_user
  var user_db = cloudant.db.use('pts_users');


  var email = decodeURIComponent(req.body.email);

  var update = {
    "Email": email,
    "First Name": req.body.first_name,
    "Middle Name": req.body.middle_name,
    "Last Name": req.body.last_name,
    "Password": req.body.password,
    "Address": req.body.address,
    "City": req.body.city,
    "Country": req.body.country,
    "State/Province": req.body.province,
    "Zip Code": req.body.zipcode
  }


  user_db.find({ selector: { "Email": email } }, function (err, result) {

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

      var doc_id = result.docs[0]['_id'];
      var doc_rev = result.docs[0]['_rev'];

      db = nano.db.use("pts_users");

      db.get(doc_id, function (err, body) {

        if (!err) {

          var latestRev = doc_rev;

          db.destroy(doc_id, latestRev, function (err, body, header) {
            if (!err) {

              user_db.insert(update, function (err, body) {

                if (err) {
                  res.status(400).json('Database Error');
                }
                else {
                  res.json("Success");
                }
              });


            }
            else {
              console.log(err);
              res.status(400).json("Database Error"); //Error occurs here 
            }
          });
        }
        else {
          console.log(err);
          res.status(400).json("Database Error");
        }
      });

    }

  });


  // user_db.insert(update, function (err, body) {

  //   if (err) {
  //     res.status(400).json('Database Error');
  //   }
  //   else {

  //     // This is the delete function. It will be used for delete account purpose if later implemented.
  //     db = nano.db.use("pts_users");

  //     db.get(req.body.user_Id, function (err, body) {

  //       if (!err) {
  //         var latestRev = req.body.user_Rev;

  //         db.destroy(req.body.user_Id, latestRev, function (err, body, header) {
  //           if (!err) {
  //             res.json("Successfully Updated Account ");
  //           }
  //           else {
  //             console.log(err);
  //             res.status(400).json("Database Error"); //Error occurs here 
  //           }
  //         });
  //       }
  //       else {
  //         res.status(400).json("Database Error");
  //       }
  //     });
  //   }
  // });

});

router.post('/forgot_password', function (req, res, next) {

  'use strict';
  const nodemailer = require('nodemailer');

  var user_db = cloudant.db.use('pts_users');
  var dbnano = nano.db.use("pts_users");
  var email = decodeURIComponent(req.body.email);

  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {

      user_db.find({ selector: { "Email": email } }, function (err, result) {

        if (err) {
          //console.log("err");
          res.status(404).json({ msg: 'database error' });
        }
        if (result.docs.length < 1) {
          console.log("No account with this email exists");
          return res.redirect('/forgotpassword');
        } else {

          var id = result.docs[0]["_id"];

          var userData = {
            "Email": result.docs[0]['Email'],
            "First Name": result.docs[0]['First Name'],
            "Middle Name": result.docs[0]['Middle Name'],
            "Last Name": result.docs[0]['Last Name'],
            "Address": result.docs[0]['Address'],
            // "Country": result.docs[0]['Country'],
            // "Zip Code": result.docs[0]['Zip Code'],
            "Reset_Token": token
          }

          user_db.insert(userData, function (err, body) {

            if (err) {
              //console.log(err);
              res.status(400).json('Database Error');
            }
            else {
              dbnano.get(id, function (err, body) {

                if (!err) {
                  var latestRev = body['_rev'];
                  dbnano.destroy(id, latestRev, function (err, body, header) {
                    if (err) {
                      //console.log(err);
                      res.status(400).json("Database Error");
                    } else {
                      done(err, token);
                    }
                  });
                }
                else {
                  res.status(400).json("Database Error");
                }
              });
            }
          });
        }
      });
    },
    function (token, done) {

      var transport = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
          user: 'pilottrainingsystem100@gmail.com', //access to less apps in gmail is turned on, should be fixed
          pass: 'pilottraining_123'
        }
      }));
      var mailOptions = {
        to: email,
        from: 'Pilot Training System, LLC',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/token=' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transport.sendMail(mailOptions, function (err) {
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) return next(err);
    res.json("Please check your email");
  });
});

router.post("/reset_password", function (req, res, next) {
  var user_db = cloudant.db.use('pts_users');
  var dbnano = nano.db.use("pts_users");

  var email = decodeURIComponent(req.body.email);

  user_db.find({ selector: { "Reset_Token": req.body.token } }, function (err, result) {

    if (err) {
      //console.log("err");
      res.status(404).json({ msg: 'database error' });
    }
    if (result.docs.length < 1) {
      res.status(404).json('Error');
    } else {

      var id = result.docs[0]["_id"];

      var userData = {
        "Email": result.docs[0]['Email'],
        "First Name": result.docs[0]['First Name'],
        "Middle Name": result.docs[0]['Middle Name'],
        "Last Name": result.docs[0]['Last Name'],
        "Address": result.docs[0]['Address'],
        // "Country": result.docs[0]['Country'],
        // "Zip Code": result.docs[0]['Zip Code'],
        "Password": req.body.password
      }

      user_db.insert(userData, function (err, body) {

        if (err) {
          //console.log(err);
          res.status(400).json('Database Error');
        }
        else {
          dbnano.get(id, function (err, body) {

            if (!err) {
              var latestRev = body['_rev'];
              dbnano.destroy(id, latestRev, function (err, body, header) {
                if (err) {
                  //console.log(err);
                  res.status(400).json("Database Error");
                } else {
                  res.json("Password was reset");
                }
              });
            }
            else {
              res.status(400).json("Database Error");
            }
          });
        }
      });
    }
  })
});

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.redirect('/')
  }
}

module.exports = router;
