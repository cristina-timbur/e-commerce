'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cart.belongsTo(models.User, {
        foreignKey: 'UserId',
      });

      models.Cart.belongsTo(models.Cart, {
        foreignKey: 'UserId',
      });
      models.Cart.belongsToMany(models.Product, {
        through: 'Cart_Items'
      })
      models.Cart.hasMany(models.Cart_Items)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};