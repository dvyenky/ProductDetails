const product = require("../model/productModel");

// adding the new product
exports.insertProductItem = async (req, res) => {
  try {
    const { name, description, price, stockquantity } = req.body;
    const productData = { name, price, description, stockquantity };
    if (!name || !description || !price || !stockquantity) {
      return res.status(409).json({
        message: "Missing Required Field",
      });
    }
    const productdetails = await new product(productData).save();

    console.log(`New Product Added : ${productdetails._id}`);
    res.status(201).json({ productdetails });
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};

//  get all products
exports.getProductItem = async (req, res) => {
  try {
    const getProduct = await product.find();
    if (getProduct) {
      res.status(200).json({ message: getProduct });
    } else {
      res.status(409).json({
        message: "Empty Product",
      });
    }
  } catch (e) {
    res.status(500).json(`Failed to Fetch Data : ${error}`);
  }
};

//  get a particular product using its id
exports.getProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const productValue = await product.findById(productId);
    console.log("Product Details : ", productValue);
    if (productValue) {
      res.status(200).json({ message: productValue });
    } else {
      res.status(404).json({ message: "Product Not found" });
    }
  } catch (error) {
    res.status(500).json(`Failed to Fetch Single Data : ${error}`);
  }
};

// update the details of a specific product
exports.updateProductById = async (req, res) => {
  const productId = req.params.productId;
  const updates = req.body;
  console.log("Key : ", updates);
  try {
    const productFields = Object.keys(product.schema.paths);

    const keyValue = Object.keys(updates).filter(
      (key) => !productFields.includes(key)
    );
    if (keyValue.length > 0) {
      res.status(400).json({ message: "Invalid Fields" });
    }
    const result = await product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json(`Updated failed : ${error}`);
  }
};

// delete a product

exports.deleteProduct = async (req, res) => {
  try {
    const deleteAll = await product.deleteMany({});
    res.status(200).json({
      message: deleteAll,
    });
  } catch (error) {
    res.status(500).json(`"Failed to Delete! : ${error}`);
  }
};

// delete a product by its Id
exports.deleteProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await product.findByIdAndDelete(productId);
    res.status(200).json({
      message: deletedProduct._id,
    });
  } catch (error) {
    res.status(500).json(`"Failed to Delete! : ${error}`);
  }
};
