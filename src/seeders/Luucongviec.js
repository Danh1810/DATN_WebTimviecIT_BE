"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Luucongviec", [
      {
        tintuyendung_id: 1,
        nguoitimviec_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 2,
        nguoitimviec_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 3,
        nguoitimviec_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 4,
        nguoitimviec_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 5,
        nguoitimviec_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 6,
        nguoitimviec_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 7,
        nguoitimviec_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 8,
        nguoitimviec_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 9,
        nguoitimviec_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 10,
        nguoitimviec_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Luucongviec", null, {});
  },
};
