const express = require('express');
const app = express();
// const session = require('express-session');
const routes = require('./routes/index')
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(routes)

app.listen(PORT, ()=>{
    console.log(`Now listening on port ${PORT}`)
})