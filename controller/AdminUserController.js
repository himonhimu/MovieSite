const EncryptDecrypt = require('../config/encryptDecrypt');
const AdminUserSchema = require('../model/AdminUserModel')

class AdminUserController {

    static createAdminUser = async (req, res) => {
        // res.send('hello')
        try {
            const newUser = new AdminUserSchema({
                user_name: req.body.user_name,
                password: await EncryptDecrypt.encrypt(req.body.password),
                role: req.body.role || 1,
                name: req.body.name,
            })
            await newUser.save()
            res.status(201).json(newUser)
        } catch (error) {
            res.send({ message: error.message })
        }
    }
    static adminUserLogin = async (req, res) => {
        try {
            let user_name = req.body.user_name
            let password = req.body.password
            let user = await AdminUserSchema.findOne({ user_name: user_name })
            let isMatch = false
            if (user) {
                isMatch = await EncryptDecrypt.matchPassword(password, user.password)
            }
            if (isMatch) {
                res.status(200).send(user)
            } else {
                res.send({ message: 'user name or password is incorrect' })
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    static adminUserFindOne = async (req, res) => {
        try {
            let id = req.params.id
            let user = await AdminUserSchema.findOne({ '_id': id })
            res.status(200).send(user)
            // res.send('find one user')
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    static adminUserFindAll = async (req, res) => {
        try {
            let user = await AdminUserSchema.find()
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    static updateAdminUser = async (req, res) => {
        try {
            let id = req.params.id
            let user = await AdminUserSchema.findOne({ '_id': id })
            user.name = req.body.name
            user.age = req.body.age
            user.address = req.body.address
            await user.save()
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error.message)
        }

    }
    static deleteAdminUser = async (req, res) => {
        try {
            let id = req.params.id
            await AdminUserSchema.deleteOne({ '_id': id })
            res.status(200).send('user deleted successfully')
            // res.send('find one user')
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = AdminUserController