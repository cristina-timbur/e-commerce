'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order_Items.belongsTo(models.Order, {
        foreignKey: 'OrderId'
      })
      models.Order_Items.belongsTo(models.Product, {
        foreignKey: 'ProductId'
      })
    }
  };
  Order_Items.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    OrderId: { primaryKey: true, type: DataTypes.INTEGER },
    ProductId: { primaryKey: true, type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'Order_Items',
  });
  return Order_Items;
};