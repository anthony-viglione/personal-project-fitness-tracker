require('dotenv').config()
const express = require('express')

const app = express(),
    {SERVER_PORT,
    CONNECTION_STRING} = process.env;

app.listen(SERVER_PORT, ()=>console.log(`Fitness Tracker Running on Port: ${SERVER_PORT}`))