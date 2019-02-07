# About AcceptMyCrypto
*The purpose of the app is for cryptocurrencies holders to find and purchase deals that match to the cryptocurrencies that they're interested or owned.*

## API
*AcceptMyCrypto uses coinmarketcap api to get crypto info shown below*
* Name
* Symbol
* Price
* Logo
* Website URL

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
2. SOURCE seeds_venues.sql
3. Run the app
4. SOURCE seeds_cryptos-venues.sql
5. SOURCE seeds_category.sql
6. SOURCE seeds_deals.sql
7. Run the app again