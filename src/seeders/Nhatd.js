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
        linhvuc: "Phần mềm",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579560/FPTSOFT-Logo-new-NVf2j_nu92lb.png",
        MaND: 6,
      },
      {
        ten: "Công ty Viettel Digital",
        email: "hr@viettel-digital.vn",
        sdt: "02462556789",
        diachi: "Số 1 Trần Hữu Dực, Mỹ Đình, Hà Nội",
        linhvuc: "Viễn thông",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579560/TopDev-Asset-15-1643008749_ic62kd.png",
        MaND: 7,
      },
      {
        ten: "Công ty TMA Solutions",
        email: "info@tma.vn",
        sdt: "02854345555",
        diachi: "Quận 12, TP.HCM",
        linhvuc: "Gia công phần mềm",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579560/TMA_cl4dmk.png",
        MaND: 8,
      },
      {
        ten: "Công ty VinBrain",
        email: "jobs@vinbrain.com",
        sdt: "02437718888",
        diachi: "Tòa nhà Landmark 81, Bình Thạnh, TP.HCM",
        linhvuc: "AI & Healthcare",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579561/vinbarain_xssfzy.jpg",
        MaND: 9,
      },
      {
        ten: "Công ty NashTech Vietnam",
        email: "contact@nashtech.vn",
        sdt: "02873002233",
        diachi: "Etown 1, Tân Bình, TP.HCM",
        linhvuc: "Phần mềm",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579560/nashtech_ognqwd.png",
        MaND: 10,
      },
      {
        ten: "Công ty Rikkeisoft",
        email: "info@rikkeisoft.com",
        sdt: "02432030088",
        diachi: "Tòa nhà Keangnam, Nam Từ Liêm, Hà Nội",
        linhvuc: "Gia công phần mềm",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579560/rik_xw0r3a.jpg",
        MaND: 11,
      },
      {
        ten: "Công ty Axon Active",
        email: "admin@axonactive.vn",
        sdt: "02838689898",
        diachi: "Quận 3, TP.HCM",
        linhvuc: "Phát triển phần mềm",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579560/axon_mtev7r.jpg",
        MaND: 12,
      },
      {
        ten: "Công ty VNG Corporation",
        email: "jobs@vng.com.vn",
        sdt: "02839288888",
        diachi: "Tòa nhà Flemington, Quận 11, TP.HCM",
        linhvuc: "Công nghệ thông tin",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579560/9c8d9f666ca55b657e57cb6db010563f_t2jz33.png",
        MaND: 13,
      },
      {
        ten: "Công ty FPT Telecom",
        email: "careers@fpttelecom.vn",
        sdt: "02473001111",
        diachi: "Tòa nhà FPT, Cầu Giấy, Hà Nội",
        linhvuc: "Viễn thông",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579560/telecom_qkuu0h.png",
        MaND: 14,
      },
      {
        ten: "Công ty KMS Technology",
        email: "hello@kms-technology.com",
        sdt: "02838101010",
        diachi: "Tòa nhà ETown 2, Tân Bình, TP.HCM",
        linhvuc: "Phần mềm",
        logo: "https://res.cloudinary.com/dlxczbtva/image/upload/v1731579560/kms_nuxhd3.png",
        MaND: 15,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Nhatuyendung", null, {});
  },
};
