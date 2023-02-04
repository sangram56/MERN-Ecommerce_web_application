const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

//Register user/////////////////////////////
exports.registerUser = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "EcommFullStackApp",
      width: 150,
      crop: "scale",
    });
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    //from jwtToken file
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//login user///////////////////////////////////////
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "plz enter the email or password" });
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(401).json({ msg: "invalid email or password" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ msg: "invalid email or password" });
    }
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//logout user//////////////////////////////////////////////////////
exports.logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ msg: "logged out succesfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//for reset password ////////////////////////////////
exports.resetPassword = async (req, res) => {
  //for password hashing
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(404).json({ msg: "invalid reset token" });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ msg: "password doesnot match" });
  }
  user.password = req.body.password;
  //changed in database
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  //from jwttoken file
  sendToken(user, 200, res);
};

//get loggedinuser details //////////////////////////////
exports.getUserDetails = async (req, res) => {
  try {
    //req.user from auth
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//update password ///////////////////////////////
exports.upatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return res.status(401).json({ msg: "old password is incorrect" });
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(401).json({ msg: "password doesnot matched" });
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//update user profile ////////////////////////////////// /
exports.upateProfile = async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "EcommFullStackApp",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    const user2 = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
    });
    res.status(200).json({ msg: user2 });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//for get single user details  -- admin  ////////////////////////////////
exports.getsingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(500).json({ msg: "user doesnot exist" });
    }
    res.status(200).json({ msg: user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//for get  users details  -- admin  ////////////////////////////////
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
