let mongoose = require("mongoose");

let customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
  },

  gender: {
      type: String,
      require: true,
      enum: ["Male", "Female"]
  },
  mobile:{
      type:Number,
      require:true

  },
  age:{
      type:Number,
      require:true

  },
  category:{
      type:String,
      enum:["Regular", "Gold", "Platinum"],
      default:"Regular"
  },
  email: {
      type: String,
      require: true,
      unique: true
  },
  password:{
      type:String,
      minlength: 8,
      require:true
  }
}, {timestamps:true})

module.exports = mongoose.model("Customer", customerSchema);