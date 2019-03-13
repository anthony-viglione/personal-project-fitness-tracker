require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session');

const app = express(),
    {SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET} = process.env;

app.use(bodyParser.json());
app.use(sessions({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 8640000000 // 100 days
    }
}));

app.listen(SERVER_PORT, ()=>console.log(`Fitness Tracker Running on Port: ${SERVER_PORT}`))

