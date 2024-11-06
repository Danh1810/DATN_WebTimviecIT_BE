'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ungtuyen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một Application thuộc về một JobPost
      // Applications.belongsTo(models.JobPost, {
      //   foreignKey: 'JobPost_id',
      //   as: 'jobPost',
      // });

      // Một Application thuộc về một JobSeeker
      // Applications.belongsTo(models.JobSeeker, {
      //   foreignKey: 'seeker_id',
      //   as: 'jobSeeker',
      // });
    }
  }
  Ungtuyen.init({
    file: {
      type: DataTypes.STRING,
    },
    NgayNop: {
      type: DataTypes.DATE,
    },
    ungvien_id: {
      type: DataTypes.INTEGER,
    },
    tintuyendung_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Ungtuyen',
    tableName: 'Ungtuyen',
    timestamps: true, // Sẽ tự động thêm createdAt và updatedAt
  });
  return Ungtuyen;
};
