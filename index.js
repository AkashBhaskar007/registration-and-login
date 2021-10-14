const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv').config()
require('./dbcongif/mongocongfig');


const userrouter=require('./routes/userAuth')
app.use('/userAuth', userrouter);

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log('Error ', err);
    }
    console.log('Node.js is running at PORT',process.env.PORT)
})

