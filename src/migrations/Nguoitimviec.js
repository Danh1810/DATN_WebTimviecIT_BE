"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Nguoitimviec", {
      numericId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      id: {
        type: Sequelize.STRING,
        allowNull: true, // Temporarily allow `id` to be null for initial creation
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ten: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      SDT: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Nguoidung_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      gioitinh: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fileCV: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Nguoitimviec");
  },
};
