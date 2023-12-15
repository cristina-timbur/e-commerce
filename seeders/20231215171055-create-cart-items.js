'use strict';
const { randNumber, randFloat } = require('@ngneat/falso');
const { generateCompositeFK } = require('../utils/generate-composite-fk');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let numCartItems = 200;
    let keys = generateCompositeFK(numCartItems, randNumber, { min: 1, max: 30 }, randNumber, { min: 1, max: 50 });
    const data = new Array(numCartItems).fill();
    
    for(let i = 0; i < numCartItems; i ++){
      let new_cart_item = {
        CartId: keys[i][0],
        ProductId: keys[i][1],
        price: randFloat({ min: 0, max: 10000 }),
        quantity: randNumber({ min: 1, max: 10 }),
        updatedAt: new Date(),
        createdAt: new Date()
      }
      data[i] = new_cart_item;
    }

    await queryInterface.bulkInsert("Cart_Items", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cart_Items", null, {});
  }
};
