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
      MaTTD: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      MaKN: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Kynangtuyendung");
  },
};
