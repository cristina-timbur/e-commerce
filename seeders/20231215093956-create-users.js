'use strict';
const bcrypt = require('bcrypt');
const { randEmail, randFirstName, randLastName, randPassword, randUserName } = require('@ngneat/falso');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = new Array(25).fill().map(() => ({
      username: randUserName(),
      password: bcrypt.hashSync(randPassword(), 10),
      email: randEmail(),
      firstName: randFirstName(),
      lastName: randLastName(),
      updatedAt: new Date(),
      createdAt: new Date()
    }));

    await queryInterface.bulkInsert("Users", data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
