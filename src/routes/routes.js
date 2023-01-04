const express = require('express')
const router = express.Router()
const customerController = require("../controllers/customerController")
const orderController = require("../controllers/orderController")
// const Authentication = require('../middleware/auth').Authentication
// const Authorization = require('../middleware/auth').Authorization

// Customer's APIs ->
router.post("/register", customerController.register)
router.post("/login", customerController.login)

// Order API
router.post("/createOrder", orderController.createOrder)


module.exports = router