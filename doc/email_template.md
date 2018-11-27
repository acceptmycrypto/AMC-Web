###techonogies use for email templates
- ejs (must be used with a view folder)
- sendgrid (used to send email)
- mjml - bootstrap like for email template https://mjml.io/documentation

```
//https://mjml.io/download
npm install mjml -g
//get the extension mjml for your editor or try it live https://mjml.io/try-it-live
//email template samples
https://reallygoodemails.com/
```

#How it works
1. import fs and ejs
```
var fs = require('fs'); //to read the ejs file
var ejs = require('ejs'); //we use ejs as the view engine
```
2. read the ejs file and compile email template
```
var signupEmailTemplateText = fs.readFileSync(path.join(__dirname, '../views/emailTemplates/emailVerification.ejs'), 'utf-8');
//must use path.join to access the right route

var signupEmailTemplate = ejs.compile(signupEmailTemplateText);
```
3. send email out
```
const email_verification = {
    to: req.body.email,
    from: process.env.CUSTOMER_SUPPORT,
    subject: 'Confirm your email address',
    html: signupEmailTemplate({ email: req.body.email, verify_link })
  };
  sgMail.send(email_verification);
```

###Work Flow to edit email template
1. create a new folder for a new email template in views/emailTempaltes
2. create a new file and name it in mjml "example.mjml"
3. You can live view your mjml template if you add in the mjml extension for your editor. If not you can code it live on their website https://mjml.io/try-it-live
4. Once you're done, you need to compile your mjml file into ejs
5. You're must in the same directory of the email template you're creating
6. Type ```mjml example.mjml -o example.ejs```
- the first example.mjml is th input file
- the second example.ejs is the outpul file

### Pass dynamic data to mgml file
1. Because mjml file is in the views directory, we can use ejs as the view engine in the mjml file
2. it's syntax is like this: <%= email %>

