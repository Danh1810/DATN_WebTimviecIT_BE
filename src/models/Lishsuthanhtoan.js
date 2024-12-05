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
        foreignKey: "MaNTT",
        as: "employer",
      });
    }
  }
  Lichsuthanhtoan.init(
    {
      MaNTT: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      loaiThanhtoan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trangthai: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Thành công",
      },
      goimua: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sotien: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      Ngaythanhtoan: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
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
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Lichsuthanhtoan;
};
