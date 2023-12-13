'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      })

      models.Product.belongsToMany(models.User, {
        through: 'Review'
      })
      models.Product.hasMany(models.Review)
      
      models.Product.belongsToMany(models.Order, {
        through: 'Order_Items'
      })
      models.Product.hasMany(models.Order_Items)

      models.Product.belongsToMany(models.Cart, {
        through: 'Cart_Items'
      })
      models.Product.hasMany(models.Cart_Items)
    }
  };
  Product.init({
    name: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    rating: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    discount: DataTypes.DOUBLE,
    CategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};