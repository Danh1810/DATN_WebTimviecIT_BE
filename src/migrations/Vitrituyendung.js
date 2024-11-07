// Migration để tạo bảng trung gian JobPostSkills
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vitrituyendung", {
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
      capbac_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Vitrituyendung");
  },
};
