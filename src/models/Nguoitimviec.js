"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Nguoitimviec extends Model {
    static associate(models) {
      Nguoitimviec.hasMany(models.Luucongviec, {
        foreignKey: "MaNTV",
        as: "LCV_NTV",
      });
      Nguoitimviec.hasMany(models.Hosocanhan, {
        foreignKey: "NguoitimviecId",
        as: "hoso",
      });
      Nguoitimviec.belongsTo(models.Nguoidung, {
        foreignKey: "MaND",
        as: "NTV_ND",
      });
    }
  }

  Nguoitimviec.init(
    {
      anhDaiDien: DataTypes.TEXT("long"),
      hoVaTen: DataTypes.STRING,
      ngaySinh: DataTypes.DATE,
      thanhPho: DataTypes.STRING,
      diaChi: DataTypes.STRING,
      gioiTinh: DataTypes.STRING,
      soDienThoai: DataTypes.STRING,
      MaND: DataTypes.INTEGER,
      Soluongnophoso: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Nguoitimviec",
      tableName: "nguoitimviec",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Nguoitimviec;
};
