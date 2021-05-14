const mongoose = require('mongoose')
const User = require('../models/user')
const { parseQueryObj } = require('../helperFunctions')


// connect to db
const dbURI = 'mongodb+srv://emptystackdev:3jfXksAZegrwfMOv@cluster0.sivzb.mongodb.net/crud-app?retryWrites=true&w=majority'
const db = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })


// get users from database
const getUsers = (req, res) => {
  User.find({}) 
    .then((data) => {res.status(200).json({ message: "successful", data: data })})
    .catch((error) => {res.status(500).json({ error })})
}


// get users matching query
const getQueriedUsers = (req, res) => {
  const query = parseQueryObj(req.query)
  User.find(query)
    .then((data) => {res.status(200).json({ message: "successful", data: data })})
    .catch((error) => {res.status(500).json({ error })})
}


// get single user from database
const getUser = (req, res) => {
  const { id } = req.params
  User.findById(id)
    .then((data) => {res.status(200).json({ message: "successful", data: data })})
    .catch((error) => {res.status(500).json({ error })})
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
    .then((data) => {res.status(200).json({ message: "successful", data: data })})
    .catch((error) => {res.status(500).json({ error })})
} 


// update  user, patch user
const updateUser = (req, res) => {
  const { id } = req.params
  const { name, email, country } = req.body

  User.findById(id)
    .then((result) => {
      const oldDocument = result
      // assign values of old document to corresponding field if values for those field are null
      User.findOneAndUpdate({_id: id}, {
        name: name || oldDocument.name,
        email: email || oldDocument.email,
        country: country || oldDocument.country
      }, 
      { upsert: true, new: true, useFindAndModify: false  })
        .then((data) => {res.status(200).json({ message: "successful", data: data })})
    })
    .catch((error) => {res.status(500).json({ error})})
}


// delete user
const deleteUser = (req, res) => {
  const { id } = req.params
  User.findOneAndDelete({_id: id}, { useFindAndModify: false })
    .then((data) => {res.status(200).json({ message: "successful", data: data })})
    .catch((error) => {res.status(500).json({ error })})
}



module.exports = {
  db,
  getUsers,
  getQueriedUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
