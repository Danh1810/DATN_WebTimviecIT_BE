"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Quyen", [
      {
        ten: "admin",
        mota: "ADMIN",
        URL: JSON.stringify(["/home", "/search"]),
      },
      {
        ten: "ntd",
        mota: "Nhà tuyển dụng",
        URL: JSON.stringify(["/home", "/search"]),
      },
      {
        ten: "ntv",
        mota: "Người tìm việc",
        URL: JSON.stringify(["/search", "/search"]),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Quyen", null, {});
  },
};
