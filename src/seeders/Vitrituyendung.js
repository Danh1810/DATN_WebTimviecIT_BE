"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Vitrituyendung", [
      {
        MaTTD: 1,
        MaCB: 1,
      },
      {
        MaTTD: 1,
        MaCB: 2,
      },
      {
        MaTTD: 2,
        MaCB: 2,
      },
      {
        MaTTD: 2,
        MaCB: 3,
      },
      {
        MaTTD: 3,
        MaCB: 3,
      },
      {
        MaTTD: 3,
        MaCB: 4,
      },
      {
        MaTTD: 4,
        MaCB: 4,
      },
      {
        MaTTD: 4,
        MaCB: 5,
      },
      {
        MaTTD: 5,
        MaCB: 5,
      },
      {
        MaTTD: 5,
        MaCB: 6,
      },
      {
        MaTTD: 6,
        MaCB: 1,
      },
      {
        MaTTD: 6,
        MaCB: 2,
      },
      {
        MaTTD: 7,
        MaCB: 2,
      },
      {
        MaTTD: 7,
        MaCB: 3,
      },
      {
        MaTTD: 8,
        MaCB: 3,
      },
      {
        MaTTD: 8,
        MaCB: 4,
      },
      {
        MaTTD: 9,
        MaCB: 4,
      },
      {
        MaTTD: 9,
        MaCB: 5,
      },
      {
        MaTTD: 10,
        MaCB: 5,
      },
      {
        MaTTD: 10,
        MaCB: 6,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Vitrituyendung", null, {});
  },
};
