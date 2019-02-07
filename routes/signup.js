var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//for login/logout (authentication)
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4'); //generates uuid for us
//use sendgrid
var sgMail = require("@sendgrid/mail");
var keys = require("../key");
sgMail.setApiKey(keys.sendgrid);
//email template
var path = require("path");
var fs = require('fs');
var ejs = require('ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

var connection = mysql.createConnection({
  host: process.env.DB_HOST,

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PW,
  database: process.env.DB_DB
});

//compile email template
var signupEmailTemplateText = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/emailVerification/emailVerification.ejs'), 'utf-8');
var signupEmailTemplate = ejs.compile(signupEmailTemplateText);

//compile email template for password reset
var resetPasswordEmailTemplateText = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/resetPassword/resetPassword.ejs'), 'utf-8');
var resetPasswordEmailTemplate = ejs.compile(resetPasswordEmailTemplateText);

router.post('/register', function(req, res) {
  console.log(req.body);
  var selectedCryptos = req.body.cryptoProfile;
//First we make a query to see if user exists in the database
  connection.query(
    'SELECT * FROM users WHERE username = ?',
    [req.body.username],
    function(error, result, fields) {
      if (error) throw error;

      //if we find the email exists in the database, we send "Email is taken" to the client
      if (result[0]) return res.status(404).json({ usernameError: 'Username is taken'});


      connection.query(
        'SELECT * FROM users WHERE email = ?',
        [req.body.email],
        function(error, result, fields) {
          if (error) throw error;
          //if we find the username exists in the database, we send "Username is taken" to the client
          if (result[0]) return res.status(404).json({ emailError: 'Email is taken' });

          if (!req.body.password) return res.status(401).json({ error: 'you need a password' });

          if (req.body.password.length <= 5) return res.status(401).json({ passwordError: 'Password length must be greater than 5' });

          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, password_hash) {
            //1) insert the new user into users table

              connection.query('INSERT INTO users (email, password, username, email_verification_token) VALUES (?, ?, ?, ?)',
              [req.body.email, password_hash, req.body.username, uuidv4()],
              function (error, results, fields) {

                if (error) {
                  console.log(error)
                } else {
                  //send a notificiation to the client side to let user verify their email
                  res.json({
                      message: "We sent you an email for email verification. Please confirm your email."
                  });

                  let UserID; //make a available to be resused when insert into users_cryptos table

                    //query the new inserted user to get the user-id and email verification code
                    connection.query(
                      'SELECT * FROM users WHERE email = ?',
                      [req.body.email],
                      function(error, result, fields) {
                        if (error) throw error;
                        userID = result[0].id;

                        let photo = ['fa-user-secret', 'fa-user-circle', 'fa-user-astronaut', 'fa-user-tie', 'fa-user'];
                        let photo_index = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

                        connection.query(
                          'INSERT INTO users_profiles (user_id, photo ) VALUES(?,?)',
                          [result[0].id, photo[photo_index], ],
                          function(error, result, fields) {
                            if (error) throw error;
                          }
                        );

                        //use sendgrid to send email
                        let verify_link = process.env.BACKEND_URL+"/email-verify/" + userID + "/" + result[0].email_verification_token;

                        const email_verification = {
                          to: req.body.email,
                          from: process.env.CUSTOMER_SUPPORT,
                          subject: 'Confirm your email address',
                          html: signupEmailTemplate({ email: req.body.email, verify_link })
                        };
                        sgMail.send(email_verification);
                      }



                    );

                    if(selectedCryptos.length > 0){
                                          //insert selected cryptos into users_cryptos table
                      connection.query(
                        "SELECT * FROM crypto_metadata LEFT JOIN crypto_info ON crypto_metadata.crypto_name = crypto_info.crypto_metadata_name WHERE crypto_name IN (?)",
                        [selectedCryptos],
                        function(error, results, fields) {
                          if (error) throw error;
                          const userID_cryptoID = [];

                          const cryptoIDs = results.map(crypto => {
                            return crypto["id"]
                          })

                          for (let i = 0; i < cryptoIDs.length; i++) {
                            let innerArr = [];
                            innerArr.push(userID, cryptoIDs[i]);
                            userID_cryptoID.push(innerArr);
                          }

                        //Now we insert the userID_cryptoID array into the users_cryptos table
                          connection.query(
                            'INSERT INTO users_cryptos (user_id, crypto_id) VALUES ?',
                            [userID_cryptoID],
                            function(error, user_cryptos, fields) {
                              if (error) throw error;
                            }


                          );

                        }
                      );

                    }
                }
              });

            });//bcrypt.hash closing bracket

          }); //bcrypt.getsalt closing bracket
        }
      );
    }
  );
});

router.post('/resend-email', function(req, res) {
    console.log("resend-email");
    console.log(req.body);
  //First we make a query to see if user exists in the database
    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [req.body.email],
      function(error, result, fields) {
        if (error) throw error;
        console.log(result);
  //if we find the user exists in the database, we send "User already exists" to the client
        if (!result[0]) return res.status(404).json({ error: 'Email not in database' });
        res.json({
            message: "We sent you another email for email verification. Please confirm your email."
        });
        let userID = result[0].id;

       //use sendgrid to send email
       let verify_link = process.env.BACKEND_URL+"/email-verify/" + userID + "/" + result[0].email_verification_token;

       const email_verification = {
         to: req.body.email,
         from: process.env.CUSTOMER_SUPPORT,
         subject: 'Confirm your email address',
         html: signupEmailTemplate({ email: req.body.email, verify_link })
       };
       sgMail.send(email_verification);

      }
    );
  });

 //Once the user clicks on the email verification, we get the id and email verification params
router.get('/email-verify/:user_id/:email_verification_token', function(req, res) {
    console.log("email-verify");
  connection.query(
    'SELECT * FROM users WHERE id = ?',
    [req.params.user_id],
    function(error, result, fields) {
      if (error) throw error;

      //if user is verified already then send a message to user that the account is verified
      if (result[0].verified_email === 1) {
        res.send("Your account has been verified, please login.")
      } else {
        //update verified email to true
        connection.query(
          'UPDATE users SET ? WHERE ?',
          [{verified_email: 1}, {id: req.params.user_id}],
          function(error, results, fields) {
            if (error) throw error;
            res.send("Your email has been verified, please login.")
            //TODO: rediect user to the matched deal page
          }
        );

      }

    }
  );
});

router.post('/reset-password-email', function(req, res) {
    console.log("reset-password-email");
    console.log(req.body);
  //First we make a query to see if user exists in the database
    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [req.body.email],
      function(error, result, fields) {
        if (error) throw error;
        console.log(result);
  //if user does not exist in the database, we throw error to the client
        if (!result[0]) return res.status(404).json({ error: 'Email not in database' });
        res.json({
            message: "We sent you an email for password reset. Please confirm your email."
        });
        let userID = result[0].id;
        //generate randomized token with timestamp
        //token will be included in password reset link
        //timestamp puts timelimit for token usage, 3600000ms=1hr
        let token = Math.random().toString(36).substring(2,10)+"-"+Math.random().toString(36).substring(2,10)+"-"+Math.random().toString(36).substring(2,10);
        let timestamp = Date.now();
        connection.query(
            'UPDATE users SET ? WHERE email = ?',
            [{reset_pw_token: token, reset_pw_timestamp: timestamp}, req.body.email],
            function(error, result, fields) {
                if (error) throw error;
            }
        )

       //use sendgrid to send email
       let password_reset_link;
       if (process.env.NODE_ENV=="development"){
            password_reset_link = process.env.FRONTEND_URL+"/ResetPassword/"+token;
        } else {
            password_reset_link = process.env.BACKEND_URL+"/ResetPassword/"+token;
        }
        
       const email_password_reset = {
         to: req.body.email,
         from: process.env.CUSTOMER_SUPPORT,
         subject: 'Reset your Password',
         html: resetPasswordEmailTemplate({ password_reset_link })
       };
       sgMail.send(email_password_reset);

      }
    );
  });

   
    router.get('/validate-pw-token', function(req, res) {
        console.log("req.query.token");
        console.log(req.query.token);
        let timestamp = Date.now();
        connection.query(
            'SELECT reset_pw_timestamp from users WHERE reset_pw_token = ?',
            [req.query.token],
            function(error, result, fields) {
                if (error) throw error;
                console.log("stored timestamp");
                console.log(result);
                console.log("current timestamp");
                console.log(timestamp);
                res.json({current:timestamp,stored:result});
            }
        )

    })
    // pw_token_validity: "none",
    // error_message: ""
   router.post('/reset-password', function(req, res) {
    console.log("req");
    console.log(req);
    connection.query(
      'SELECT * FROM users WHERE reset_pw_token = ?',
      [req.body.token],
      function(error, result, fields) {
        if (error) throw error;
        if (!result[0]) return res.status(404).json({ pw_token_validity:'invalid', error_message: '' });
        if ((result[0].reset_pw_timestamp+3600000) <= Date.now()) return res.json({ pw_token_validity:'expired', error_message: '' })
        if (!req.body.password1) return res.status(401).json({ pw_token_validity:'valid', error_message: 'Password is missing.' });
        if (!req.body.password2) return res.status(401).json({ pw_token_validity:'valid', error_message: 'Password is missing.' });
        if (req.body.password1!=req.body.password2) return res.status(401).json({ pw_token_validity:'valid', error_message: 'Passwords do not match.' });
        if (req.body.password1.length <= 5) return res.status(401).json({ pw_token_validity:'valid', error_message: 'Password length must be greater than 5.' });
        //if user is verified already then send a message to user that the account is verified
        if (result[0].reset_pw_token === req.body.token) {

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password1, salt, function(err, password_hash) {

                  connection.query('UPDATE users SET ? WHERE ?',
                  [{password: password_hash, reset_pw_token: null, reset_pw_timestamp: null}, {id: result[0].id}],
                  function (error, results, fields) {

                    if (error) {
                      console.log(error)
                    } else {
                      //send a notificiation to the client side to let user verify their email
                      res.json({ pw_token_validity:'valid', error_message: 'Password has been changed. Please sign in using the new password.' });
                    }
                  });

                });//bcrypt.hash closing bracket

              }); //bcrypt.getsalt closing bracket


        }

      }
    );
  });

//Anyone can access this route
//grab the cryptos list for user to select
router.get('/cryptocurrencies', function(req, res) {

  connection.query(
    'SELECT crypto_metadata_name, crypto_symbol, crypto_logo FROM crypto_info LEFT JOIN crypto_metadata ON crypto_info.crypto_metadata_name = crypto_metadata.crypto_name',
    function(error, results, fields) {

      if (error) throw error;

      res.json(results);
    }
  );
});

module.exports = router;
