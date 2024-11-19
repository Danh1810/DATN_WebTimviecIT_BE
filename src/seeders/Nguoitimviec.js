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
      },
      {
        anhDaiDien: "https://example.com/images/2.jpg",
        hoVaTen: "Tran B",
        ngaySinh: new Date(1992, 4, 23),
        thanhPho: "Ho Chi Minh City",
        diaChi: "456 DEF Avenue",
        gioiTinh: "Nu",
        soDienThoai: "0987654321",
      },
      {
        anhDaiDien: "https://example.com/images/3.jpg",
        hoVaTen: "Le C",
        ngaySinh: new Date(1988, 9, 15),
        thanhPho: "Da Nang",
        diaChi: "789 GHI Road",
        gioiTinh: "Nam",
        soDienThoai: "0976543210",
      },
      {
        anhDaiDien: "https://example.com/images/4.jpg",
        hoVaTen: "Pham D",
        ngaySinh: new Date(1995, 6, 5),
        thanhPho: "Hai Phong",
        diaChi: "101 JKL Lane",
        gioiTinh: "Nu",
        soDienThoai: "0932468135",
      },
      {
        anhDaiDien: "https://example.com/images/5.jpg",
        hoVaTen: "Hoang E",
        ngaySinh: new Date(1993, 8, 22),
        thanhPho: "Can Tho",
        diaChi: "202 MNO Street",
        gioiTinh: "Nam",
        soDienThoai: "0909876543",
      },
      {
        anhDaiDien: "https://example.com/images/6.jpg",
        hoVaTen: "Nguyen F",
        ngaySinh: new Date(1991, 3, 10),
        thanhPho: "Hanoi",
        diaChi: "303 PQR Avenue",
        gioiTinh: "Nu",
        soDienThoai: "0913487582",
      },
      {
        anhDaiDien: "https://example.com/images/7.jpg",
        hoVaTen: "Vu G",
        ngaySinh: new Date(1994, 2, 8),
        thanhPho: "Ho Chi Minh City",
        diaChi: "404 STU Street",
        gioiTinh: "Nam",
        soDienThoai: "0902546721",
      },
      {
        anhDaiDien: "https://example.com/images/8.jpg",
        hoVaTen: "Duong H",
        ngaySinh: new Date(1987, 11, 30),
        thanhPho: "Da Nang",
        diaChi: "505 VWX Road",
        gioiTinh: "Nu",
        soDienThoai: "0938657412",
      },
      {
        anhDaiDien: "https://example.com/images/9.jpg",
        hoVaTen: "Le I",
        ngaySinh: new Date(1996, 1, 18),
        thanhPho: "Hai Phong",
        diaChi: "606 YZA Lane",
        gioiTinh: "Nam",
        soDienThoai: "0906728531",
      },
      {
        anhDaiDien: "https://example.com/images/10.jpg",
        hoVaTen: "Pham J",
        ngaySinh: new Date(1992, 5, 3),
        thanhPho: "Can Tho",
        diaChi: "707 BCD Road",
        gioiTinh: "Nu",
        soDienThoai: "0917654321",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Nguoitimviec", null, {});
  },
};
