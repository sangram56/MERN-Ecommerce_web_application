const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,

  resetPassword,
  getUserDetails,
  upatePassword,
  upateProfile,
  getAllUser,
  getsingleUser,
  upateUserRole,
  deleteProfile,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/reset/token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, upatePassword);
router.route("/me/update").put(isAuthenticatedUser, upateProfile);
router
  .route("/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUser);
router
  .route("/user/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getsingleUser);

module.exports = router;
