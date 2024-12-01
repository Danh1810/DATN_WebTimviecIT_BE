const db = require("../models/index");

const getAllLSTT = async () => {
  const res = await db.Lichsuthanhtoan.findAll({});
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
      attributes: ["id", "URL", "description"],
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
const axios = require("axios");
const env = require("dotenv");
env.config();

const create = async (data) => {
  const fee = await db.Nhatuyendung.findOne({
    where: {
      id: data.id,
    },
    raw: true,
    nest: true,
  });
  const { id, sotien, soluong, ma, MaTT, goimua, ten } = data; // Lấy giá trị từ `data`

  // Kiểm tra trạng thái hoặc điều kiện khác nếu cần

  if (fee && +fee.status != 1) {
    var accessKey = process.env.accessKey;
    var secretKey = process.env.secretKey;
    var orderInfo = ten;
    var partnerCode = "MOMO";
    var redirectUrl = process.env.redirectUrl;
    var ipnUrl = process.env.ipnUrl;
    var requestType = process.env.requestType;
    // var requestType = "captureWallet";
    var amount = sotien;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = btoa(data.id);
    var orderGroupId = "";
    var autoCapture = true;
    var lang = "vi";

    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature
    const crypto = require("crypto");
    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
      soluong, // Gửi thêm thông tin số lượng
      MaTT, // Gửi thêm mã thanh toán
      goimua, // Gửi thêm gói mua
    });

    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };
    try {
      const result = await axios(options);
      return { status: 200, message: "success", code: 0, data: result.data };
    } catch (error) {
      return { status: 500, message: "success", code: -1, data: error };
    }
  }
  return { status: 404, code: 1, message: "Fee not found", data: "" };
};
const callback = async (data) => {
  try {
    console.log(data);
    if (data.resultCode == 0) {
      let time = new Date(data.responseTime);
      console.log(
        time,
        data.extraData,
        data.orderInfo,
        data.orderType,
        data.payType
      );
      const update = await db.Lichsuthanhtoan.create({
        MaTT: data.MaTT,
        MaNTD: data.extraData,
        sotien: data.amount,
        Soluongmua: data.soluong,
        // goimua:data.goimua
      });
      if (update) {
        return { status: 200, message: "success", code: 0, data: data };
      }
    }
    return { status: 200, message: "success", code: 1, data: data };
  } catch (error) {
    return { status: 500, message: "success", code: -1, data: error };
  }
};

module.exports = {
  getAllLSTT,
  getLSTTById,
  createLSTT,
  updateLSTT,
  XoaLSTT,
  create,
  callback,
};
