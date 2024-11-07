"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Capbac", [
      { ten: "Intern" },
      { ten: "Junior" },
      { ten: "Mid-level" },
      { ten: "Senior" },
      { ten: "Lead" },
      { ten: "Manager" },
      { ten: "Director" },
      { ten: "VP" },
      { ten: "C-level" },
      { ten: "Owner" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Capbac", null, {});
  },
};
