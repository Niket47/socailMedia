const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(username, password, "---username, password")

        if (!username || !password) {
            return res.status(400).json({
                message: "username and password required",
                success: false
            })
        }

        const existing = await userModel.findOne({ username })

        if (existing) {
            return res.status(409).json({
                message: "username already exists",
                success: false
            })
        }

        const user = await userModel.create({
            username,
            password: await bcrypt.hash(password, 10)
        })

        const token = await jwt.sign({ id: user._id }, "secret")

        res.status(201).json({
            message: "success",
            success: true,
            data: user,
            token: token
        })

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await userModel.findOne({ username })
        if (!user) {
            return res.status(404).json({
                message: "user not found",
                success: false
            })
        }
        const isPassword = await bcrypt.compare(user.password, password);
        if (isPassword) {
            return res.status(404).json({
                message: "user password incorrect",
                success: false
            })
        }
        const token = await jwt.sign({ id: user._id }, "secret")
        res.status(200).json({
            message: "success",
            success: true,
            data: user,
            token: token
        })

    } catch (error) {
        return error
    }
}


module.exports = {
    registerUser,
    login
}

