"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Nguoitimviec",
      [
        {
          email: "user1@example.com",
          ten: "User One",
          SDT: "0123456789",
          Nguoidung_id: 1,
          gioitinh: 1,
          fileCV: "user1_cv.pdf",
          Soluongnophoso: 3,
        },
        {
          email: "user2@example.com",
          ten: "User Two",
          SDT: "0987654321",
          Nguoidung_id: 2,
          gioitinh: 2,
          fileCV: "user2_cv.pdf",
          Soluongnophoso: 5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Nguoitimviec", null, {});
  },
};
