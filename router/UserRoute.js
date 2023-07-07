const express = require('express')
const UserController = require('../controller/UserController')

const UserRouter = express.Router()

UserRouter.post('/add', UserController.createUser) // create new user
UserRouter.post('/login', UserController.UserLogin) // create new user
UserRouter.put('/:id', UserController.updateUser) //update user data


module.exports = UserRouter