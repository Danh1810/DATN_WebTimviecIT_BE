"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Phongvan",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        Noidung: {
          type: Sequelize.STRING,
        },
        Ngay: {
          type: Sequelize.DATE,
        },
        MaNTD: {
          type: Sequelize.INTEGER,
        },
        MaNTV: {
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
    await queryInterface.dropTable("Tinnhan");
  },
};
