const mongoose = require('mongoose')
const User = require('../models/user')


// connect to db
 const dbURI = 'mongodb+srv://emptystackdev:3jfXksAZegrwfMOv@cluster0.sivzb.mongodb.net/crud-app?retryWrites=true&w=majority'
//const dbURI = 'mongodb://127.0.0.1:27017/test'
const db = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

// get users from database
const getUsers = (req, res) => {
  User.find({}) 
    .then((data) => {res.json({ message: "successful", data: data })})
    .catch((error) => {res.json({ error })})
}


// get single user from database
const getUser = (req, res) => {
  const { id } = req.params
  User.findById(id)
    .then((data) => {res.json({ message: "successful", data: data })})
    .catch((error) => {res.json({ error })})
}


// create  user
const createUser = (req, res) => {
  const { name, email, country } = req.body
  const user = new User({
    name: name,
    email: email,
    country: country
  })
  user.save()
    .then((data) => {res.json({ message: "successful", data: data })})
    .catch((error) => {res.json({ error })})
} 


// update  user
const updateUser = (req, res) => {
  const { id } = req.params
  const { name, email, country } = req.body
  User.findOneAndUpdate({_id: id}, {
    name: name,
    email: email,
    country: country
  }, 
    { upsert: true, new: true, useFindAndModify: false  })
    .then((data) => {res.json({ message: "successful", data: data })})
    .catch((error) => {res.json({ error })})
}


// delete user
const deleteUser = (req, res) => {
  const { id } = req.params
  User.findOneAndDelete({_id: id}, { useFindAndModify: false })
    .then((data) => {res.json({ message: "successful", data: data })})
    .catch((error) => {res.json({ error })})
}



module.exports = {
  db,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
