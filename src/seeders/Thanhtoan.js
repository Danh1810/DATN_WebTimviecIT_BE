"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Thanhtoan", [
      { ten: "Payment Method 1" },
      { ten: "Payment Method 2" },
      { ten: "Payment Method 3" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Thanhtoan", null, {});
  },
};
