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
      Quyen.hasMany(models.Nguoidung, { foreignKey: "Quyen_id", as: "Group" });
      //   Role.belongsToMany(models.Roles, {
      //     as: "Group_Roles",
      //     through: "Group_Role",
      //     foreignKey: "group_id",
      //   });
    }
  }
  Quyen.init(
    {
      ten: DataTypes.STRING,
      URL: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Quyen",
    }
  );
  return Quyen;
};
