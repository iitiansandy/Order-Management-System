const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    customerId: { type: ObjectId, required: true, ref: 'User' },
    orderNumber: {type:Number,required:true},
    totalPrice: { type: Number, required: true },
    discount:{ type: Number}
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema);