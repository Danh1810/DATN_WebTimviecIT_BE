"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nguoidung extends Model {
    static associate(models) {
      // Một User có nhiều Employers
      Nguoidung.hasMany(models.Nhatuyendung, {
        foreignKey: "Nguoidung_id",
        as: "user",
      });
      Nguoidung.hasMany(models.Nguoitimviec, {
        foreignKey: "Nguoidung_id",
        as: "user_seeker",
      });
      Nguoidung.belongsTo(models.Quyen, {
        foreignKey: "Quyen_id",
        as: "Group",
      });
    }
  }
  Nguoidung.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      Quyen_id: DataTypes.INTEGER,
      Trangthai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Nguoidung",
    }
  );
  return Nguoidung;
};
