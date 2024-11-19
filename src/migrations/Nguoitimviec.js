"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Nguoitimviec", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      anhDaiDien: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hoVaTen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ngaySinh: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      thanhPho: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      diaChi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gioiTinh: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      soDienThoai: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MaND: {
        // Khoá ngoại liên kết với bảng Nguoidung
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Nguoitimviec");
  },
};
