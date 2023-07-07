const EncryptDecrypt = require('../config/encryptDecrypt');
const AdminUserSchema = require('../model/AdminUserModel')
const jwt = require('jsonwebtoken')
class AdminUserController {

    static createAdminUser = async (req, res) => {
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
    static checkAdminExist = async (user_name) => {
        try {         
            let user = await AdminUserSchema.findOne({ user_name: user_name })
            if (!user) return 0
            return 1
            
        } catch (error) {
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
                const datatoSend = {user_name:user_name, name:user.name, role:user.role}
                 const accessToken = jwt.sign(datatoSend, process.env.ACCESS_TOKEN)
                res.send({accessToken:accessToken})
            } else {
                res.send({ message: 'user name or password is incorrect' })
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    static updateAdminUser = async (req, res) => {
        try {
            let id = req.params.id
            let user = await AdminUserSchema.findOne({ '_id': id })
            user.name = req.body.name || user.name
            user.password = req.body.password ? await EncryptDecrypt.encrypt(req.body.password) : user.password
            await user.save()
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error.message)
        }

    }

}

module.exports = AdminUserController