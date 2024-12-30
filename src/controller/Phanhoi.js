const phanHoiService = require("../services/Phanhoi");
const db = require("../models/index");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

const getAllPhanHoi = async (req, res) => {
  try {
    const result = await phanHoiService.getAllPhanHoi();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const getPhanHoiByUngTuyen = async (req, res) => {
  const idUngTuyen = req.params.idUngTuyen;
  try {
    const result = await phanHoiService.getPhanHoiByUngTuyen(idUngTuyen);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const getPhanHoiById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await phanHoiService.getPhanHoiById(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const createPhanHoi = async (req, res) => {
  const { idUngTuyen, noiDung } = req.body;
  console.log("🚀 ~ createPhanHoi ~ req.body:", req.body);
  const filedinhkem = req.fileUrl;

  try {
    // Find the application and get related user info
    const ungtuyen = await db.Ungtuyen.findOne({
      where: { id: idUngTuyen },
      include: [
        {
          model: db.Hosocanhan,
          as: "UT_NTV",
          include: [
            {
              model: db.Nguoitimviec,
              as: "nguoitimviec",
              include: [
                {
                  model: db.Nguoidung,
                  as: "NTV_ND",
                },
              ],
            },
          ],
        },
        {
          model: db.Tintuyendung,
          as: "UT_TTD",
          attributes: ["tieude"],
        },
      ],
    });

    if (!ungtuyen) {
      console.log("🚀 ~ createPhanHoi ~ ungtuyen:", ungtuyen);
      return res.status(404).json({
        status: 404,
        message: "Không tìm thấy đơn ứng tuyển",
      });
    }

    const userEmail = ungtuyen.UT_NTV.nguoitimviec.NTV_ND.email;
    const userName = ungtuyen.UT_NTV.nguoitimviec.hoVaTen;
    const jobTitle = ungtuyen.UT_TTD.tieude;

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    // Create email content
    const mailOptions = {
      from: process.env.email,
      to: userEmail,
      subject: "Phản hồi đơn ứng tuyển",
      html: `
        <p>Chào ${userName},</p>
        <p>Bạn có phản hồi mới cho đơn ứng tuyển vị trí <strong>${jobTitle}</strong></p>
        <p>Nội dung phản hồi:</p>
        <p>${noiDung}</p>
        ${filedinhkem ? `<p>File đính kèm: ${filedinhkem}</p>` : ""}
        <p>Trân trọng,</p>
        <p>Đội ngũ tuyển dụng</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Create feedback record
    const result = await phanHoiService.createPhanHoi({
      idUngTuyen,
      noiDung,
      filedinhkem,
    });

    // Update application status
    await db.Ungtuyen.update(
      { trangthai: "Đã phản hồi" },
      {
        where: {
          id: idUngTuyen,
        },
      }
    );

    res.status(result.status).json(result);
  } catch (error) {
    console.error("Error in createPhanHoi:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const updatePhanHoi = async (req, res) => {
  const data = req.body;
  try {
    const result = await phanHoiService.updatePhanHoi(data);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

const deletePhanHoi = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await phanHoiService.deletePhanHoi(id);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPhanHoi,
  getPhanHoiByUngTuyen,
  getPhanHoiById,
  createPhanHoi,
  updatePhanHoi,
  deletePhanHoi,
};
