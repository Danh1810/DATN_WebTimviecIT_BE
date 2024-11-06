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
      tintuyendung_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tintuyendung",
          key: "id",
        },
      },
      capbac_id: {
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
      timestamps: true,
    }
  );

  return Vitrituyendung;
};
