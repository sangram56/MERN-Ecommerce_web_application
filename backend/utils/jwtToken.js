//creating token and save in cookie

sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //for cookie
  const options = {
    httpOnly: true,
    exprires: new Date(
      Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  res.status(statusCode).cookie("token", token, options).json({
    user,
    token,
  });
};

module.exports = sendToken;
