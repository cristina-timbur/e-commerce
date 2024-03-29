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
      models.Order.belongsTo(models.User, {
        foreignKey: "UserId"
      });

      models.Order.hasMany(models.Order_Items)

      models.Order.belongsTo(models.Payment);
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