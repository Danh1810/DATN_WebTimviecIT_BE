"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Vitrituyendung", [
      {
        tintuyendung_id: 1,
        capbac_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 1,
        capbac_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 2,
        capbac_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 2,
        capbac_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 3,
        capbac_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 3,
        capbac_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 4,
        capbac_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 4,
        capbac_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 5,
        capbac_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 5,
        capbac_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 6,
        capbac_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 6,
        capbac_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 7,
        capbac_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 7,
        capbac_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 8,
        capbac_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 8,
        capbac_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 9,
        capbac_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 9,
        capbac_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 10,
        capbac_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tintuyendung_id: 10,
        capbac_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Vitrituyendung", null, {});
  },
};
