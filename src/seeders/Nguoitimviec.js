"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Retrieve current max numericId to continue incrementing from there
    const result = await queryInterface.sequelize.query(
      `SELECT MAX(numericId) as maxNumericId FROM Nguoitimviec;`
    );
    const maxNumericId = result[0][0].maxNumericId || 0;

    // Data to be inserted
    const applicants = [
      {
        numericId: maxNumericId + 1,
        email: "jobseeker1@example.com",
        ten: "John Doe",
        SDT: "1234567890",
        Nguoidung_id: 1,
        gioitinh: 1,
        fileCV: "john_doe_cv.pdf",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        numericId: maxNumericId + 2,
        email: "jobseeker2@example.com",
        ten: "Jane Smith",
        SDT: "0987654321",
        Nguoidung_id: 2,
        gioitinh: 2,
        fileCV: "jane_smith_cv.docx",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add additional entries as needed
    ];

    // Set the custom ID
    applicants.forEach((applicant) => {
      applicant.id = `NTV${applicant.numericId.toString().padStart(6, "0")}`;
    });

    await queryInterface.bulkInsert("Nguoitimviec", applicants);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Nguoitimviec", null, {});
  },
};
