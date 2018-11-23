const express = require('express')
const jwt = require('jsonwebtoken') //npm install jsonwebtoken --save
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose') //npm install --save mongoose
const bcrypt = require('bcrypt') //npm install bcrypt --save
const path = require('path')
const db = "mongodb://miloye:miloye11@ds155663.mlab.com:55663/hoteldb"
const key = "asjbfa..6sofgb--+nadsg55.4165.41654gw5bv1*/45c1b5"

mongoose.connect(db, err => {
    if(err){
        console.error(err)
    }else{
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, key)
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', function (req, res) {
    res.render(path.join(__dirname + '../../dist/ngApp/index.html'));
  });

router.post('/add', (req, res) => {
    let user = new User()

    user.name = req.body.name
    user.surname = req.body.surname
    user.email = req.body.email
    user.password = req.body.password

    let hash = bcrypt.hashSync(user.password, 10)

    user.password = hash

    user.save((err, registeredUser) => {
        if(err){
            console.log(err)
        }else{
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, key)
            res.status(200).send({token})   //userData without token
        }
    })
})

router.post('/login', (req, res) => {
    let userData = new User()

    userData.email = req.body.email
    userData.password = req.body.password

    let hash = bcrypt.hashSync(userData.password, 10)

    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error)
        }else if(!user){
            res.status(401).send('Wrong email or password')
        }else if(bcrypt.compareSync(user.password, hash)){
            res.status(401).send('Wrong email or password')
        }else{
            let payload = {subject: user._id}
            let token = jwt.sign(payload, key)
            res.status(200).send({token})
        }
    })
})

router.get('/getall',verifyToken, (req, res) => {
    User.find({}, (err, registeredUsers) => {
        if(err){
            console.log(err)
        }else{
            res.status(200).send(registeredUsers)
        }
    })
})

router.delete('/:id/delete', (req, res) => {
    User.findByIdAndDelete(req.params.id, err => {
        if(err){
            console.log(err)
        }else{
            res.send(`User id=${req.params.id} deleted`)
        }
    })
})

router.put('/:id/update', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, err => {
        if(err){
            console.log(err)
        }else{
            res.send(`User id=${req.params.id} updated`)
        }
    })
})

module.exports = router