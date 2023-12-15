'use strict';
const { randNumber, randFloat, randParagraph } = require('@ngneat/falso');
const { generateCompositeFK } = require('../utils/generate-composite-fk');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let numReviews = 75;
    let keys = generateCompositeFK(numReviews, randNumber, { min: 1, max: 25 }, randNumber, { min: 1, max: 50 });
    const data = new Array(numReviews).fill();
    
    for(let i = 0; i < numReviews; i ++){
      let new_review = {
        UserId: keys[i][0],
        ProductId: keys[i][1],
        comment: randParagraph(),
        rating: randFloat({ min: 0, max: 10 }),
        updatedAt: new Date(),
        createdAt: new Date()
      }
      data[i] = new_review;
    }

    await queryInterface.bulkInsert("Reviews", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  }
};
