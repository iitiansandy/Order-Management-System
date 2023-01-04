const mongoose = require("mongoose")
const orderModel = require("../models/orderModel");
const customerModel = require("../models/customerModel");
const cron = require("node-cron");



/* +++++++++++++++++++++++++++++++++++++++++++++++++++++ Create Order +++++++++++++++++++++++++++++++++++++++++++++++++++ */



const createOrder = async (req, res) => {
    try {
        let data = req.body
        await orderModel.updateMany()
        let { customerId, price, product } = data
        if (!customerId || !price || !product) {
            return res.status(400).json({ status: false, msg: "Please fill all field properly" })
        }
        if (!mongoose.isValidObjectId(customerId)) {
            return res.status(400).send({ status: false, msg: "invalid customerid" })
        }

        let existCustomer = await customerModel.findById({ _id: customerId })
        if (!existCustomer) {
            return res.status(400).send({ status: false, msg: "Customer not exist" })
        }

        let discount = 0
        // let catageroy= "Regular"

        let numberOfOrders = await orderModel.find({ customerId: data.customerId })
        let totalOrder = numberOfOrders.length + 1
        //console.log(totalOrder)

        data.totalOrder = totalOrder
        //console.log(data)

        if (totalOrder == 9) {
            // Alert.AlertGold()    // informing customer they are getting Gold membership
            cron.schedule('* * * * *', () => {
                console.log(" HURRRAYYY!!!!   You have only one order left to become GOLD customer!!! Hurry up and get 10% discount on every order ")
            })
        }

        if (totalOrder == 10) {
            await customerModel.findOneAndUpdate({ _id: data.customerId }, {  category: "Gold" }, { new: true })
        }

        if (totalOrder > 10 && totalOrder < 20) {
            discount = price * 10 / 100
            price = price - discount
        }
        if (totalOrder == 19) {
            // Alert.AlertPlatinum()

            cron.schedule('* * * * *', () => {
                console.log(" HURRRAYYY!!!!   You have only one order left to become PLATINUM customer!!! Hurry up and get 20% discount on every order ")
            })

        }

        if (totalOrder == 20) {
            await customerModel.findOneAndUpdate({ _id: data.customerId }, { category: "platinum" }, { new: true })
        }
        if (totalOrder > 20) {
            discount = price * 20 / 100
            price = price - discount
        }
        data.discount = discount
        data.price = price

        let order = await orderModel.create(data)
        return res.status(201).send({ status: true, data: order })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = { createOrder }
