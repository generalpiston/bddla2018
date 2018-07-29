var chalk = require('chalk');
var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, '..', 'build', 'app')));
app.use(express.static(path.join(__dirname, '..', 'web')));

app.listen(8000, function() {
  console.log(`${chalk.blue.bold.underline('Webserver started')} <8000>`);
});
