var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var verifyToken = require("./utils/validation");

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

var path = require("path");

app.use(express.static("public"));

app.set('view engine', 'ejs');

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
var newEmailTemplateText = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/emailVerification/emailVerification.ejs'), 'utf-8');
var newEmailTemplate = ejs.compile(newEmailTemplateText);

var previousEmailTemplateText = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/previousEmail/previousEmail.ejs'), 'utf-8');
var previousEmailTemplate = ejs.compile(previousEmailTemplateText);

var resetEmailTemplateText = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/resetEmail/resetEmail.ejs'), 'utf-8');
var resetEmailTemplate = ejs.compile(resetEmailTemplateText);


router.post('/update/photo', verifyToken, function (req, res) {
    // var decoded = jwt.decode(token);
    // console.log(decoded);
    let user_id = req.decoded._id;
    let photo = req.body.selectedPhoto;
    connection.query('UPDATE users_profiles SET ? WHERE ? ;', [{photo}, {user_id}], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});


router.post('/update/username', verifyToken, function (req, res) {
    // var decoded = jwt.decode(token);
    // console.log(decoded);
    let id = req.decoded._id;
    let username = req.body.newUsername;
    connection.query('SELECT username FROM users WHERE ?;', [{username}], function (error, results, fields) {
        if (error) throw error;
        if(results.length < 1){
            connection.query('UPDATE users SET ? WHERE ? ;', [{username}, {id}], function (error, results, fields) {
                if (error) throw error;
                res.json(results);
            });
        }else{
            res.json({responseMessage: "Username is taken. Enter a different Username."});
        }
        
    });
});

router.post('/update/email', verifyToken, function (req, res) {
    // var decoded = jwt.decode(token);
    // console.log(decoded);
    let id = req.decoded._id;
    let email = req.body.newEmail;
    connection.query('SELECT email FROM users WHERE ?;', [{email}], function (error, results, fields) {
        if (error) throw error;
        if(results.length < 1){
            connection.query('SELECT email, email_verification_token FROM users WHERE ?;', [{id}], function (error, results, fields) {
                if (error) throw error;
                let previous_email = results[0].email;
                let email_verification_token = results[0].email_verification_token
                // console.log("Line 84", results[0].email)
                
                connection.query('UPDATE users SET ? , verified_email = 0 WHERE ? ;', [{email}, {id}], function (error, results, fields) {
                    if (error) throw error;

                    let verify_link = process.env.BACKEND_URL+"/email-verify/" + id + "/" + email_verification_token;

                    const email_verification = {
                        to: email,
                        from: process.env.CUSTOMER_SUPPORT,
                        subject: 'Confirm your email address',
                        html: newEmailTemplate({ email, verify_link })
                    };
                    sgMail.send(email_verification);

                    connection.query('UPDATE users SET ? WHERE ? ;', [{previous_email}, {id}], function (error, results, fields) {
                        if (error) throw error;
    
                        let reverse_email_link = process.env.BACKEND_URL+"/email-reverse/" + id + "/" + email_verification_token;
    
                        const previous_email_template = {
                            to: previous_email,
                            from: process.env.CUSTOMER_SUPPORT,
                            subject: 'Successful Email Address Change',
                            html: previousEmailTemplate({ email, reverse_email_link })
                        };
                        sgMail.send(previous_email_template);
                        
                        res.json({responseMessage: `Check your ${email} email and confirm your new email address.`});
                    });

                });
                
            });
        }else{
            res.json({responseMessage: "Email Address is linked to another account. Enter a different Email Address."});
        }
        
    });
});

router.get('/email-reverse/:user_id/:email_verification_token', function(req, res) {
    connection.query(
      'SELECT * FROM users WHERE id = ?',
      [req.params.user_id],
      function(error, result, fields) {
        if (error) throw error;
        let email = result[0].previous_email
        connection.query('UPDATE users SET email = ?, previous_email = NULL, verified_email = 1 WHERE  id = ?;', [email, req.params.user_id], function (error, results, fields) {
            if (error) throw error;
            const email_reset_success = {
                to: email,
                from: process.env.CUSTOMER_SUPPORT,
                subject: 'Successful Email Address Reset',
                html: resetEmailTemplate({ email})
            };
            sgMail.send(email_reset_success);
            
            res.send(`Your Email Address associated with your AcceptMyCryptoAccount has been reset to ${email}.`);
        });
        
  
      }
    );
  });


module.exports = router;