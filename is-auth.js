const jwt = require("jsonwebtoken");
const { config } = require("../../config/index");
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1]; // Authorization Bearer
  console.log("authorization header :", token);

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  req.isAdmin = decodedToken.isAdmin;
  req.isSuperAdmin = decodedToken.isSuperAdmin;
  console.log("userId inside userId", decodedToken);
  next();
};
