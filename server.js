var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var user = require('./routes/user');
var userType = require('./routes/specificUser');


var app = express();
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });
 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', user);
app.use('/api', userType);
app.listen(3000, () => {
    console.log('Starting on port 3000')
})



// module.exports = {app}