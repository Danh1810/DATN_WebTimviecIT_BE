"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Capbac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here if needed
      Capbac.belongsToMany(models.Tintuyendung, {
        through: "Vitrituyendung",
        foreignKey: "MaCB",
        as: "jobPosts",
      });
    }
  }
  Capbac.init(
    {
      ten: {
        type: DataTypes.STRING,
        allowNull: false, // Có thể chỉnh sửa tùy thuộc vào yêu cầu của bạn
      },
    },
    {
      sequelize,
      modelName: "Capbac",
      tableName: "Capbac",
      timestamps: false,
      freezeTableName: true, // Sẽ tự động thêm createdAt và updatedAt
    }
  );
  return Capbac;
};
