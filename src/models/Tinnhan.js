'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tinnhan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một Message thuộc về một Employer
      // Messages.belongsTo(models.Employer, {
      //   foreignKey: 'employers_id',
      //   as: 'employer',
      // });

      // // Một Message thuộc về một JobSeeker
      // Messages.belongsTo(models.JobSeekers, {
      //   foreignKey: 'seeker_id',
      //   as: 'jobSeeker',
      // });
    }
  }
  Tinnhan.init({
    Noidung: {
      type: DataTypes.STRING,
      allowNull: false, // Có thể chỉnh sửa tùy thuộc vào yêu cầu của bạn
    },
    Ngay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nhatuyendung_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nguoitimviec_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Tinnhan',
    tableName: 'Tinnhan',
    timestamps: true, // Sẽ tự động thêm createdAt và updatedAt
  });
  return Tinnhan;
};
