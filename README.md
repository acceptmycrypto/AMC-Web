# About AcceptMyCrypto
*AcceptMyCrypto provides a marketplace for individuals to buy and sell items for a discount in cryptocurrencies.*

## App Structure
### Backend
*THe backend app is structured as MVC or Model View Controller*
* Model is the connection to the MySQL db.
* View are the routes that connect and return JSON data. (note: the view folder is called routes)
* Controller are the functions that get data from the model and feed to the view
### Frontend
*The frontend app is a react app*

## Venues
*AcceptMyCrypto doesn't rely on any third party API to get the venues data set. All data regarding venues are manually inserted by the team.*
*Two ways we come up with the venues data*
* Team does marketing research and submit manually
* Users submitting prospective venues to us. We verified and submit manually.

## Run the server and client concurrently
```
npm run dev
```
## Run Schema/ Seeds files:
1. SOURCE schema.sql
2. SOURCE seeds_category.sql
3. Run the app
4. SOURCE seeds_deals.sql
