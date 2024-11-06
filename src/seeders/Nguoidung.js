"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Nguoidung", [
      {
        email: "developer1@tech.com",
        password: "hashed_password_1", // Assume this is a hashed password
        username: "devUser1",
        Quyen_id: 3, // Assume 3 is the ID for job seekers
        Trangthai: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "hr@company.com",
        password: "hashed_password_2",
        username: "companyHR",
        Quyen_id: 2, // Assume 2 is the ID for employers
        Trangthai: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "developer2@tech.com",
        password: "hashed_password_3",
        username: "devUser2",
        Quyen_id: 3,
        Trangthai: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "developer3@tech.com",
        password: "hashed_password_4",
        username: "devUser3",
        Quyen_id: 3,
        Trangthai: "inactive",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "ceo@startup.com",
        password: "hashed_password_5",
        username: "startupCEO",
        Quyen_id: 2,
        Trangthai: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "admin@itjobs.com",
        password: "hashed_password_6",
        username: "siteAdmin",
        Quyen_id: 1, // Assume 1 is the ID for admins
        Trangthai: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "developer4@tech.com",
        password: "hashed_password_7",
        username: "devUser4",
        Quyen_id: 3,
        Trangthai: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "cto@enterprise.com",
        password: "hashed_password_8",
        username: "enterpriseCTO",
        Quyen_id: 2,
        Trangthai: "inactive",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "developer5@tech.com",
        password: "hashed_password_9",
        username: "devUser5",
        Quyen_id: 3,
        Trangthai: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "support@itjobs.com",
        password: "hashed_password_10",
        username: "supportTeam",
        Quyen_id: 1,
        Trangthai: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Nguoidung", null, {});
  },
};
