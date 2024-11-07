// "use strict";
// const { Model } = require("sequelize");

// module.exports = (sequelize, DataTypes) => {
//   class Nguoitimviec extends Model {
//     static associate(models) {
//       // Define associations if necessary
//     }
//   }

//   Nguoitimviec.init(
//     {
//       id: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         unique: true,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       ten: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       SDT: {
//         type: DataTypes.STRING,
//       },
//       Nguoidung_id: {
//         type: DataTypes.INTEGER,
//       },
//       gioitinh: {
//         type: DataTypes.INTEGER,
//       },
//       fileCV: {
//         type: DataTypes.STRING,
//       },
//       Soluongnophoso: {
//         type: DataTypes.INTEGER,
//       },
//     },
//     {
//       sequelize,
//       modelName: "Nguoitimviec",
//       tableName: "Nguoitimviec",
//       timestamps: true,
//     }
//   );

//   Nguoitimviec.addHook("afterCreate", async (nguoiTimViec, options) => {
//     try {
//       // Use the auto-generated primary key as the numeric ID base for `id`
//       nguoiTimViec.id = `NTV${nguoiTimViec
//         .getDataValue("id")
//         .toString()
//         .padStart(6, "0")}`;
//       await nguoiTimViec.save({ transaction: options.transaction });
//     } catch (error) {
//       console.error("Error updating ID after creation:", error);
//       throw error;
//     }
//   });

//   return Nguoitimviec;
// };
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Nguoitimviec extends Model {
    static associate(models) {
      // Define associations if necessary
    }
  }

  Nguoitimviec.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ten: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SDT: {
        type: DataTypes.STRING,
      },
      Nguoidung_id: {
        type: DataTypes.INTEGER,
      },
      gioitinh: {
        type: DataTypes.INTEGER,
      },
      fileCV: {
        type: DataTypes.STRING,
      },
      Soluongnophoso: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Nguoitimviec",
      tableName: "Nguoitimviec",
      timestamps: true,
    }
  );
  return Nguoitimviec;
};
