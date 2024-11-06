"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Quyen", [
      {
        ten: "admin",
        URL: JSON.stringify(["/jb", "/search"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "ntd",
        URL: JSON.stringify(["/jb", "/search"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "ntv",
        URL: JSON.stringify(["/jb", "/search"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Quyen", null, {});
  },
};
