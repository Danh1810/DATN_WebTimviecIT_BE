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
      kinhNghiemLamViec: DataTypes.STRING,
      trinhDoHocVan: DataTypes.STRING,
      Mucluongmongmuon: DataTypes.DECIMAL(10, 2),
      hinhThuclamviec: DataTypes.TEXT,
      fileHoso: DataTypes.TEXT("long"),
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
      timkiem: {
        type: DataTypes.BOOLEAN, // Ví dụ: 1-2 năm, 3-5 năm
        allowNull: true,
        defaultValue: false, // Set the default value to false
      },
    },
    {
      sequelize,
      modelName: "Hosocanhan",
      tableName: "hosocanhan",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Hosocanhan;
};
