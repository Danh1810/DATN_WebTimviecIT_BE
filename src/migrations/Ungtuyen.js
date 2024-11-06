"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Ungtuyen", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      file: {
        type: Sequelize.STRING,
      },
      NgayNop: {
        type: Sequelize.DATE,
      },
     
      ungvien_id: {
        type: Sequelize.INTEGER,
      },
      tintuyendung_id: {
        type: Sequelize.INTEGER,
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
      charset: 'utf8', // Set the character set for the entire table
      collate: 'utf8_general_ci', // Set the collation for the entire table
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Ungtuyen");
  },
};