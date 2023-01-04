
const jwt = require("jsonwebtoken");
const customerModel = require("../models/customerModel");
const validator = require("../utils/validator");



/********************************************** AUTHENTICATION *******************************************/



const Authentication = function (req, res, next) {
  try {
    if(!req.headers.authorization) {
        return res.status(401).send({ status: false, message: "Missing authentication token in request " });
      }

    let token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.decode(token);
   
    if (!decoded) {
      return res.status(401).send({ status: false, message: "Invalid authentication token in request headers " })
    }
    if (Date.now() > (decoded.exp) * 1000) {
      return res.status(401).send({ status: false, message: "Session expired! Please login again " })
    }

    
    jwt.verify(token, "orderm@n@gement", function (err, decoded) {
      if (err) {
        return res.status(401).send({ status: false, message: "Invalid Token" });
      }
      else {
        req.customerId = decoded.customerId;
        return next();
      }
    });

  }
  catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};



/********************************************** AUTHORIZATION *******************************************/



const Authorization = async (req,res,next) =>{

  let customerId = req.body.customerId
  if(!validator.isValidObjectId(customerId)) return res.status(404).send({status: false,message: "customer Id not valid"})

  let customer = await customerModel.findById({_id:customerId})
  if(!customer)  return res.status(404).send({status: false,message: "customer Id not found"})

  if(customer._id.toString()!==req.customerId){
    return res.status(403).send({status: false,message: "Unauthorized access! customer's info doesn't match"})
  }
  next();
}

module.exports = {Authentication,Authorization}