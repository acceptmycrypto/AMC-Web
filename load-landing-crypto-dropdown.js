require("dotenv").config();
var mysql = require("mysql");
var express = require("express");
var request = require("request");
var app = express();

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "crypto_db"
});



var dropdownSettings = {
    method: "GET",
    url: "https://api.coinmarketcap.com/v2/ticker/?limit=100&structure=array",
    headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKET_API_KEY,
        Accept: "application/json"
    }
};

async function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var cryptoNames = "";
        var res = JSON.parse(body);
        var resData = res.data; 
        for (var i in resData){  
            cryptoNames += await  "('" + resData[i].name + "','" + resData[i].symbol  + "'),"; 
            
        }
        // take off the last comma since we added one after each value
        //cryptoNames = ('Bitcoin','BTC'),('XRP','XRP'),('Ethereum','ETH'),('Bitcoin Cash','BCH'),...
        cryptoNames = await cryptoNames.substr(0,cryptoNames.length-1); 
        
        var cryptoQuery = 'INSERT INTO landing_cryptos (crypto_name, crypto_symbol) VALUES ' + cryptoNames;
        await connection.query(cryptoQuery, function (error, results, fields) {
            if (error) throw error;
//             console.log(results);
            process.exit();
        });
        
    }
    else{
        console.log(error);
        process.exit();
    }
    }

request(dropdownSettings, callback);







