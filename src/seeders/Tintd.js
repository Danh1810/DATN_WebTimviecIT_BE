"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tintuyendung", [
      {
        tieude: "Kỹ sư Phần mềm",
        mota: "Tham gia vào đội ngũ năng động của chúng tôi để phát triển các giải pháp phần mềm sáng tạo.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        MaNTD: 1,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hồ Chí Minh",
        kinhNghiem: "2-3 năm",
        mucluong: "70,000,000 - 90,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Lập trình viên Frontend",
        mota: "Chúng tôi cần tìm kiếm một lập trình viên frontend có kỹ năng để phát triển các ứng dụng khách hàng.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        MaNTD: 2,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hà Nội",
        kinhNghiem: "2-3 năm",
        mucluong: "60,000,000 - 80,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Lập trình viên Backend",
        mota: "Tham gia vào đội ngũ backend của chúng tôi và làm việc với các công nghệ hiện đại.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        MaNTD: 3,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hà Nội",
        kinhNghiem: "2-3 năm",
        mucluong: "75,000,000 - 95,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Chuyên viên Phân tích Dữ liệu",
        mota: "Phân tích các tập dữ liệu lớn để tạo ra những thông tin có giá trị cho công ty.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        MaNTD: 4,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Đà Nẵng",
        kinhNghiem: "2-3 năm",
        mucluong: "85,000,000 - 105,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Lập trình viên Full Stack",
        mota: "Cơ hội dành cho một lập trình viên full stack gia nhập đội ngũ sáng tạo của chúng tôi.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        MaNTD: 5,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hồ Chí Minh",
        kinhNghiem: "2-3 năm",
        mucluong: "80,000,000 - 100,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Kỹ sư DevOps",
        mota: "Cần tuyển một kỹ sư DevOps có kinh nghiệm.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        MaNTD: 6,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Đà Nẵng",
        kinhNghiem: "2-3 năm",
        mucluong: "90,000,000 - 110,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Quản lý Dự án",
        mota: "Quản lý nhiều dự án CNTT với một đội ngũ nhân sự tài năng.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        MaNTD: 7,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Đà Nẵng",
        kinhNghiem: "2-3 năm",
        mucluong: "100,000,000 - 120,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Thiết kế UX/UI",
        mota: "Tạo ra những trải nghiệm người dùng đặc biệt với vai trò thiết kế UX/UI.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        MaNTD: 8,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hà Nội",
        kinhNghiem: "2-3 năm",
        mucluong: "65,000,000 - 85,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Chủ sản phẩm",
        mota: "Dẫn dắt quá trình phát triển sản phẩm từ ý tưởng đến triển khai.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        MaNTD: 9,
        trangthai: "Đã duyệt",
        mucluong: "95,000,000 - 115,000,000 VND",
        Ngaytao: new Date(),
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hồ Chí Minh",
        kinhNghiem: "2-3 năm",
      },
      {
        tieude: "Hỗ trợ kỹ thuật",
        mota: "Cung cấp hỗ trợ kỹ thuật cho khách hàng của chúng tôi.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        MaNTD: 10,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Đà Nẵng",
        kinhNghiem: "2-3 năm",
        mucluong: "50,000,000 - 70,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Chuyên viên phân tích nghiệp vụ",
        mota: "Phân tích nhu cầu của doanh nghiệp và chuyển đổi chúng thành các yêu cầu kỹ thuật.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        MaNTD: 1,
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hồ Chí Minh",
        kinhNghiem: "2-3 năm",
        trangthai: "Đã duyệt",
        mucluong: "70,000,000 - 90,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Lập trình viên Mobile",
        mota: "Phát triển các ứng dụng di động tiên tiến với đội ngũ của chúng tôi.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        MaNTD: 2,
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Đà Nẵng",
        kinhNghiem: "2-3 năm",
        trangthai: "Đã duyệt",
        mucluong: "85,000,000 - 105,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Kỹ sư An ninh Mạng",
        mota: "Đảm bảo an toàn cho hệ thống mạng của tổ chức.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        MaNTD: 3,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hồ Chí Minh",
        kinhNghiem: "2-3 năm",
        mucluong: "95,000,000 - 115,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Quản trị Hệ thống",
        mota: "Duy trì và hỗ trợ các hệ thống CNTT nội bộ của chúng tôi.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        MaNTD: 4,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hà Nội",
        kinhNghiem: "2-3 năm",
        mucluong: "75,000,000 - 95,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Quản trị Cơ sở Dữ liệu",
        mota: "Quản lý và bảo vệ các tài sản dữ liệu của chúng tôi.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        MaNTD: 5,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Đà Nẵng",
        kinhNghiem: "2-3 năm",
        mucluong: "85,000,000 - 105,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Kỹ thuật viên IT",
        mota: "Hỗ trợ kỹ thuật và bảo trì hệ thống máy tính và mạng.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        MaNTD: 6,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hà Nội",
        kinhNghiem: "2-3 năm",
        mucluong: "55,000,000 - 75,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Tester Chất lượng",
        mota: "Đảm bảo chất lượng và độ tin cậy của các ứng dụng.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        MaNTD: 7,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hồ Chí Minh",
        kinhNghiem: "2-3 năm",
        mucluong: "65,000,000 - 85,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Chuyên viên An ninh Mạng",
        mota: "Bảo vệ cơ sở hạ tầng kỹ thuật số của chúng tôi khỏi các mối đe dọa.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        MaNTD: 8,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Đà Nẵng",
        kinhNghiem: "2-3 năm",
        mucluong: "90,000,000 - 110,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Kỹ sư AI/ML",
        mota: "Phát triển và triển khai các mô hình học máy.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        MaNTD: 9,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Hà Nội",
        kinhNghiem: "2-3 năm",
        mucluong: "120,000,000 - 140,000,000 VND",
        Ngaytao: new Date(),
      },
      {
        tieude: "Kiến trúc sư Giải pháp Đám mây",
        mota: "Thiết kế các giải pháp đám mây theo nhu cầu của khách hàng.",
        Ngayhethan: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        MaNTD: 10,
        trangthai: "Đã duyệt",
        loaiHopdong: "Toàn thời gian",
        diaChiLamviec: "Đà Nẵng",
        kinhNghiem: "2-3 năm",
        mucluong: "105,000,000 - 125,000,000 VND",
        Ngaytao: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tintuyendung", null, {});
  },
};
