"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Ungtuyen",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        file: {
          type: Sequelize.STRING,
        },
        trangthai: {
          type: Sequelize.STRING,
        },
        NgayNop: {
          type: Sequelize.DATE,
        },

        MaNTV: {
          type: Sequelize.INTEGER,
        },
        MaTTD: {
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
    await queryInterface.dropTable("Ungtuyen");
  },
};
