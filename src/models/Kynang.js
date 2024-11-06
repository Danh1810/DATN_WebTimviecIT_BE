"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Kynang extends Model {
    static associate(models) {
      Kynang.belongsToMany(models.Tintuyendung, {
        through: "Kynangtuyendung",
        foreignKey: "kynang_id",
        as: "jobPosts",
      });
    }
  }

  Kynang.init(
    {
      ten: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Kynang",
      tableName: "Kynang",
      timestamps: true,
    }
  );
  return Kynang;
};
