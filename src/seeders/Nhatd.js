"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Nhatuyendung", [
      {
        ten: "Công ty FPT Software",
        email: "contact@fpt-software.vn",
        sdt: "02473002222",
        diachi: "FPT Tower, Cầu Giấy, Hà Nội",
        MaND: 6, // Assume this ID corresponds to a user in Nguoidung
        logo: "fpt_logo.png",
      },
      {
        ten: "Công ty Viettel Digital",
        email: "hr@viettel-digital.vn",
        sdt: "02462556789",
        diachi: "Số 1 Trần Hữu Dực, Mỹ Đình, Hà Nội",
        MaND: 7,
        logo: "viettel_logo.png",
      },
      {
        ten: "Công ty TMA Solutions",
        email: "info@tma.vn",
        sdt: "02854345555",
        diachi: "Quận 12, TP.HCM",
        MaND: 8,
        logo: "tma_logo.png",
      },
      {
        ten: "Công ty VinBrain",
        email: "jobs@vinbrain.com",
        sdt: "02437718888",
        diachi: "Tòa nhà Landmark 81, Bình Thạnh, TP.HCM",
        MaND: 9,
        logo: "vinbrain_logo.png",
      },
      {
        ten: "Công ty NashTech Vietnam",
        email: "contact@nashtech.vn",
        sdt: "02873002233",
        diachi: "Etown 1, Tân Bình, TP.HCM",
        MaND: 10,
        logo: "nashtech_logo.png",
      },
      {
        ten: "Công ty Rikkeisoft",
        email: "info@rikkeisoft.com",
        sdt: "02432030088",
        diachi: "Tòa nhà Keangnam, Nam Từ Liêm, Hà Nội",
        MaND: 11,
        logo: "rikkeisoft_logo.png",
      },
      {
        ten: "Công ty Axon Active",
        email: "admin@axonactive.vn",
        sdt: "02838689898",
        diachi: "Quận 3, TP.HCM",
        MaND: 12,
        logo: "axon_logo.png",
      },
      {
        ten: "Công ty VNG Corporation",
        email: "jobs@vng.com.vn",
        sdt: "02839288888",
        diachi: "Tòa nhà Flemington, Quận 11, TP.HCM",
        MaND: 13,
        logo: "vng_logo.png",
      },
      {
        ten: "Công ty FPT Telecom",
        email: "careers@fpttelecom.vn",
        sdt: "02473001111",
        diachi: "Tòa nhà FPT, Cầu Giấy, Hà Nội",
        MaND: 14,
        logo: "fpttelecom_logo.png",
      },
      {
        ten: "Công ty KMS Technology",
        email: "hello@kms-technology.com",
        sdt: "02838101010",
        diachi: "Tòa nhà ETown 2, Tân Bình, TP.HCM",
        MaND: 15,
        logo: "kms_logo.png",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Nhatuyendung", null, {});
  },
};
