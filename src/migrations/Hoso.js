"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Hosocanhan", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tenhoso: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kyNangLapTrinh: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      capBacHienTai: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mucTieuNgheNghiep: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      kinhNghiemLamViec: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      trinhDoHocVan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      chungChiNgheNghiep: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      duAnDaThamGia: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fileHoso: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ngayCapNhat: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      NguoitimviecId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Hosocanhan");
  },
};
