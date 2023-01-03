let mongoose = require("mongoose");

let customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true ,trim:true},
    category:{type:String,default:"Regular",enum:['Regular','Gold','Platinum']},
    email: { type: String, required: true, unique: true,trim:true },
    phone: { type: String, required: true, unique: true ,trim:true},
    password: { type: String, required: true },
    totalOrders :{type:Number},
    discount:{type:Number}
  },
  { timestamps: true ,versionKey:false}
);

module.exports = mongoose.model("Customer", customerSchema);