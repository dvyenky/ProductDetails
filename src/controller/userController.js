const user = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.secretKey;

//  Register a new User
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Required Field is missing",
      });
    }
    // check if the user already exists in the database or not
    let existingUser = await user.findOne({ email: email });
    const hashPassword = await bcrypt.hash(password, 10);
    if (existingUser) {
      return res.status(409).json({
        message: "Email address already registered.",
      });
    } else {
      const newUser = new user({
        username: username,
        email: email,
        password: hashPassword,
      });
      await newUser.save();
      res.status(201).send({
        message: "User has been created successfully!",
      });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

//  Login an Existing User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userName = await user.findOne({ email });
    if (!userName) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const validPass = await bcrypt.compare(password, userName.password);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ _id: userName._id }, secretKey, {
      expiresIn: "1d",
    });
    res.status(200).json({
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
