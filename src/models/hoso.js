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
      ngayCapNhat: {
        type: DataTypes.DATE, // Kiểu dữ liệu DATE
        defaultValue: DataTypes.NOW, // Giá trị mặc định là ngày/giờ hiện tại
      },
      NguoitimviecId: {
        type: DataTypes.INTEGER,
        references: { model: "Nguoitimviec", key: "id" },
      },
      trangthai: {
        type: DataTypes.STRING,
        defaultValue: "Đang hoạt động",
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
