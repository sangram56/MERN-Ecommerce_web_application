const express = require("express");
const app = express();
const bodyParse=require('body-parser');
const dotenv = require("dotenv");
const fileUpload=require('express-fileupload');
const cookieParser=require('cookie-parser');
const cors=require('cors');
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(fileUpload());
dotenv.config({ path: "backend/config/config.env" });

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order=require('./routes/orderRoute')
const payment=require('./routes/paymentRoute')



//for routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use('/api/v1', order)
app.use('/api/v1', payment)

module.exports = app;
