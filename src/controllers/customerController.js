const customerModel = require("../models/customerModel");
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
const { isValidBody, isValidstring, isValidEmail, isValidphone, isValidPassword } = require("../utils/validator");




/* +++++++++++++++++++++++++++++++++++++++++++++++++++++ Create Customer +++++++++++++++++++++++++++++++++++++++++++++++++++ */




const register = async (req, res) => {
    try {
        let data = req.body
        if (!isValidBody(data)) {
            return res.status(400).send({ status: false, mag: " Enter data in body" })
        }

        let { name, email, phone, age, password, gender, category } = data

        if (!name || !email|| !phone||!age ||!password|| !gender) {
            return res.status(400).send({ status: false, mag: "please fill all field properly" })
        }

        if (!isValidstring(name)) {
            return res.status(400).send({ status: false, mag: " name should be in onlyalphabate" })
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, mag: " invalid Email" })
        }

        let uniqueEmail = await customerModel.findOne({ email: email })
        if (uniqueEmail) {
            return res.status(422).send({ status: false, mag: " this email already exist" })
        }

        if (!isValidphone(phone)) {
            return res.status(400).send({ status: false, mag: " invalid phone" })
        }

        let arr = ["Male", "Female"]
        if (!arr.includes(gender)) {
            return res.status(400).send({ status: false, mag: " gender should be enum  Male or Female" })
        }
        if (category) {
            let array = ["Regular", "Gold", "Platinum"]
            if (!array.includes(category)) {
                return res.status(400).send({ status: false, mag: ` category should be enum  ["Regular", "Gold", "Platinum"] only` })
            }
        }
     
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: " password contain atleast one spacial character, Number, Alphabet, length should be 8 to 15 " })
        }

        data.password = bcrypt.hashSync(password, 10)

        let savedData = await customerModel.create(data)
        return res.status(201).send({ status: true, data: savedData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }


}



/* +++++++++++++++++++++++++++++++++++++++++++++++++++++ Login Customer +++++++++++++++++++++++++++++++++++++++++++++++++++ */



const login = async (req, res) => {
    try {
        let credentials = req.body

        let { userName, password } = credentials
        password = password.trim()
        userName = userName.trim()
        if (!isValidBody(credentials)) {
            return res.status(400).send({ status: false, msg: "Body should not be empty" })
        }
        if (!userName || !password) {
            return res.status(400).send({ status: false, msg: "Enter userName and password" })
        }

        let customer = await customerModel.findOne({ email: userName })
        if (!customer) {
            return res.status(400).send({ status: false, msg: "userName not exist" })
        }
        let valid = await bcrypt.compare(password, customer.password)
        if (!valid) {
            return res.status(201).send({ status: false, msg: " userName or password wrong" })
        }

        let token = jwt.sign({
            _id: customer._id.toString(),
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24  // 24 hours
        }, "orderManagement")

        res.setHeader("axe-api-key", token)

        credentials.token = token
        delete credentials.password
        return res.status(200).send({ status: true, msg: "Login successfully", data: credentials })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { register, login }