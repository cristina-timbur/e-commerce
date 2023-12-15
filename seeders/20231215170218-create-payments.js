'use strict';
const { randFloat, randCreditCardBrand } = require('@ngneat/falso');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = new Array(35).fill().map(() => ({
      amount: randFloat(),
      provider: randCreditCardBrand(),
      updatedAt: new Date(),
      createdAt: new Date()
    }));

    await queryInterface.bulkInsert("Payments", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Payments", null, {});
  }
};
