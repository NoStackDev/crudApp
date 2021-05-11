const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const User = require('./models/user')


const app = express()

//connect to db
const dbURI = 'mongodb+srv://emptystackdev:3jfXksAZegrwfMOv@cluster0.sivzb.mongodb.net/crud-app?retryWrites=true&w=majority'
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

app.get('/users', (req, res) => {
  User.find({}) 
    .then((result) => {
      res.json({ message: "successful", data: [result] })
    })
    .catch((err) => {
      res.json({ message: "unsucceful", error: err })
    })
})

app.post('/users', (req, res) => {
  const user = User({
    name: 'User4',
    email: 'User4@email.com',
    country: 'Country4'
  })
  user.save()
    .then((result) => {
      res.json({message: "successful", data: [result]})
    })
    .catch((err) => {
      res.json({message: "unsuccessful", error: err})
    })
}) 
