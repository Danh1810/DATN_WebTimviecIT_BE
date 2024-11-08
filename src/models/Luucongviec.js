"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Luucongviec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một SaveJob thuộc về một JobPost
      // SaveJobs.belongsTo(models.JobPost, {
      //   foreignKey: 'Jobpost_id',
      //   as: 'jobPost',
      // });
      // Một SaveJob thuộc về một JobSeeker
      // SaveJobs.belongsTo(models.JobSeekers, {
      //   foreignKey: 'seeker_id',
      //   as: 'jobSeeker',
      // });
    }
  }
  Luucongviec.init(
    {
      MaTTD: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MaNTV: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Luucongviec",
      tableName: "Luucongviec",
      ttimestamps: false,
      freezeTableName: true,
    }
  );
  return Luucongviec;
};
