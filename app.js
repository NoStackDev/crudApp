const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const User = require('./models/user')


const app = express()

//connect to db
//const dbURI = 'mongodb+srv://emptystackdev:3jfXksAZegrwfMOv@cluster0.sivzb.mongodb.net/crud-app?retryWrites=true&w=majority'
const dbURI = 'mongodb://127.0.0.1:27017/test'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => { 
    console.log('connected to database') 

    //listen only after connection to database
    app.listen(5000, () => {
      console.log('server is up and running')
    })
  })
  .catch((err) => { console.log(err) })

//parse request payload
app.use(express.urlencoded({ extended:false }))
//parse json
app.use(express.json())

//get all users
app.get('/users', (req, res) => {
  User.find({}) 
    .then((result) => {res.json({ message: "successful", data: [result] })})
    .catch((err) => {res.json({ message: "unsuccessful", error: err })})
})

//get single user
app.get('/users/:id', (req, res) => {
  const { id } = req.params
  User.findById(id)
    .then((result) => {res.json({ message: "successful", data: [result] })})
    .catch((err) => {res.json({ message: "unsuccessful", error: err })})
})

//add single user
app.post('/users', (req, res) => {
  const { name, email, country } = req.body
  const user = new User({
    name: name,
    email: email,
    country: country
  })
  user.save()
    .then((result) => {res.json({ message: "successful", data: [result] })})
    .catch((err) => {res.json({ message: "unsuccessful", error: err })})
}) 

//update single user
app.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { name, email, country } = req.body
  User.findOneAndUpdate({_id: id}, {
    name: name,
    email: email,
    country: country
  }, 
    { upsert: true, new: true, useFindAndModify: false  })
    .then((result) => {res.json({ message: "successful", data: [result] })})
    .catch((err) => {res.json({ message: "unsuccessful", error: err })})
})

//delete single user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  User.findOneAndDelete({_id: id}, { useFindAndModify: false })
    .then((result) => {res.json({ message: "successful", data: [result] })})
    .catch((err) => {res.json({ message: "unsuccesful", error: err })})
})
