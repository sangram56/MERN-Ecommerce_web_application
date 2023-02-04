const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Product Name"],
  },
  description: {
    type: String,
    required: [true, "please Enter Product Description"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "please Enter Product price"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    // public id and url from cloudinary
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "please Enter Product category"],
    //we can use enum for category
  },

  Stock: {
    type: Number,
    required: [true, "please Enter Product stock"],
  },
  numofReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  //for know who created the object( like co-admin )
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", productSchema);
