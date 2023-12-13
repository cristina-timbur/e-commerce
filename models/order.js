'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.hasMany(models.User);

      models.Order.belongsToMany(models.Product, {
        through: 'Order_Items'
      })
      models.Order.hasMany(models.Order_Items)

      models.Order.belongsTo(models.Payment, {
        foreignKey: "PaymentId",
      });
    }
  };
  Order.init({
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PaymentId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};