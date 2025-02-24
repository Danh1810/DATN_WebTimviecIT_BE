"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Hosocanhan", [
      {
        tenhoso: "Hồ sơ 1",
        kyNangLapTrinh: JSON.stringify(["JavaScript", "Node.js", "React"]),
        capBacHienTai: "Junior Developer",
        mucTieuNgheNghiep: "Phát triển kỹ năng lập trình web",
        kinhNghiemLamViec: "2 năm kinh nghiệm tại công ty ABC",
        trinhDoHocVan: "Cử nhân CNTT",
        chungChiNgheNghiep: "Chứng chỉ Node.js",
        duAnDaThamGia: "Dự án X, Dự án Y",
        fileHoso: "https://example.com/hoso1",
        ngayCapNhat: new Date(),
        NguoitimviecId: 1, // Giả sử đây là ID của người tìm việc
      },
      {
        tenhoso: "Hồ sơ 2",
        kyNangLapTrinh: JSON.stringify(["Python", "Django"]),
        capBacHienTai: "Mid-Level Developer",
        mucTieuNgheNghiep: "Trở thành chuyên gia về web backend",
        kinhNghiemLamViec: "3 năm kinh nghiệm tại công ty XYZ",
        trinhDoHocVan: "Thạc sĩ CNTT",
        chungChiNgheNghiep: "Chứng chỉ Python",
        duAnDaThamGia: "Dự án A, Dự án B",
        fileHoso: "https://example.com/hoso2",
        ngayCapNhat: new Date(),
        NguoitimviecId: 2, // Giả sử đây là ID của người tìm việc
      },
      {
        tenhoso: "Hồ sơ 3",
        kyNangLapTrinh: JSON.stringify(["Java", "Spring Boot"]),
        capBacHienTai: "Senior Developer",
        mucTieuNgheNghiep: "Lãnh đạo nhóm phát triển phần mềm",
        kinhNghiemLamViec: "5 năm kinh nghiệm tại công ty DEF",
        trinhDoHocVan: "Cử nhân CNTT",
        chungChiNgheNghiep: "Chứng chỉ Java",
        duAnDaThamGia: "Dự án M, Dự án N",
        fileHoso: "https://example.com/hoso3",
        ngayCapNhat: new Date(),
        NguoitimviecId: 3, // Giả sử đây là ID của người tìm việc
      },
      {
        tenhoso: "Hồ sơ 4",
        kyNangLapTrinh: JSON.stringify(["PHP", "Laravel"]),
        capBacHienTai: "Junior Developer",
        mucTieuNgheNghiep: "Làm việc với các dự án lớn hơn",
        kinhNghiemLamViec: "1 năm kinh nghiệm tại công ty GHI",
        trinhDoHocVan: "Cử nhân Khoa học máy tính",
        chungChiNgheNghiep: "Chứng chỉ PHP",
        duAnDaThamGia: "Dự án P",
        fileHoso: "https://example.com/hoso4",
        ngayCapNhat: new Date(),
        NguoitimviecId: 4, // Giả sử đây là ID của người tìm việc
      },
      {
        tenhoso: "Hồ sơ 5",
        kyNangLapTrinh: JSON.stringify(["Go", "Docker"]),
        capBacHienTai: "Mid-Level Developer",
        mucTieuNgheNghiep: "Chuyên gia DevOps",
        kinhNghiemLamViec: "3 năm kinh nghiệm tại công ty JKL",
        trinhDoHocVan: "Thạc sĩ Công nghệ phần mềm",
        chungChiNgheNghiep: "Chứng chỉ Go",
        duAnDaThamGia: "Dự án Q, Dự án R",
        fileHoso: "https://example.com/hoso5",
        ngayCapNhat: new Date(),
        NguoitimviecId: 5, // Giả sử đây là ID của người tìm việc
      },
      {
        tenhoso: "Hồ sơ 6",
        kyNangLapTrinh: JSON.stringify(["Ruby", "Rails"]),
        capBacHienTai: "Junior Developer",
        mucTieuNgheNghiep: "Làm việc trong môi trường năng động",
        kinhNghiemLamViec: "2 năm kinh nghiệm tại công ty MNO",
        trinhDoHocVan: "Cử nhân Công nghệ phần mềm",
        chungChiNgheNghiep: "Chứng chỉ Ruby",
        duAnDaThamGia: "Dự án S",
        fileHoso: "https://example.com/hoso6",
        ngayCapNhat: new Date(),
        NguoitimviecId: 1,
      },
      {
        tenhoso: "Hồ sơ 7",
        kyNangLapTrinh: JSON.stringify(["C#", "ASP.NET"]),
        capBacHienTai: "Senior Developer",
        mucTieuNgheNghiep: "Lãnh đạo dự án phần mềm",
        kinhNghiemLamViec: "6 năm kinh nghiệm tại công ty STU",
        trinhDoHocVan: "Thạc sĩ Công nghệ phần mềm",
        chungChiNgheNghiep: "Chứng chỉ .NET",
        duAnDaThamGia: "Dự án T, Dự án U",
        fileHoso: "https://example.com/hoso7",
        ngayCapNhat: new Date(),
        NguoitimviecId: 2,
      },
      {
        tenhoso: "Hồ sơ 8",
        kyNangLapTrinh: JSON.stringify(["Swift", "iOS"]),
        capBacHienTai: "Mid-Level Developer",
        mucTieuNgheNghiep: "Phát triển ứng dụng di động",
        kinhNghiemLamViec: "3 năm kinh nghiệm tại công ty VWX",
        trinhDoHocVan: "Cử nhân Khoa học máy tính",
        chungChiNgheNghiep: "Chứng chỉ iOS",
        duAnDaThamGia: "Dự án W",
        fileHoso: "https://example.com/hoso8",
        ngayCapNhat: new Date(),
        NguoitimviecId: 3,
      },
      {
        tenhoso: "Hồ sơ 9",
        kyNangLapTrinh: JSON.stringify(["Android", "Kotlin"]),
        capBacHienTai: "Junior Developer",
        mucTieuNgheNghiep: "Làm việc trong môi trường phát triển di động",
        kinhNghiemLamViec: "1 năm kinh nghiệm tại công ty XYZ",
        trinhDoHocVan: "Cử nhân CNTT",
        chungChiNgheNghiep: "Chứng chỉ Android",
        duAnDaThamGia: "Dự án X, Dự án Z",
        fileHoso: "https://example.com/hoso9",
        ngayCapNhat: new Date(),
        NguoitimviecId: 4,
      },
      {
        tenhoso: "Hồ sơ 10",
        kyNangLapTrinh: JSON.stringify(["JavaScript", "Vue.js"]),
        capBacHienTai: "Mid-Level Developer",
        mucTieuNgheNghiep: "Trở thành chuyên gia về frontend",
        kinhNghiemLamViec: "4 năm kinh nghiệm tại công ty ABC",
        trinhDoHocVan: "Thạc sĩ CNTT",
        chungChiNgheNghiep: "Chứng chỉ Vue.js",
        duAnDaThamGia: "Dự án F",
        fileHoso: "https://example.com/hoso10",
        ngayCapNhat: new Date(),
        NguoitimviecId: 5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Hosocanhan", null, {});
  },
};
