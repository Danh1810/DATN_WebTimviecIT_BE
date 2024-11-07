"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Thanhtoan", [
<<<<<<< HEAD
      { ten: "Payment Method 1" },
      { ten: "Payment Method 2" },
      { ten: "Payment Method 3" },
=======
      { ten: "Payment Method 1", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Payment Method 2", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Payment Method 3", createdAt: new Date(), updatedAt: new Date() },
>>>>>>> e171d5e8fd0cae2d9bb661344d2c03f303cc9614
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Thanhtoan", null, {});
  },
};
