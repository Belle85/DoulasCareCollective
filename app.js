const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path"); 
const { O_DIRECT } = require("constants");

const app = express();

//Static folder
app.use(express.static(path.join(__dirname,'public', 'newsletter.html')));

const PORT = process.env.port || 5000

app.listen(PORT, console.log(`Server started on ${PORT}`));