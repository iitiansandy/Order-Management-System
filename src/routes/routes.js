const express = require('express')
const router = express.Router()
const customerController = require("../controllers/customerController")
const orderController = require("../controllers/orderController")
const Authentication = require('../middleware/auth').Authentication
const Authorization = require('../middleware/auth').Authorization

// customer's APIs ->
router.post("/register", customerController.register)
router.post("/login", customerController.login)

router.post("/createOrder",Authentication,Authorization, orderController.createOrder)


module.exports = router