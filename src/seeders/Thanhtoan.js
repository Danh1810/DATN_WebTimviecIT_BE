"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Thanhtoan", [
      { ten: "thanh toan 1" },
      { ten: "thanh toán  2" },
      { ten: "thanh toan  3" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Thanhtoan", null, {});
  },
};
