"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thanhtoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Thanhtoan.hasMany(models.Lichsuthanhtoan, {
        foreignKey: "MaTT",
        as: "TT_LSTT",
      });
    }
  }
  Thanhtoan.init(
    {
      ten: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Thanhtoan",
      tableName: "Thanhtoan",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Thanhtoan;
};
