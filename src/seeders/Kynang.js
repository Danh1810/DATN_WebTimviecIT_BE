"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Kynang", [
      { ten: "Java", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Python", createdAt: new Date(), updatedAt: new Date() },
      { ten: "JavaScript", createdAt: new Date(), updatedAt: new Date() },
      { ten: "SQL", createdAt: new Date(), updatedAt: new Date() },
      { ten: "C#", createdAt: new Date(), updatedAt: new Date() },
      { ten: "C++", createdAt: new Date(), updatedAt: new Date() },
      { ten: "PHP", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Ruby", createdAt: new Date(), updatedAt: new Date() },
      { ten: "HTML", createdAt: new Date(), updatedAt: new Date() },
      { ten: "CSS", createdAt: new Date(), updatedAt: new Date() },
      { ten: "React", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Angular", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Node.js", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Machine Learning", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Data Analysis", createdAt: new Date(), updatedAt: new Date() },
      { ten: "DevOps", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Cloud Computing", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Cybersecurity", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Networking", createdAt: new Date(), updatedAt: new Date() },
      { ten: "Linux", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Kynang", null, {});
  },
};
