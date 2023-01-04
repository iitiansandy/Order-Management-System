const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    customerId:{
        type: ObjectId,
        ref: "customer"
    },
    product:{
        type:String,
        require:true
    },
    price:{
        type:Number,

    },
    totalOrder:{
        type:Number
    },
    discount:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports = mongoose.model('Order', orderSchema);