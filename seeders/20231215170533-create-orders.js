'use strict';
const { randNumber } = require('@ngneat/falso');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let status = ["Delivered", "On the Way"]

    const data = new Array(35).fill().map(() => ({
      UserId: randNumber({ min: 1, max: 25 }),
      status: status[randNumber({ min: 0, max: 1 })],
      PaymentId: randNumber({ min: 1, max: 35 }),
      updatedAt: new Date(),
      createdAt: new Date()
    }));

    await queryInterface.bulkInsert("Orders", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  }
};
