"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ungtuyen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Ungtuyen.init(
    {
      file: {
        type: DataTypes.STRING,
      },
      NgayNop: {
        type: DataTypes.DATE,
      },
      MaNTV: {
        type: DataTypes.INTEGER,
      },
      MaTTD: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Ungtuyen",
      tableName: "Ungtuyen",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Ungtuyen;
};
