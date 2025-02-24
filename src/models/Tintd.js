"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tintuyendung extends Model {
    static associate(models) {
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
      Tintuyendung.hasMany(models.Ungtuyen, {
        foreignKey: "MaTTD",
        as: "jbp",
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
        type: DataTypes.TEXT("long"),
      },
      Ngayhethan: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: () => {
          const now = new Date();
          now.setMonth(now.getMonth() + 1); // Cộng thêm 1 tháng
          return now;
        },
      },
      trangthai: {
        type: DataTypes.STRING,
      },
      mucluong: {
        type: DataTypes.DECIMAL(10, 2),
      },
      MaNTD: {
        type: DataTypes.INTEGER,
      },
      noibat: {
        type: DataTypes.INTEGER,
      },
      Ngaytao: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      // Thêm các trường mới
      loaiHopdong: {
        type: DataTypes.STRING, // Ví dụ: Toàn thời gian, Bán thời gian
        allowNull: true,
      },
      diaChiLamviec: {
        type: DataTypes.STRING, // Ví dụ: Hà Nội, TP.HCM
        allowNull: true,
      },
      kinhNghiem: {
        type: DataTypes.STRING, // Ví dụ: 1-2 năm, 3-5 năm
        allowNull: true,
      },
      linhVucCNTT: {
        type: DataTypes.STRING, // Ví dụ: 1-2 năm, 3-5 năm
        allowNull: true,
      },
      noibat: {
        type: DataTypes.BOOLEAN, // Ví dụ: 1-2 năm, 3-5 năm
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Tintuyendung",
      tableName: "tintuyendung",
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Tintuyendung;
};
