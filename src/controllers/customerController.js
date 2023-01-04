const customerModel = require("../models/customerModel");
const validator = require("../utils/validator");
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");



/* +++++++++++++++++++++++++++++++++++++++++++++++++++++ Create Customer +++++++++++++++++++++++++++++++++++++++++++++++++++ */



const register = async (req, res) => {
  try {
    let data = req.body;

    // VALIDATIONS STARTS
    if (!validator.isValidRequest(data)) return res.status(400).send({ status: false, message: "Body can not be empty" });

    let { name, email, phone, password } = data;

    if (!validator.isValidValue(name)) return res.status(400).send({ status: false, message: "Name is required" });

    if (!validator.isValidName(name)) return res.status(400).send({status: false,message:"Name may contain only letters. Digits & Spaces are not allowed "});


    if (!validator.isValidValue(email)) return res.status(400).send({ status: false, message: "Email is required" });

    if (!validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "Entered email is invalid" });

    let emailExist = await customerModel.findOne({ email });
    if (emailExist) return res.status(400).send({ status: false, message: "This email already exists" });

    if (!validator.isValidValue(phone)) return res.status(400).send({ status: false, message: "Phone is required" });

    if (!validator.isValidPhone(phone)) return res.status(400).send({ status: false, message: "Entered phone number is invalid" });

    let phoneExist = await customerModel.findOne({ phone });
    if (phoneExist) return res.status(400).send({ status: false, message: "Phone number already exists" });

    if (!validator.isValidValue(password)) {
      return res.status(400).send({ status: false, message: "password is required" });
    }

    if (password.length < 8 || password.length > 15) return res.status(400).send({status: false, message: "password length should be between 8 to 15"});

    data.password = bcrypt.hashSync(password,10);
    data.totalOrders=0;
    data.discount=0;
    let savedData = await customerModel.create(data);
    savedData=savedData.toObject()
    delete savedData.password
    return res.status(201).send({ status: true, message: "Data created", Data: savedData });
  } 
  catch (err) {
    {
      return res.status(500).send({ status: false, message: "Error occcured : " + err });
    }
  }
};



/* +++++++++++++++++++++++++++++++++++++++++++++++++++++ Login Customer +++++++++++++++++++++++++++++++++++++++++++++++++++ */



let login = async (req, res) => {
  try {
    let data = req.body;
    const { email, password } = data;

    if (!validator.isValidRequest(data)) return res.status(400).send({ status: false, message:"Enter email & password"});

    if (!validator.isValidValue(email)) return res.status(400).send({ status: false, messgage: "Enter Email" });
    let checkemail = await customerModel.findOne({ email: email });
    if (!checkemail) return res.status(404).send({ status: false, message: "Email not found" });

    if (!validator.isValidValue(password)) return res.status(400).send({ status: false, messsge: "Enter Password"});
    // Load hash from your password DB.
    let decryptPassword = await bcrypt.compare(password, checkemail.password);
    if (!decryptPassword) return res.status(401).send({ status: false, message: "Password is not correct" });

    //GENERATE TOKEN
    let date = Date.now();
    let createTime = Math.floor(date / 1000);
    let expTime = createTime + 30000;

    let token = jwt.sign(
      {
        customerId: checkemail._id.toString(),
        iat: createTime,
        exp: expTime,
      },
      "GaragePlug"
    );

    res.setHeader("x-api-key", token);
    return res.status(200).send({status: true,message: "Login successful",data:{ customerId: checkemail._id, token: token}});
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};


module.exports ={register,login}