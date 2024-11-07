"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Quyen", [
      {
        ten: "admin",
        URL: JSON.stringify(["/jb", "/search"]),
      },
      {
        ten: "ntd",
        URL: JSON.stringify(["/jb", "/search"]),
      },
      {
        ten: "ntv",
        URL: JSON.stringify(["/jb", "/search"]),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Quyen", null, {});
  },
};
