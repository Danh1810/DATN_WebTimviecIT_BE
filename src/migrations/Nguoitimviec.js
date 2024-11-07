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
<<<<<<< HEAD
        allowNull: false,
        defaultValue: 1,
=======
>>>>>>> e171d5e8fd0cae2d9bb661344d2c03f303cc9614
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Nguoitimviec");
  },
};
