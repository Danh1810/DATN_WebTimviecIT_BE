"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Ungtuyen", [
      {
        file: "resume1.pdf",
        NgayNop: new Date(),
        MaNTV: 1, // Corresponds to a job seeker
        MaTTD: 1, // Corresponds to a job post
      },
      {
        file: "resume2.pdf",
        NgayNop: new Date(),
        MaNTV: 1,
        MaTTD: 2,
      },
      {
        file: "resume3.docx",
        NgayNop: new Date(),
        MaNTV: 2,
        MaTTD: 3,
      },
      {
        file: "resume4.pdf",
        NgayNop: new Date(),
        MaNTV: 3,
        MaTTD: 4,
      },
      {
        file: "resume5.pdf",
        NgayNop: new Date(),
        MaNTV: 4,
        MaTTD: 5,
      },
      {
        file: "resume6.docx",
        NgayNop: new Date(),
        MaNTV: 5,
        MaTTD: 6,
      },
      {
        file: "resume7.pdf",
        NgayNop: new Date(),
        MaNTV: 6,
        MaTTD: 1,
      },
      {
        file: "resume8.pdf",
        NgayNop: new Date(),
        MaNTV: 7,
        MaTTD: 2,
      },
      {
        file: "resume9.docx",
        NgayNop: new Date(),
        MaNTV: 8,
        MaTTD: 3,
      },
      {
        file: "resume10.pdf",
        NgayNop: new Date(),
        MaNTV: 9,
        MaTTD: 4,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Ungtuyen", null, {});
  },
};
