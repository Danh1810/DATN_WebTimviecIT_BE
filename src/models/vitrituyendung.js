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
        references: {
          model: "Tintuyendung",
          key: "id",
        },
      },
      MaCB: {
        type: DataTypes.INTEGER,
        references: {
          model: "Capbac",
          key: "id",
        },
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
