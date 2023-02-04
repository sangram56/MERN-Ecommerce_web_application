const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//for create the product --Admin////////////////////////////
exports.createProduct = async (req, res) => {
  try {
    //for know who create a product
    //req.user from login auth
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "EcommFullStackApp",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//get all products/////////////////////////////////////////
exports.getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()

      .pagination(resultPerPage);
    let products = await apiFeature.query;
    res
      .status(200)
      .json({ success: true, products, productsCount, resultPerPage });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get All Product (Admin)
exports.getAdminProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

//get product details////////////////////////////////////////////
exports.getProductsDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({ msg: "product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Product -- Admin

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({ msg: "product not found" });
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "EcommFullStackApp",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

//Delete Product//////////////////////////////////////////////////////////
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({ msg: "product not found" });
    }
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    await product.remove();
    res.status(200).json({ success: true, msg: "product deleted " });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//create new review or update review //////////////////
exports.createProductReview = async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};
