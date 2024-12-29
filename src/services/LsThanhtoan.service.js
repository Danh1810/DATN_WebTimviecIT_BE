const db = require("../models/index");

const getAllLSTT = async () => {
  const res = await db.Lichsuthanhtoan.findAll({
    include: [{ model: db.Nguoidung, as: "users" }],
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const createLSTT = async (data) => {
  try {
    const res = await db.Lichsuthanhtoan.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const updateLSTT = async (data) => {
  console.log(data);
  const res = await db.Lichsuthanhtoan.update(data, {
    where: { id: data.id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const XoaLSTT = async (id) => {
  const res = await db.Lichsuthanhtoan.destroy({
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const getLSTTById = async (id) => {
  try {
    const res = await db.Lichsuthanhtoan.findOne({
      where: { id: id },
      include: [{ model: db.Nguoidung, as: "users" }],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: -1, message: "error", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getLSTTByNTDId = async (id) => {
  console.log("🚀 ~ getLSTTByNTDId ~ id:", id);
  try {
    const res = await db.Lichsuthanhtoan.findAll({
      where: { MaNTT: id },
      include: [
        {
          model: db.Nguoidung,
          as: "users",
          include: [
            {
              model: db.Nhatuyendung,
              as: "ND_NTD",
            },
          ],
        },
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: -1, message: "error", data: "" };
    }
  } catch (error) {
    console.error("🚀 ~ getLSTTByNTDId ~ error:", error);
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

const axios = require("axios");
const crypto = require("crypto");
const env = require("dotenv");
env.config();

const create = async (data, res) => {
  try {
    console.log("🚀 ~ Initiating Payment ~ Data:", data);

    const fee = await db.Nhatuyendung.findOne({
      where: { MaND: data.id },
      raw: true,
      nest: true,
    });

    if (!fee || +fee.status === 1) {
      return res.status(404).json({
        status: 404,
        code: 1,
        message: "Fee not found or invalid",
        data: null,
      });
    }

    const { sotien } = data;
    const { accessKey, secretKey, redirectUrl, ipnUrl, requestType } =
      process.env;

    if (!accessKey || !secretKey || !redirectUrl || !ipnUrl) {
      throw new Error("Missing required environment variables");
    }
    console.log("🔧 Environment Variables:");
    console.log({
      accessKey: process.env.accessKey,
      secretKey: process.env.secretKey,
      redirectUrl: process.env.redirectUrl,
      ipnUrl: process.env.ipnUrl,
      requestType: process.env.requestType,
    });

    const partnerCode = "MOMO";
    const orderId = `${partnerCode}${Date.now()}`;
    const requestId = orderId;
    const extraData = Buffer.from(fee.id.toString()).toString("base64");
    const amount = Number(sotien);
    // Generate raw signature
    const rawSignature = `accessKey=${accessKey}&amount=${sotien}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${
      fee.ten
    }&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${
      requestType || "captureWallet"
    }`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    console.log("🔑 ~ Signature:", signature);

    // Build request body
    const requestBody = {
      partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId,
      amount: amount,
      orderId,
      orderInfo: fee.ten,
      redirectUrl,
      ipnUrl,
      lang: "vi",
      requestType: requestType || "captureWallet",
      autoCapture: true,
      extraData,
      signature,
    };

    console.log("📤 ~ Request Body:", requestBody);

    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(requestBody)),
      },
      data: requestBody,
    };

    console.log("📤 Final Request Body:", JSON.stringify(requestBody, null, 2));
    console.log("📤 Request Options:", options);
    // Send request to MoMo
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error("MoMo API Error Response:", error.response.data);
      return res.status(error.response.status).json({
        statusCode: error.response.status,
        message: error.response.data?.message || "Server Error",
        error: error.response.data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No Response Received:", error.request);
      return res.status(500).json({
        statusCode: 500,
        message: "No response from MoMo API. Please try again later.",
      });
    } else {
      // Something happened while setting up the request
      console.error("Request Setup Error:", error.message);
      return res.status(500).json({
        statusCode: 500,
        message: error.message,
      });
    }
  }
};

const callback = async (data) => {
  console.log("📥 ~ Callback Data Received:", data);

  // try {
  //   if (data.resultCode === 0) {
  //     const time = new Date(data.responseTime);
  //     console.log("⏱ ~ Payment Details:", {
  //       time,
  //       extraData: data.extraData,
  //       orderInfo: data.orderInfo,
  //       orderType: data.orderType,
  //       payType: data.payType,
  //     });

  //     // Record payment in the database
  //     const update = await db.Lichsuthanhtoan.create({
  //       MaTT: data.MaTT,
  //       sotien: data.amount,
  //       Soluongmua: data.soluong || 1, // Default to 1 if not provided
  //       goimua: data.goimua || null, // Add if part of schema
  //     });

  //     if (update) {
  //       return {
  //         status: 200,
  //         message: "Payment recorded successfully",
  //         code: 0,
  //         data,
  //       };
  //     }
  //   }

  //   return {
  //     status: 200,
  //     message: "Payment processed without updates",
  //     code: 1,
  //     data,
  //   };
  // } catch (error) {
  //   console.error("❌ Callback Error:", error.message);
  //   return {
  //     status: 500,
  //     message: "Internal server error",
  //     code: -1,
  //     data: error.message || error,
  //   };
  // }
};

module.exports = {
  getAllLSTT,
  getLSTTById,
  createLSTT,
  updateLSTT,
  XoaLSTT,
  create,
  callback,
  getLSTTByNTDId,
};
