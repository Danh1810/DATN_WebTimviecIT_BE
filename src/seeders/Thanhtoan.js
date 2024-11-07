"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Thanhtoan", [
      { ten: "Payment Method 1", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Payment Method 2", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Payment Method 3", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Thanhtoan", null, {});
  },
};
