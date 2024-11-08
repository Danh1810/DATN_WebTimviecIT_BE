"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Lichsuthanhtoan", [
      {
        MaNTT: 1,
        MaTT: 1,
        trangthai: "completed",
        sotien: 100.0,
        Ngaythanhtoan: new Date(),
        Soluongmua: 5,
      },
      {
        MaNTT: 2,
        MaTT: 2,
        trangthai: "pending",
        sotien: 200.0,
        Ngaythanhtoan: null,
        Soluongmua: 10,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Lichsuthanhtoan", null, {});
  },
};
