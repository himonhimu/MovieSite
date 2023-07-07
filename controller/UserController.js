const EncryptDecrypt = require('../config/encryptDecrypt');
const UserSchema = require('../model/UserModel')
const jwt = require('jsonwebtoken')
class UserController {
    static createUser = async (req, res) => {
        try {
            const newUser = new UserSchema({
                user_name: req.body.user_name,
                password: await EncryptDecrypt.encrypt(req.body.password),
                role: req.body.role || 2,
                name: req.body.name,
                dob: req.body.dob,
                email: req.body.email,
            })
            await newUser.save()
            res.status(201).json(newUser)
        } catch (error) {
            res.send({ message: error.message })
        }
    }

    static checkUserExist = async (user_name) => {
        try {         
            let user = await UserSchema.findOne({ user_name: user_name })
            if (!user) return 0
            return 1
            
        } catch (error) {
        }
    }

    static UserLogin = async (req, res) => {
        try {
            let user_name = req.body.user_name
            let password = req.body.password
            let user = await UserSchema.findOne({ user_name: user_name })
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

    static updateUser = async (req, res) => {
        try {
            let id = req.params.id
            let user = await UserSchema.findOne({ '_id': id })
            user.name = req.body.name
            user.password = req.body.password ? await EncryptDecrypt.encrypt(req.body.password) : user.password
            user.dob = req.body.dob || user.dob
            user.email = req.body.email || user.email
            await user.save()
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = UserController