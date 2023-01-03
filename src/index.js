const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const route = require("./routes/routes.js")
const app = express();
app.use(multer().any());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://dbuser:S%40ndy19891@cluster0.dl1os.mongodb.net/Order-Management",
                    { useNewUrlParser: true})
.then(()=>console.log("Successfully Connected with MongoDB"))
.catch((err)=>console.log(err))

app.use("/",route);

const port=3000;

app.listen(process.env.PORT || port, ()=>console.log("Server started on port",process.env.PORT || port));


