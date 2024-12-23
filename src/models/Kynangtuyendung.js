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
      MaTTD: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tintuyendung", // Name of the target model
          key: "id", // Key in the target model
        },
      },
      MaKN: {
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
      tableName: "kynangtuyendung",
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Kynangtuyendung;
};
