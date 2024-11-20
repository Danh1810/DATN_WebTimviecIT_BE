"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Nguoitimviec", [
      {
        anhDaiDien: "https://example.com/images/1.jpg",
        hoVaTen: "Nguyen A",
        ngaySinh: new Date(1990, 0, 1),
        thanhPho: "Hanoi",
        diaChi: "123 ABC Street",
        gioiTinh: "Nam",
        soDienThoai: "0912345678",
        MaND: 1,
      },
      {
        anhDaiDien: "https://example.com/images/2.jpg",
        hoVaTen: "Tran B",
        ngaySinh: new Date(1992, 4, 23),
        thanhPho: "Ho Chi Minh City",
        diaChi: "456 DEF Avenue",
        gioiTinh: "Nu",
        soDienThoai: "0987654321",
        MaND: 2,
      },
      {
        anhDaiDien: "https://example.com/images/3.jpg",
        hoVaTen: "Le C",
        ngaySinh: new Date(1988, 9, 15),
        thanhPho: "Da Nang",
        diaChi: "789 GHI Road",
        gioiTinh: "Nam",
        soDienThoai: "0976543210",
        MaND: 3,
      },
      {
        anhDaiDien: "https://example.com/images/4.jpg",
        hoVaTen: "Pham D",
        ngaySinh: new Date(1995, 6, 5),
        thanhPho: "Hai Phong",
        diaChi: "101 JKL Lane",
        gioiTinh: "Nu",
        soDienThoai: "0932468135",
        MaND: 4,
      },
      {
        anhDaiDien: "https://example.com/images/5.jpg",
        hoVaTen: "Hoang E",
        ngaySinh: new Date(1993, 8, 22),
        thanhPho: "Can Tho",
        diaChi: "202 MNO Street",
        gioiTinh: "Nam",
        soDienThoai: "0909876543",
        MaND: 5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Nguoitimviec", null, {});
  },
};
