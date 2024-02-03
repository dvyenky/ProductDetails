const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config()

const secretKey = process.env.secretKey

//  Verify token middleware
exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization Token is required" });
    }
    const getToken = jwt.verify(token, secretKey);
    req.userId = getToken._id;
    next();
  } catch (err) {
    return res.status(403).send({ message: "Auth failed" });
  }
};
