"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nhatuyendung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một Employer có nhiều JobPosts
      Nhatuyendung.hasMany(models.Tintuyendung, {
        foreignKey: "MaNTD",
        as: "jobPosts",
      });
      Nhatuyendung.belongsTo(models.Nguoidung, {
        foreignKey: "MaND",
        as: "user",
      });
    }
  }
  Nhatuyendung.init(
    {
      ten: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sdt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linhvuc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      diachi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trangthai: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      MaND: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      logo: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      Soluongdangbai: {
        type: DataTypes.INTEGER,
      },
      Soluongnoibat: {
        type: DataTypes.INTEGER,
      },
      thongtin: {
        type: DataTypes.TEXT("long"),
      },
    },
    {
      sequelize,
      modelName: "Nhatuyendung",
      tableName: "nhatuyendung",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Nhatuyendung;
};
