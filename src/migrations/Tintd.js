"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Tintuyendung",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        tieude: {
          type: Sequelize.STRING,
        },
        mota: {
          type: Sequelize.STRING,
        },
        Ngayhethan: {
          type: Sequelize.DATE,
        },
        nhatuyendung_id: {
          type: Sequelize.INTEGER,
        },
        trangthai: {
          type: Sequelize.STRING,
        },
        diachi: {
          type: Sequelize.STRING,
        },
        mucluong: {
          type: Sequelize.STRING,
        },
        Ngaytao: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      {
        charset: "utf8", // Set the character set for the entire table
        collate: "utf8_general_ci", // Set the collation for the entire table
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tintuyendung");
  },
};
