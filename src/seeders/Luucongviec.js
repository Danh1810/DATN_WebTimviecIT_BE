"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Luucongviec", [
      {
        MaTTD: 1,
        MaNTV: 1,
      },
      {
        MaTTD: 2,
        MaNTV: 1,
      },
      {
        MaTTD: 3,
        MaNTV: 2,
      },
      {
        MaTTD: 4,
        MaNTV: 2,
      },
      {
        MaTTD: 5,
        MaNTV: 3,
      },
      {
        MaTTD: 6,
        MaNTV: 3,
      },
      {
        MaTTD: 7,
        MaNTV: 4,
      },
      {
        MaTTD: 8,
        MaNTV: 4,
      },
      {
        MaTTD: 9,
        MaNTV: 5,
      },
      {
        MaTTD: 10,
        MaNTV: 5,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Luucongviec", null, {});
  },
};
