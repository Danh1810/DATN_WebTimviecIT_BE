"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Lichsuthanhtoan",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nhatuyendung_id: {
          type: Sequelize.INTEGER,
        },
        thanhtoan_id: {
          type: Sequelize.INTEGER,
        },
        trangthai: {
          type: Sequelize.STRING,
        },
        sotien: {
          type: Sequelize.DECIMAL(10, 2),
        },
        Ngaythanhtoan: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        Soluongmua: {
          type: Sequelize.INTEGER,
        },
      },
      {
        charset: "utf8", // Set the character set for the entire table
        collate: "utf8_general_ci", // Set the collation for the entire table
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Lichsuthanhtoan");
  },
};
