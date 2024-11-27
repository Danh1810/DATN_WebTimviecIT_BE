"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ungtuyen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Association with Nguoitimviec (Job Seekers)
      Ungtuyen.belongsTo(models.Hosocanhan, {
        foreignKey: "MaHS",
        as: "UT_NTV",
      });
      Ungtuyen.belongsTo(models.Tintuyendung, {
        foreignKey: "MaTTD",
        as: "UT_TTD",
      });
    }
  }

  Ungtuyen.init(
    {
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trangthai: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Đã nộp",
      },
      NgayNop: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Defaults to current date
      },
      MaHS: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MaTTD: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
