'use strict';
const { randProductName, randProductDescription, randNumber, randFloat, randBoolean } = require('@ngneat/falso');
const { generateUniqueValues } = require('../utils/generate-unique-values');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let numProducts = 50;
    let productNames = generateUniqueValues(randProductName, {}, numProducts);
    const data = new Array(50).fill();
    
    for(let i = 0; i < numProducts; i ++){
      data[i] = {
        name: productNames[i],
        isAvailable: randBoolean(),
        description: randProductDescription(),
        rating: randFloat({ min: 0, max: 10 }),
        price: randFloat({ min: 0, max: 10000 }),
        discount: randFloat({ min: 0, max: 1 }),
        categoryId: randNumber({ min: 1, max: 15 }),
        updatedAt: new Date(),
        createdAt: new Date()
      }
    }
    
    await queryInterface.bulkInsert("Products", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  }
};
