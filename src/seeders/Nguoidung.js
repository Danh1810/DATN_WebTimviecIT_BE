"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Nguoidung", [
      {
        email: "developer1@tech.com",
        password: "hashed_password_1", // Assume this is a hashed password
        username: "devUser1",
        MaQuyen: 3, // Assume 3 is the ID for job seekers
        Trangthai: "active",
      },
      {
        email: "hr@company.com",
        password: "hashed_password_2",
        username: "companyHR",
        MaQuyen: 3, // Assume 2 is the ID for employers
        Trangthai: "active",
      },
      {
        email: "developer2@tech.com",
        password: "hashed_password_3",
        username: "devUser2",
        MaQuyen: 3,
        Trangthai: "active",
      },
      {
        email: "developer3@tech.com",
        password: "hashed_password_4",
        username: "devUser3",
        MaQuyen: 3,
        Trangthai: "inactive",
      },
      {
        email: "ceo@startup.com",
        password: "hashed_password_5",
        username: "startupCEO",
        MaQuyen: 3,
        Trangthai: "active",
      },
      {
        email: "admin@itjobs.com",
        password: "hashed_password_6",
        username: "siteAdmin",
        MaQuyen: 2, // Assume 1 is the ID for admins
        Trangthai: "active",
      },
      {
        email: "developer4@tech.com",
        password: "hashed_password_7",
        username: "devUser4",
        MaQuyen: 2,
        Trangthai: "active",
      },
      {
        email: "cto@enterprise.com",
        password: "hashed_password_8",
        username: "enterpriseCTO",
        MaQuyen: 2,
        Trangthai: "inactive",
      },
      {
        email: "developer5@tech.com",
        password: "hashed_password_9",
        username: "devUser5",
        MaQuyen: 2,
        Trangthai: "active",
      },
      {
        email: "support@itjobs.com",
        password: "hashed_password_10",
        username: "supportTeam",
        MaQuyen: 2,
        Trangthai: "active",
      },
      {
        email: "support@itjobs.com",
        password: "hashed_password_10",
        username: "supportTeam",
        MaQuyen: 2,
        Trangthai: "active",
      },
      {
        email: "support@itjobs.com",
        password: "hashed_password_10",
        username: "supportTeam",
        MaQuyen: 2,
        Trangthai: "active",
      },
      {
        email: "support@itjobs.com",
        password: "hashed_password_10",
        username: "supportTeam",
        MaQuyen: 2,
        Trangthai: "active",
      },
      {
        email: "support@itjobs.com",
        password: "hashed_password_10",
        username: "supportTeam",
        MaQuyen: 2,
        Trangthai: "active",
      },
      {
        email: "support@itjobs.com",
        password: "hashed_password_10",
        username: "supportTeam",
        MaQuyen: 2,
        Trangthai: "active",
      },
      {
        email: "admin@itjobs.com",
        password: "hashed_password_10",
        username: "supportTeam",
        MaQuyen: 1,
        Trangthai: "active",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Nguoidung", null, {});
  },
};
