"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Kynangtuyendung", [
      {
        MaTTD: 1,
        MaKN: 1,
      }, // Job post 1 requires skill 1
      {
        MaTTD: 1,
        MaKN: 2,
      }, // Job post 1 requires skill 2
      {
        MaTTD: 2,
        MaKN: 3,
      }, // Job post 2 requires skill 3
      {
        MaTTD: 2,
        MaKN: 4,
      }, // Job post 2 requires skill 4
      {
        MaTTD: 3,
        MaKN: 1,
      }, // Job post 3 requires skill 1
      {
        MaTTD: 3,
        MaKN: 5,
      }, // Job post 3 requires skill 5
      {
        MaTTD: 4,
        MaKN: 2,
      }, // Job post 4 requires skill 2
      {
        MaTTD: 4,
        MaKN: 3,
      }, // Job post 4 requires skill 3
      {
        MaTTD: 5,
        MaKN: 5,
      }, // Job post 5 requires skill 5
      {
        MaTTD: 5,
        MaKN: 6,
      }, // Job post 5 requires skill 6
      {
        MaTTD: 6,
        MaKN: 1,
      }, // Job post 6 requires skill 1
      {
        MaTTD: 6,
        MaKN: 6,
      }, // Job post 6 requires skill 6
      {
        MaTTD: 7,
        MaKN: 2,
      }, // Job post 7 requires skill 2
      {
        MaTTD: 8,
        MaKN: 4,
      }, // Job post 8 requires skill 4
      {
        MaTTD: 9,
        MaKN: 3,
      }, // Job post 9 requires skill 3
      {
        MaTTD: 9,
        MaKN: 4,
      }, // Job post 9 requires skill 4
      {
        MaTTD: 10,
        MaKN: 5,
      }, // Job post 10 requires skill 5
      {
        MaTTD: 10,
        MaKN: 1,
      }, // Job post 10 requires skill 1
      {
        MaTTD: 11,
        MaKN: 7,
      }, // Job post 11 requires skill 7
      {
        MaTTD: 12,
        MaKN: 8,
      }, // Job post 12 requires skill 8
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Kynangtuyendung", null, {});
  },
};
