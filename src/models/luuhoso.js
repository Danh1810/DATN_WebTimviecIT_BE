"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Luuhoso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một SaveJob thuộc về một JobPost
      Luuhoso.belongsTo(models.Nhatuyendung, {
        foreignKey: "MaNTD",
        as: "NTD_LHS",
      });

      Luuhoso.belongsTo(models.Hosocanhan, {
        foreignKey: "MaHS",
        as: "HS_LHS",
      });
    }
  }
  Luuhoso.init(
    {
      MaNTD: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MaHS: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Luuhoso",
      tableName: "luuhoso",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Luuhoso;
};
