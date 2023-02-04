const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsDetails,
  createProductReview,
  getProductReviews,
  deleteReviews,
  getAdminProducts,
} = require("../controllers/productController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAdminProducts);

router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router.route("/product/:id").get(getProductsDetails);

router.route("/reviews").put(isAuthenticatedUser, createProductReview);

module.exports = router;
