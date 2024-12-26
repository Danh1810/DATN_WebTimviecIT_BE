"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhanHoiUngTuyen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một phản hồi thuộc về một ứng tuyển
      PhanHoiUngTuyen.belongsTo(models.Ungtuyen, {
        foreignKey: "idUngTuyen",
        as: "ungTuyen",
      });
    }
  }
  PhanHoiUngTuyen.init(
    {
      idUngTuyen: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      noiDung: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ngayPhanHoi: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      trangThaiPhanHoi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trangThaiPhanHoi: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      filedinhkem: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PhanHoiUngTuyen",
      tableName: "phanhoiungtuyen",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return PhanHoiUngTuyen;
};
