require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const massive = require('massive');
const ctrl = require('./controller');

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

massive(CONNECTION_STRING).then(db => {
    app.set('db',db);
    console.log('database connected')
    app.listen(SERVER_PORT, ()=>console.log(`Fitness Tracker Running on Port: ${SERVER_PORT}`))
})

app.post('/auth/register', ctrl.register);
app.post('/auth/login',ctrl.login);
app.post('/auth/logout',ctrl.logout);

app.get('/api/current', ctrl.getUser)