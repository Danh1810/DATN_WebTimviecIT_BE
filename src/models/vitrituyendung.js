"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vitrituyendung extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Vitrituyendung.init(
    {
      MaTTD: {
        type: DataTypes.INTEGER,
      },
      MaCB: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Vitrituyendung",
      tableName: "Vitrituyendung",
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Vitrituyendung;
};
