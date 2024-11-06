"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Kynangtuyendung extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Kynangtuyendung.init(
    {
      tintuyendung_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tintuyendung", // Name of the target model
          key: "id", // Key in the target model
        },
      },
      kynang_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Kynang", // Name of the target model
          key: "id", // Key in the target model
        },
      },
    },
    {
      sequelize,
      modelName: "Kynangtuyendung",
      tableName: "Kynangtuyendung",
      timestamps: true,
    }
  );

  return Kynangtuyendung;
};
