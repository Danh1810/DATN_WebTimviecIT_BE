"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lichsuthanhtoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associations can be defined here
      Lichsuthanhtoan.belongsTo(models.Nhatuyendung, {
        foreignKey: "nhatuyendung_id",
        as: "employer",
      });
      Lichsuthanhtoan.belongsTo(models.Thanhtoan, {
        foreignKey: "thanhtoan_id",
        as: "payment",
      });
    }
  }
  Lichsuthanhtoan.init(
    {
      nhatuyendung_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      thanhtoan_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      trangthai: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      sotien: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Ngaythanhtoan: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Soluongmua: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Lichsuthanhtoan",
      tableName: "Lichsuthanhtoan",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    }
  );
  return Lichsuthanhtoan;
};
