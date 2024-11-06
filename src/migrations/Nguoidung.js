"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Nguoidung",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        email: {
          type: Sequelize.STRING,
        },
        username: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        Trangthai: {
          type: Sequelize.STRING,
          defaultValue: "Hoạt Động",
        },
        Quyen_id: {
          type: Sequelize.INTEGER,
          defaultValue: 3,
        },

        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        updatedAt: {
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
    await queryInterface.dropTable("Nguoidung");
  },
};
