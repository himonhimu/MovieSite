const express = require('express')
const AdminUserController = require('../controller/AdminUserController')

const AdminUserRouter = express.Router()

// router.get('/', AdminUserController.) // get all user
// router.get('/:id', userFindOne) // get one user
AdminUserRouter.post('/add', AdminUserController.createAdminUser) // create new user
AdminUserRouter.post('/login', AdminUserController.adminUserLogin) // create new user
// router.post('/:id', updateUser) //update user data
// router.delete('/:id', deleteUser) // delete user data

module.exports = AdminUserRouter