require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const massive = require('massive');
const ctrl = require('./controller');
const path = require('path'); //digital ocean hosting instructions from devmtn

const app = express(),
{SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET} = process.env;
    
app.use( express.static( `${__dirname}/../build` ) ) //digital ocean hosting instructions from devmtn
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

app.get('/api/current', ctrl.getUser);
app.get('/api/current/goals', ctrl.getGoals);

app.put('/api/goals/:email', ctrl.editGoals);

app.get('/api/getFoods', ctrl.getFoods);

app.post('/api/addFood/:id', ctrl.addFood);
app.delete('/api/deleteFood/:id', ctrl.deleteFood);




app.get('*', (req, res)=>{  //digital ocean hosting instructions from devmtn
    res.sendFile(path.join(__dirname, '../build/index.html'));
});