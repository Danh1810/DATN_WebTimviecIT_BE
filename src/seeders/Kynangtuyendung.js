"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Kynangtuyendung", [
      {
        tintuyendung_id: 1,
        kynang_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 1 requires skill 1
      {
        tintuyendung_id: 1,
        kynang_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 1 requires skill 2
      {
        tintuyendung_id: 2,
        kynang_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 2 requires skill 3
      {
        tintuyendung_id: 2,
        kynang_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 2 requires skill 4
      {
        tintuyendung_id: 3,
        kynang_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 3 requires skill 1
      {
        tintuyendung_id: 3,
        kynang_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 3 requires skill 5
      {
        tintuyendung_id: 4,
        kynang_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 4 requires skill 2
      {
        tintuyendung_id: 4,
        kynang_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 4 requires skill 3
      {
        tintuyendung_id: 5,
        kynang_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 5 requires skill 5
      {
        tintuyendung_id: 5,
        kynang_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 5 requires skill 6
      {
        tintuyendung_id: 6,
        kynang_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 6 requires skill 1
      {
        tintuyendung_id: 6,
        kynang_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 6 requires skill 6
      {
        tintuyendung_id: 7,
        kynang_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 7 requires skill 2
      {
        tintuyendung_id: 8,
        kynang_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 8 requires skill 4
      {
        tintuyendung_id: 9,
        kynang_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 9 requires skill 3
      {
        tintuyendung_id: 9,
        kynang_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 9 requires skill 4
      {
        tintuyendung_id: 10,
        kynang_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 10 requires skill 5
      {
        tintuyendung_id: 10,
        kynang_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 10 requires skill 1
      {
        tintuyendung_id: 11,
        kynang_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 11 requires skill 7
      {
        tintuyendung_id: 12,
        kynang_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Job post 12 requires skill 8
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Kynangtuyendung", null, {});
  },
};
