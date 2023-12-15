const db = require("../models");

const getCategories = async () => {
  try {
    const categories = await db.Category.findAll();
    return categories;
  } catch (err) {
    console.log("Error at handlers/getCategories: ", err);
    return null;
  }
};

const getCategory = async (id) => {
  try {
    const category = await db.Category.findByPk(id);
    return category;
  } catch (err) {
    console.log("Error at handlers/getCategory: ", err);
    return null;
  }
};

const editCategory = async (categoryId, newCategoryData) => {
  try {
    let categoryData = await db.Category.findByPk(categoryId);
    if (!categoryData) {
      return {
        message:
          "Can not edit: category with id " +
          categoryId +
          " does not exist.",
      };
    }
    for (var prop in newCategoryData) {
      if (newCategoryData[prop]) {
        categoryData[prop] = newCategoryData[prop];
      }
    }
    res = await categoryData.save();
    return categoryData;
  } catch (err) {
    console.log("Error at handlers/editCategory:", err);
    return {
      message: err,
      obj: null,
    };
  }
};

const createCategory = async (categoryData) => {
  try {
    const category = await db.Category.findOne({
      where: {
        name: categoryData.name,
      },
    });

    if (category) {
      return {
        message: "This category already exists!",
      };
    }

    const newCategory = await db.Category.create(categoryData);
    return newCategory;
  } catch (err) {
    console.log("Error at handlers/createCategory:", err);
    return err;
  }
};

const destroyCategory = async (id) => {
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      return {
        message: "This category does not exist!",
      };
    }
    res = await db.Category.destroy({
      where: {
        id: category.id,
      },
    });

    return {
      message: "The category has been deleted successfully!",
    };
  } catch (err) {
    console.log("Error at handlers/removeCategory:", err);
    return null;
  }
};

module.exports = {
  getCategories,
  getCategory,
  editCategory,
  destroyCategory,
  createCategory,
};
