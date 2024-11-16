"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Nguoitimviec extends Model {
    static associate(models) {
      Nguoitimviec.hasMany(models.Luucongviec, {
        foreignKey: "MaNTV",
        as: "LCV_NTV",
      });
      Nguoitimviec.hasMany(models.Ungtuyen, {
        foreignKey: "MaNTV",
        as: "NTV_UT",
      });
      Nguoitimviec.belongsTo(models.Nguoidung, {
        foreignKey: "MaND",
        as: "NTV_ND",
      });
    }
  }

  Nguoitimviec.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ten: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SDT: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      MaND: {
        type: DataTypes.INTEGER,
      },
      gioitinh: {
        type: DataTypes.INTEGER,
      },
      fileCV: {
        type: DataTypes.STRING,
      },
      Soluongnophoso: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Nguoitimviec",
      tableName: "Nguoitimviec",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Nguoitimviec;
};
