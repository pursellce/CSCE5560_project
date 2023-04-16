// importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

//intializing expess.js

const app = ecpress();

//routes
//home route
app.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname,"public","Home.html"));
})

app.listen(3000,() => {
    console.log('listening on port 3000.......')
})