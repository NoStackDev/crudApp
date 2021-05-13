const express = require('express')

const {
  getUsers,
  getQueriedUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/controller-user.js')

const router = express.Router()

router.route('/query').get(getQueriedUsers)
router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)


module.exports = router
