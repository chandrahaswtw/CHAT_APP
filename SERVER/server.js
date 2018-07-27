const express = require('express');
const hbs = require('hbs');
const path = require('path')

const app = express();
const static_filepath = path.join(__dirname + './../PUBLIC');
const port = process.env.PORT || '3000';


app.set('view engine','hbs');
app.use(express.static(__dirname + './../PUBLIC'));

app.listen(port,()=>{console.log('THE APP STARTED ON PORT 3000')});
