'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Review.belongsTo(models.User, {
        foreignKey: 'UserId',
      });

      models.Review.belongsTo(models.Product, {
        foreignKey: 'ProductId',
      });
    }
  };
  Review.init({
    comment: DataTypes.STRING,
    rating: DataTypes.DOUBLE,
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};