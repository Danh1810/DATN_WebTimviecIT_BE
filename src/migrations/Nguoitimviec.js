"use strict";

const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Nguoitimviec", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      Soluongnophoso: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Nguoitimviec");
  },
};
