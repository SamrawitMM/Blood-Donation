var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var {mongoose} = require('./db/mongoose');
// var {Todo} = require('./models/todo');
var {User} = require('./models/user')
var {authenticate} = require('./middleware/authenticate')
var {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')


var app = express();
 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.post('/admin', (req, res) => {
    var body = _.pick(req.body, ['email', 'password','firstName', 'lastName', 'phoneNo', 'age', 'sex','address']);
    var user = new User(body);

    user.save().then((user) => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e)
    })
}) 


app.get('/admin/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.post('/admin/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
            
        })
    }).catch((e) => {
        res.status(400).send();
    })
    
    
})
app.listen(3000, () => {
    console.log('Starting on port 3000')
})



module.exports = {app}