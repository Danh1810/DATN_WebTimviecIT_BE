"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hosocanhan extends Model {
    static associate(models) {
      Hosocanhan.belongsTo(models.Nguoitimviec, {
        foreignKey: "NguoitimviecId",
        as: "nguoitimviec",
      });
      Hosocanhan.hasMany(models.Ungtuyen, {
        foreignKey: "MaHS",
        as: "NTV_UT",
      });
    }
  }

  Hosocanhan.init(
    {
      tenhoso: DataTypes.STRING,
      kyNangLapTrinh: DataTypes.JSON,
      capBacHienTai: DataTypes.STRING,
      mucTieuNgheNghiep: DataTypes.TEXT,
      kinhNghiemLamViec: DataTypes.TEXT,
      trinhDoHocVan: DataTypes.TEXT,
      chungChiNgheNghiep: DataTypes.TEXT,
      duAnDaThamGia: DataTypes.TEXT,
      fileHoso: DataTypes.STRING,
      ngayCapNhat: DataTypes.DATE,
      NguoitimviecId: {
        type: DataTypes.INTEGER,
        references: { model: "Nguoitimviec", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Hosocanhan",
      tableName: "Hosocanhan",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Hosocanhan;
};
