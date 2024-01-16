const db = require("../models");

const getProductReviews = async () => {
  try {
    const reviews = await db.Review.findAll();
    return reviews;
  } catch (error) {
    console.log("Error at handlers/getProductReviews: ", err);
    return null;
  }
};

const getUserReviewsWithId = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    const reviews = await user.getReviews();
    return reviews;
  } catch (err) {
    console.log("Error at handlers/getUserReviewsWithId: ", err);
    return null;
  }
};

const createProductReview = async (userId, productId, rating, comment) => {
  try {
    const user = await db.User.findByPk(userId);
    const product = await db.Product.findByPk(productId);

    if (!user) {
      return {
        message: "This user doesn't exist!",
      };
    }
    if (!product) {
      return {
        message: "The product doesn't exist!",
      };
    }

    if (!product.isAvailable) {
      return {
        message: "This product is not available. You can't leave a review."
      }
    }

    const newReview = await db.Review.create({
      UserId: userId,
      ProductId: productId,
      rating: rating,
      comment: comment,
    });

    return newReview;
  } catch (err) {
    console.error("Error at handlers/createProductReview:", err);
    return { message: err.message };
  }
};

const editProductReview = async (UserId, ProductId, comment, rating) => {
  try {
    let review = await db.Review.findOne({
      where: {
        UserId: UserId,
        ProductId: ProductId,
      },
    });

    if (!review) {
      return {
        message: "Review does not exist. Nothing to edit.",
      };
    }

    if (comment) {
      review.comment = comment;
    }
    if (rating) {
      review.rating = rating;
    }

    res = await review.save();
    return review;
  } catch (err) {
    console.log("Error at handlers/editProductReview:", err);
    return {
      message: err,
      obj: null,
    };
  }
};

const removeReviewHandler = async (userId, productId) => {
  try {
    const user = await db.User.findByPk(userId);
    const product = await db.Product.findByPk(productId);

    if (!user) {
      return {
        message: "This user doesn't exist!",
      };
    }
    if (!product) {
      return {
        message: "This product doesn't exist!",
      };
    }

    const toBeDeleted = await db.Review.findOne({
      where: {
        UserId: userId,
        ProductId: productId,
      },
    });

    if (!toBeDeleted) {
      return {
        message: "Review does not exist!",
      };
    }

    res = db.Review.destroy({
      where: {
        UserId: toBeDeleted.UserId,
        ProductId: toBeDeleted.ProductId,
      },
    });

    return {
      message: "The review was deleted successfully!",
    };
  } catch (err) {
    console.error("Error at removeReviewHandler:", err);
    return { message: err.message };
  }
};

const getProductReviewsWithId = async (id) => {
  try {
    const product = await db.Product.findByPk(id);
    const reviews = await product.getReviews();
    return reviews;
  } catch (err) {
    console.log("Error at handlers/getProductReviewsWithId:", err);
    return null;
  }
};

module.exports = {
  getProductReviews,
  getUserReviewsWithId,
  createProductReview,
  removeReviewHandler,
  editProductReview,
  getProductReviewsWithId
};
