"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quyen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quyen.hasMany(models.Nguoidung, { foreignKey: "MaQuyen", as: "Group" });
    }
  }
  Quyen.init(
    {
      ten: DataTypes.STRING,
      mota: DataTypes.STRING,
      URL: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Quyen",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Quyen;
};
