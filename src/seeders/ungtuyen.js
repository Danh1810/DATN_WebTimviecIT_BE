"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Ungtuyen", [
      {
        file: "resume1.pdf",
        NgayNop: new Date(),
        ungvien_id: 1, // Corresponds to a job seeker
        tintuyendung_id: 1, // Corresponds to a job post
      },
      {
        file: "resume2.pdf",
        NgayNop: new Date(),
        ungvien_id: 1,
        tintuyendung_id: 2,
      },
      {
        file: "resume3.docx",
        NgayNop: new Date(),
        ungvien_id: 2,
        tintuyendung_id: 3,
      },
      {
        file: "resume4.pdf",
        NgayNop: new Date(),
        ungvien_id: 3,
        tintuyendung_id: 4,
      },
      {
        file: "resume5.pdf",
        NgayNop: new Date(),
        ungvien_id: 4,
        tintuyendung_id: 5,
      },
      {
        file: "resume6.docx",
        NgayNop: new Date(),
        ungvien_id: 5,
        tintuyendung_id: 6,
      },
      {
        file: "resume7.pdf",
        NgayNop: new Date(),
        ungvien_id: 6,
        tintuyendung_id: 1,
      },
      {
        file: "resume8.pdf",
        NgayNop: new Date(),
        ungvien_id: 7,
        tintuyendung_id: 2,
      },
      {
        file: "resume9.docx",
        NgayNop: new Date(),
        ungvien_id: 8,
        tintuyendung_id: 3,
      },
      {
        file: "resume10.pdf",
        NgayNop: new Date(),
        ungvien_id: 9,
        tintuyendung_id: 4,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Ungtuyen", null, {});
  },
};
