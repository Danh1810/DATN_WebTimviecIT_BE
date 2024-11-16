"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Phongvan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the associations with Nhatuyendung (Employer) and Nguoitimviec (Job Seekers)
      Phongvan.belongsTo(models.Nhatuyendung, {
        foreignKey: "MaNTD",
        as: "PV_NTD",
      });
      Phongvan.belongsTo(models.Nguoitimviec, {
        foreignKey: "MaNTV",
        as: "PV_NTV",
      });
    }
  }

  Phongvan.init(
    {
      Noidung: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Ngay: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      MaNTD: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      MaNTV: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Phongvan",
      tableName: "Phongvan",
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Phongvan;
};
