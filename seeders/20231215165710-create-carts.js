'use strict';
const { randNumber } = require('@ngneat/falso');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = new Array(30).fill().map(() => ({
      UserId: randNumber({ min: 1, max: 25 }),
      updatedAt: new Date(),
      createdAt: new Date()
    }));

    await queryInterface.bulkInsert("Carts", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Carts", null, {});
  }
};
