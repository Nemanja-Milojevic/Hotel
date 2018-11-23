const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb://miloye:miloye11@ds155663.mlab.com:55663/hoteldb"

mongoose.connect(db, err => {
    if(err){
        console.error(err)
    }else{
        console.log('Connected to mongodb')
    }
})

router.post('/add', (req, res) => {
    let userData = req.body
    let user = new User(userData)

    user.save((err, registeredUser) => {
        if(err){
            console.log(err)
        }else{
            res.status(200).send(userData)
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error)
        }else if(!user){
            res.status(401).send('Wrong email or password')
        }else if(user.password !== userData.password){
            res.status(401).send('Wrong email or password')
        }else{
            res.status(200).send(user)
        }
    })
})

router.get('/getall', (req, res) => {
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