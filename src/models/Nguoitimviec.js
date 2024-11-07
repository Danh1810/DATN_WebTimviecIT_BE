"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Nguoitimviec extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Nguoitimviec.init(
    {
      numericId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ten: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SDT: {
        type: DataTypes.STRING,
      },
      Nguoidung_id: {
        type: DataTypes.INTEGER,
      },
      gioitinh: {
        type: DataTypes.INTEGER,
      },
      fileCV: {
        type: DataTypes.STRING,
      },
      Soluongnophoso: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Nguoitimviec",
      tableName: "Nguoitimviec",
      timestamps: true,
    }
  );

  Nguoitimviec.addHook("afterCreate", async (nguoiTimViec, options) => {
    console.log("áhdasjdsaj");
    nguoiTimViec.id = `NTV${nguoiTimViec.numericId
      .toString()
      .padStart(6, "0")}`;
    // Save the updated instance - make sure to handle transactions correctly
    await nguoiTimViec.save({ transaction: options.transaction });
  });

  return Nguoitimviec;
};
