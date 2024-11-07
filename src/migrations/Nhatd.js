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
        Nguoidung_id: {
          type: Sequelize.INTEGER,
        },
        logo: {
          type: Sequelize.STRING,
        },
        Soluongdangbai: {
          type: Sequelize.INTEGER,
<<<<<<< HEAD
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 3,
=======
>>>>>>> e171d5e8fd0cae2d9bb661344d2c03f303cc9614
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
