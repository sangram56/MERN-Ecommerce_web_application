const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plz enter your name "],
    maxlength: [20, "name should be 20 char less"],
    minlength: [2, "name must be greater than 2 charecters"],
  },
  email: {
    type: String,
    required: [true, "plz enter your email "],
    unique: true,
    validate: [validator.isEmail, "plz enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "plz enter your password"],
    minlength: [4, "password must be greater than 4 charecters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


//for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
userSchema.methods.comparePassword = async function (Epassword) {
  return await bcrypt.compare(Epassword, this.password);
};

module.exports = mongoose.model("users", userSchema);
