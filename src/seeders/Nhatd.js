"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Nhatuyendung", [
      {
        ten: "TechCorp Inc.",
        email: "contact@techcorp.com",
        sdt: "1234567890",
        diachi: "123 Main St, Tech City",
        Nguoidung_id: 6, // Assume this ID corresponds to a user in Nguoidung
        logo: "techcorp_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "Innovate Solutions",
        email: "hr@innovatesol.com",
        sdt: "0987654321",
        diachi: "456 Side Rd, Innovation Hub",
        Nguoidung_id: 7,
        logo: "innovate_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "DevHub LLC",
        email: "info@devhub.com",
        sdt: "1122334455",
        diachi: "789 Tech Park, Developer Town",
        Nguoidung_id: 8,
        logo: "devhub_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "CodeBase Ltd.",
        email: "jobs@codebase.com",
        sdt: "6677889900",
        diachi: "102 Startup St, Code Valley",
        Nguoidung_id: 9,
        logo: "codebase_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "Binary Solutions",
        email: "contact@binarysol.com",
        sdt: "5566778899",
        diachi: "303 High-Tech Ave, Binary City",
        Nguoidung_id: 10,
        logo: "binary_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "AlgoMatrix",
        email: "info@algomatrix.com",
        sdt: "4455667788",
        diachi: "202 Logic Ln, Algorithm Plains",
        Nguoidung_id: 11,
        logo: "algomatrix_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "DataBits Inc.",
        email: "admin@databits.com",
        sdt: "3344556677",
        diachi: "555 Data Blvd, Bit Heights",
        Nguoidung_id: 12,
        logo: "databits_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "Tech Innovators",
        email: "innovate@techinnovators.com",
        sdt: "2233445566",
        diachi: "666 Innovation Dr, Tech Village",
        Nguoidung_id: 13,
        logo: "techinnovators_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "NextGen Tech",
        email: "careers@nextgentech.com",
        sdt: "7788990011",
        diachi: "777 Future St, Gen City",
        Nguoidung_id: 14,
        logo: "nextgen_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ten: "Quantum Creations",
        email: "hello@quantumcreations.com",
        sdt: "8899001122",
        diachi: "888 Quantum Rd, Creativity Town",
        Nguoidung_id: 15,
        logo: "quantumcreations_logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Nhatuyendung", null, {});
  },
};
