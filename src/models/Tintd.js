"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tintuyendung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một JobPost thuộc về một Employer
      Tintuyendung.belongsTo(models.Nhatuyendung, {
        foreignKey: "MaNTD",
        as: "employer",
      });
      Tintuyendung.belongsToMany(models.Kynang, {
        through: "Kynangtuyendung",
        foreignKey: "MaTTD",
        as: "skills",
      });

      Tintuyendung.belongsToMany(models.Capbac, {
        through: "Vitrituyendung",
        foreignKey: "MaTTD",
        as: "levels",
      });
    }
  }
  Tintuyendung.init(
    {
      tieude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mota: {
        type: DataTypes.STRING,
      },
      Ngayhethan: {
        type: DataTypes.DATE,
      },
      trangthai: {
        type: DataTypes.STRING,
      },
      mucluong: {
        type: DataTypes.STRING,
      },
      MaNTD: {
        type: DataTypes.INTEGER,
      },
      Ngaytao: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Tintuyendung",
      tableName: "Tintuyendung",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Tintuyendung;
};
