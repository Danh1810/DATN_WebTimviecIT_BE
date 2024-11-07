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
        foreignKey: "nhatuyendung_id",
        as: "jobPosts",
      });

      // Một Employer có nhiều SaveJobs
      // Employers.hasMany(models.SaveJob, {
      //   foreignKey: 'employers_id',
      //   as: 'saveJobs',
      // });

      // Một Employer thuộc về một User
      Nhatuyendung.belongsTo(models.Nguoidung, {
        foreignKey: "Nguoidung_id",
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
      diachi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Nguoidung_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Soluongdangbai: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Nhatuyendung",
      tableName: "Nhatuyendung",
      timestamps: true, // Sẽ tự động thêm createdAt và updatedAt
    }
  );
  return Nhatuyendung;
};
