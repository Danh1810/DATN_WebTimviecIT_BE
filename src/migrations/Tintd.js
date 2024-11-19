"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tintuyendung", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tieude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mota: {
        type: Sequelize.STRING,
      },
      Ngayhethan: {
        type: Sequelize.DATE,
      },
      trangthai: {
        type: Sequelize.STRING,
      },
      mucluong: {
        type: Sequelize.STRING,
      },
      MaNTD: {
        type: Sequelize.INTEGER,
      },
      Ngaytao: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      loaiHopdong: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      diaChiLamviec: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kinhNghiem: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tintuyendung");
  },
};
