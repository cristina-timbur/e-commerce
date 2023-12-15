'use strict';
const { randNumber, randFloat } = require('@ngneat/falso');
const { generateCompositeFK } = require('../utils/generate-composite-fk');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let numOrderItems = 200;
    let keys = generateCompositeFK(numOrderItems, randNumber, { min: 1, max: 35 }, randNumber, { min: 1, max: 50 });
    const data = new Array(numOrderItems).fill();
    
    for(let i = 0; i < numOrderItems; i ++){
      let new_order_item = {
        OrderId: keys[i][0],
        ProductId: keys[i][1],
        price: randFloat({ min: 0, max: 10000 }),
        quantity: randNumber({ min: 1, max: 10 }),
        updatedAt: new Date(),
        createdAt: new Date()
      }
      data[i] = new_order_item;
    }

    await queryInterface.bulkInsert("Order_Items", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Order_Items", null, {});
  }
};
