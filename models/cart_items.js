'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cart_Items.belongsTo(models.Cart, {
        foreignKey: 'CartId'
      })
      models.Cart_Items.belongsTo(models.Product, {
        foreignKey: 'ProductId'
      })
    }
  };
  Cart_Items.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    CartId: { primaryKey: true, type: DataTypes.INTEGER },
    ProductId: { primaryKey: true, type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'Cart_Items',
  });
  return Cart_Items;
};