"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert 5 rows into the Phongvan table
    await queryInterface.bulkInsert(
      "Phongvan",
      [
        {
          Noidung: "Initial interview with the candidate.",
          Ngay: new Date("2024-11-16"),
          MaNTD: 1, // Replace with valid Nhatuyendung ID
          MaNTV: 1, // Replace with valid Nguoitimviec ID
        },
        {
          Noidung: "Technical round discussion.",
          Ngay: new Date("2024-11-18"),
          MaNTD: 2, // Replace with valid Nhatuyendung ID
          MaNTV: 2, // Replace with valid Nguoitimviec ID
        },
        {
          Noidung: "HR round for salary discussion.",
          Ngay: new Date("2024-11-20"),
          MaNTD: 3, // Replace with valid Nhatuyendung ID
          MaNTV: 3, // Replace with valid Nguoitimviec ID
        },
        {
          Noidung: "Final round with the CEO.",
          Ngay: new Date("2024-11-22"),
          MaNTD: 4, // Replace with valid Nhatuyendung ID
          MaNTV: 4, // Replace with valid Nguoitimviec ID
        },
        {
          Noidung: "Feedback session for the candidate.",
          Ngay: new Date("2024-11-25"),
          MaNTD: 5, // Replace with valid Nhatuyendung ID
          MaNTV: 5, // Replace with valid Nguoitimviec ID
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove all rows from the Phongvan table
    await queryInterface.bulkDelete("Phongvan", null, {});
  },
};
