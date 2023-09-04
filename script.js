const express = require('express');
const session = require('express-session');
const app = express();
const  {connectMongoDb} =require('./connection');
const routes = require('./routes');
const env = require('dotenv')
env.config()

app.set('view engine','ejs');
app.use(express.static("views"));
app.use(express.static(__dirname));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));



//url pass connection
connectMongoDb("mongodb://127.0.0.1:27017/userdb");

const oneDay = 1000 * 60 * 60 * 24;
//configuring express session
app.use(session({
    secret: 'your_secret_key', // Change this to a strong, random key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:oneDay}
  }));
  


  
app.use('/',routes);

app.listen(5000, () => {
    console.log('Server is running at :',5000);
});