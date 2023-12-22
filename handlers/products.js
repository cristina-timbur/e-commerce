const db = require("../models");

const getProducts = async () => {
  try {
    const products = await db.Product.findAll();
    return products;
  } catch (err) {
    console.log("Error at handlers/getProducts: ", err);
    return null;
  }
};

const getAvailableProducts = async () => {
  try {
    const products = await db.Product.findAll({
      where: {
        isAvailable: true,
      },
    });
    return products;
  } catch (err) {
    console.log("Error at handlers/getAvailableProducts: ", err);
    return null;
  }
};

const getProduct = async (id) => {
  try {
    const product = await db.Product.findByPk(id);
    return product;
  } catch (err) {
    console.log("Error at handlers/getProduct: ", err);
    return null;
  }
};

const editProduct = async (productId, newProductData) => {
  try {
    let productData = await db.Product.findByPk(productId);

    if (!productData) {
      return {
        message: "The product with id " + productId + " does not exist. Nothing to edit.",
      };
    }
    for (var prop in newProductData) {
      if (newProductData[prop]) {
        productData[prop] = newProductData[prop];
      }
    }
    res = await productData.save();
    return productData;
  } catch (err) {
    console.log("Error at handlers/editProduct:", err);
    return {
      message: err,
      obj: null,
    };
  }
};

const createProduct = async (productData) => {
  try {
    if (productData.CategoryId) {
      const category = await db.Category.findByPk(productData.CategoryId);
      console.log(category);
      if (!category) {
        return {
          message: "The category ID is not valid!",
        };
      }
    }
    
    const newProduct = await db.Product.create(productData);
    return newProduct;
  } catch (err) {
    console.log("Error at handlers/createProduct:", err);
    return err;
  }
};

const destroyProduct = async (id) => {
  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      return {
        message: "This product does not exist!",
      };
    }
    res = await db.Product.destroy({
      where: {
        id: product.id,
      },
    });

    return {
      message: "The product was deleted successfully!",
    };
  } catch (err) {
    console.log("Error at handlers/removeProduct:", err);
    return null;
  }
};

module.exports = {
  getProducts,
  getAvailableProducts,
  getProduct,
  createProduct,
  destroyProduct,
  editProduct
};
