"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Luucongviec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một SaveJob thuộc về một JobPost
      Luucongviec.belongsTo(models.Tintuyendung, {
        foreignKey: "MaTTD",
        as: "TTD_LCV",
      });

      Luucongviec.belongsTo(models.Nguoitimviec, {
        foreignKey: "MaNTV",
        as: "NTV_LCV",
      });
    }
  }
  Luucongviec.init(
    {
      MaTTD: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MaNTV: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Luucongviec",
      tableName: "luucongviec",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Luucongviec;
};
