"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Capbac", [
      { ten: "Intern", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Junior", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Mid-level", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Senior", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Lead", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Manager", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Director", createdAt: new Date(), updatedAt: new Date() },
      { ten: "VP", createdAt: new Date(), updatedAt: new Date() },
      { ten: "C-level", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Owner", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Capbac", null, {});
  },
};
