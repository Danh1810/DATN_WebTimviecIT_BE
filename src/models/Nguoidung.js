"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nguoidung extends Model {
    static associate(models) {
      // Một User có nhiều Employers
      Nguoidung.hasMany(models.Nhatuyendung, {
        foreignKey: "MaND",
        as: "ND_NTD",
      });
      Nguoidung.hasMany(models.Nguoitimviec, {
        foreignKey: "MaND",
        as: "ND_NTV",
      });
      Nguoidung.belongsTo(models.Quyen, {
        foreignKey: "MaQuyen",
        as: "Group",
      });
    }
  }
  Nguoidung.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      MaQuyen: DataTypes.INTEGER,
      Trangthai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Nguoidung",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Nguoidung;
};
