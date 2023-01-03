const orderModel = require("../models/orderModel");
const validator = require("../utils/validator");
const customerModel = require("../models/customerModel");


const createOrder = async (req, res) => {
  try {
    let data = req.body;

    if (!validator.isValidRequest(data)) return res.status(400).send({ status: false, message: "Body can not be empty" });
    let { customerId, orderNumber, totalPrice } = data;

    let customerIdData=await customerModel.findOne({_id:customerId});
    if(customerIdData.length==0){
        return res.status(404).send({ status: false, message: "No customer Found" });
      }

      if(isNaN(orderNumber) || orderNumber<=0){
        return res.status(400).send({ status: false, message: "Enter a valid number of orders" });
      }

    if(isNaN(totalPrice) || totalPrice<=0){
        return res.status(400).send({ status: false, message: "Enter valid price" });
      }
      let discount=0;
      let category ="Regular";
      let totalOrders = customerIdData.totalOrders
      
      totalOrders=Number(totalOrders)+Number(orderNumber)
      
      if(totalOrders<10){
        discount = 0 ;
        totalPrice=totalPrice;
      }
      else if(totalOrders>=10 && totalOrders<20){
        discount = (totalPrice*10)/100;
        category='Gold';
        totalPrice = (totalPrice*90)/100;
      }
      else{
        discount = (totalPrice*20)/100;
        category='Platinum'
        totalPrice = (totalPrice*80)/100;
      }


      await customerModel.findByIdAndUpdate({_id:customerIdData._id},{$set:{category,totalOrders:(Number(totalOrders))},discount:Number(customerIdData.discount)+Number(discount),});

      data.discount=discount;
      let orderData = await orderModel.create(data);
      return res.status(201).send({status:true,message:orderData})
  }
  catch (err)
    {
      return res.status(500).send({ status: false, message: "Error occcured : " + err });
    }
}

module.exports={createOrder}