const express = require("express");

const route = express.Router();

//  controller
const {
  insertProductItem,
  getProductItem,
  getProductById,
  updateProductById,
  deleteProduct,
  deleteProductById,
} = require("../controller/productController");

const { register, login } = require("../controller/userController");

const { authenticateUser } = require("../middleware/authentication");


// API for user registration and login
route.post("/register", register);
route.post("/login", login);

// Implemented authentication middleware to protect the API, allowing only authenticated users to perform write operations (create, update, delete).
// Create endpoints to add a new product, retrieve all products, retrieve a single product by ID, update a product, and delete a product
route.post("/addproduct", authenticateUser, insertProductItem);
route.get("/product", getProductItem);
route.get("/product/:productId", getProductById);
route.put("/updateproduct/:productId", authenticateUser, updateProductById);
route.delete("/deleteproduct", authenticateUser, deleteProduct);
route.delete("/deleteproduct/:productId", authenticateUser, deleteProductById);

module.exports = route;
