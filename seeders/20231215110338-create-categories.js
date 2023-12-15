'use strict';
const { randProductCategory } = require('@ngneat/falso');
const { generateUniqueValues } = require('../utils/generate-unique-values');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let numCategories = 15;
    let produtctCategories = generateUniqueValues(randProductCategory, {}, numCategories);
    const data = new Array(15).fill();
    
    for(let i = 0; i < numCategories; i ++){
      data[i] = {
        name: produtctCategories[i],
        updatedAt: new Date(),
        createdAt: new Date()
      };
    }

    await queryInterface.bulkInsert("Categories", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  }
};
