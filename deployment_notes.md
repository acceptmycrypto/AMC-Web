deployment notes Heroku:

Resource 1: https://devcenter.heroku.com/articles/git
    - heroku create to git push heroku master
Resource 2: https://devcenter.heroku.com/articles/nodejs-support
    - going over buildpack, NodeJS support in Heroku
Resource 3: Heroku Deployment Guide
    - Week 23, Day 2

Prepping deployment
    ***front end and backend url the same
    - Server.js
        - line 19-29
            - uncertain how that block of code works
        - CORS access
        - express static public commented out
            - I think I can uncomment lines 19-29 then add environment variable production back in
        - MySQL connections are environment variables
    - All Other Routes
        - signup.js line 92, localhosts to url
        - MySQL to environment variables
    - package.js Back-end
        - start + heroku post-build scripts
    - package.js Front-end
        - proxy
    - routes in front-end
        - all routes hitting backend (localhosts:3001) are now abbreviated to just their params


Heroku setup
    - database add-on
        JawsDB
            - connect to DB with MySQL Shell or terminal, run schemas and seeds
            - SQL GUI
    - environment variables
    - push app online

***Consider current deployment a pre-alpha
    - need to pull most current change and re-deploy with each revision to development branch
    - dev-ops is hard
    - heroku simplifies the deployment process; AWS allows more micromanagement


