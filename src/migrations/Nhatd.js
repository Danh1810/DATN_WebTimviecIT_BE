"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Nhatuyendung",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ten: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        sdt: {
          type: Sequelize.STRING,
        },
        diachi: {
          type: Sequelize.STRING,
        },
        MaND: {
          type: Sequelize.INTEGER,
        },
        logo: {
          type: Sequelize.STRING,
        },
        website: {
          type: Sequelize.STRING,
        },
        linhvuc: {
          type: Sequelize.STRING,
        },
        Soluongdangbai: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 3,
        },
        trangthai: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "Chờ duyệt",
        },
      },
      {
        charset: "utf8", // Set the character set for the entire table
        collate: "utf8_general_ci", // Set the collation for the entire table
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Nhatuyendung");
  },
};
