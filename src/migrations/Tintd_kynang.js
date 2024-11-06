// Migration để tạo bảng trung gian JobPostSkills
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Kynangtuyendung", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tintuyendung_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kynang_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Kynangtuyendung");
  },
};
