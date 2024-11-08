"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Kynang", [
      { ten: "Java" },
      { ten: "Python" },
      { ten: "JavaScript" },
      { ten: "SQL" },
      { ten: "C#" },
      { ten: "C++" },
      { ten: "PHP" },
      { ten: "Ruby" },
      { ten: "HTML" },
      { ten: "CSS" },
      { ten: "React" },
      { ten: "Angular" },
      { ten: "Node.js" },
      { ten: "Machine Learning" },
      { ten: "Data Analysis" },
      { ten: "DevOps" },
      { ten: "Cloud Computing" },
      { ten: "Cybersecurity" },
      { ten: "Networking" },
      { ten: "Linux" },
      { ten: "Java" },
      { ten: "Python" },
      { ten: "JavaScript" },
      { ten: "SQL" },
      { ten: "C#" },
      { ten: "C++" },
      { ten: "PHP" },
      { ten: "Ruby" },
      { ten: "HTML" },
      { ten: "CSS" },
      { ten: "React" },
      { ten: "Angular" },
      { ten: "Node.js" },
      { ten: "Machine Learning" },
      { ten: "Data Analysis" },
      { ten: "DevOps" },
      { ten: "Cloud Computing" },
      { ten: "Cybersecurity" },
      { ten: "Networking" },
      { ten: "Linux" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Kynang", null, {});
  },
};
