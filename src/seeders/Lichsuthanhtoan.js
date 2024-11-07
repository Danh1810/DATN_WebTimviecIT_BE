"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Lichsuthanhtoan", [
      {
        nhatuyendung_id: 1,
        thanhtoan_id: 1,
        trangthai: "completed",
        sotien: 100.0,
        Ngaythanhtoan: new Date(),
        Soluongmua: 5,
<<<<<<< HEAD
=======
        createdAt: new Date(),
        updatedAt: new Date(),
>>>>>>> e171d5e8fd0cae2d9bb661344d2c03f303cc9614
      },
      {
        nhatuyendung_id: 2,
        thanhtoan_id: 2,
        trangthai: "pending",
        sotien: 200.0,
        Ngaythanhtoan: null,
        Soluongmua: 10,
<<<<<<< HEAD
=======
        createdAt: new Date(),
        updatedAt: new Date(),
>>>>>>> e171d5e8fd0cae2d9bb661344d2c03f303cc9614
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Lichsuthanhtoan", null, {});
  },
};
