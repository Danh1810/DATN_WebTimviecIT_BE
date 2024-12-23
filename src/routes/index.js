const { Router } = require("express");
const passport = require("passport");
let express = require("express");
let $ = require("jquery");
const request = require("request");
const moment = require("moment");
const dayjs = require("dayjs");
const db = require("../models/index.js");

const { checkUserJWT, checkUserPermission } = require("../middleware/JWT.js");
const authController = require("../controller/Authcontroller.js");
const emCtl = require("../controller/NhatdController.js");
const jbpCtl = require("../controller/TintdController.js");
const Capbacroute = require("../routes/Capbac.js");
const Knroute = require("../routes/Kynang.js");
const Knttroute = require("../routes/Kynangtuyendung.js");
const Lsttroute = require("../routes/Lstt.js");
const Nguoidungroute = require("../routes/Nguoidung.js");
const NhaTDroute = require("../routes/Nhatd.js");
const Nguoitimviecroute = require("../routes/Ntv.js");
const Phongvanroute = require("../routes/Phanhoi.js");
const quyenroute = require("../routes/Quyen.js");
const Tintdroute = require("../routes/Tintd.js");
const Ungtuyenroute = require("../routes/Ungtuyen.js");
const Vitrituyendungroute = require("../routes/Vitriungtuyen.js");
const LuucongviecController = require("./luucongviec.js");
const hosoroute = require("./hoso.js");

const router = Router();
const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", authController.register);
  router.post("/registerntd", authController.registerNTD);
  router.post("/login", authController.Login);
  router.get("/logout", authController.logout);
  router.get("/account", authController.getUserAccount);
  router.get("/search", emCtl.getNtdById);
  router.get("/jb", jbpCtl.getAllTintd);
  router.get("/sea", jbpCtl.getTintdByID);
  router.get("/verify-email", authController.verifyEmail);
  // router.get(
  //   "/google",
  //   passport.authenticate("google", {
  //     scope: ["profile", "email"],
  //     session: false,
  //   })
  // );

  // router.get(
  //   "/google/callback",
  //   (req, res, next) => {
  //     passport.authenticate("google", (err, profile) => {
  //       req.user = profile;

  //       next();
  //     })(req, res, next);
  //   },
  //   (req, res) => {
  //     const token = req.user?.tokenLogin;
  //     const data = {
  //       id: req.user?.id,
  //       username: req.user?.displayName,
  //       email: req.user?.emails[0]?.value,
  //       access_token: token, // Trả token về client
  //       role: req.user.role,
  //     };
  //     console.log("data fgsđsfsfsfd", data);

  //     res.status(200).json(data);
  //   }
  // );

  // router.get(
  //   "/facebook",
  //   passport.authenticate("facebook", { session: false, scope: ["email"] })
  // );

  // router.get(
  //   "/facebook/callback",
  //   (req, res, next) => {
  //     passport.authenticate("facebook", (err, profile) => {
  //       req.user = profile;

  //       next();
  //     })(req, res, next);
  //   },
  //   (req, res) => {
  //     const token = req.user?.tokenLogin;
  //     const data = {
  //       id: req.user?.id,
  //       username: req.user?.displayName,
  //       email: req.user?.emails[0]?.value,
  //       access_token: token, // Trả token về client
  //       role: req.user.role,
  //     };
  //     console.log("data fgsđsfsfsfd", data);

  //     res.status(200).json(data);
  //   }
  // );
  router.use("/capbac", Capbacroute);
  router.use("/kynang", Knroute);
  router.use("/Kntt", Knttroute);
  router.use("/lstt", Lsttroute);
  router.use("/nguoidung", Nguoidungroute);
  router.use("/nhatd", NhaTDroute);
  router.use("/ngtviec", Nguoitimviecroute);
  router.use("/phanhoi", Phongvanroute);
  router.use("/quyen", quyenroute);
  router.use("/tintd", Tintdroute);
  router.use("/Ut", Ungtuyenroute);
  router.use("/vtri", Vitrituyendungroute);
  router.use("/lcv", LuucongviecController);
  router.use("/hoso", hosoroute);
  router.post("/create_payment_url", async (req, res) => {
    try {
      const fee = await db.Nhatuyendung.findOne({
        where: { MaND: req.body.id },
        raw: true,
        nest: true,
      });
      console.log("🚀 ~ router.post ~ fee:", fee);
      const amount1 = parseFloat(req.body.sotien);
      const sl = parseFloat(req.body.soluong);
      let goimua;
      if (req.body.goimua === "goi1") {
        goimua = "Gói đăng bài bình thường";
      } else if (req.body.goimua === "goi2") {
        goimua = "Gói đăng bài nổi bật";
      } else if (req.body.goimua === "goi3") {
        goimua = "Gói nộp hồ sơ ứng tuyển";
      } else {
        // Trường hợp gói mua không hợp lệ
        return res.status(400).json({ error: "Gói mua không hợp lệ" });
      }

      // Sau khi kiểm tra và thay đổi dữ liệu, thêm vào Lichsuthanhtoan
      const newPayment = await db.Lichsuthanhtoan.create({
        MaNTT: req.body.id,
        goimua: goimua, // Ghi nhận tên gói đã được thay đổi
        sotien: amount1, // Giá tiền đã được tính toán lại
        Soluongmua: sl, // Số lượng mua đã được điều chỉnh
      });
      console.log("🚀 ~ router.post ~ newPayment:", newPayment);
      console.log("🚀 ~ req:", req.body);
      process.env.TZ = "Asia/Ho_Chi_Minh";

      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");

      let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      let tmnCode = "6C7KFJWF";
      let secretKey = "0VMTHOONRW9VW6T4QAT5GI1AXJDDOOR2";
      let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      let returnUrl = `http://localhost:3000/ntd/thanhcong/${newPayment.id}`;
      let orderId = moment(date).format("DDHHmmss");
      let amount = req.body.sotien;
      let bankCode = "";

      let locale = "vn";
      if (locale === null || locale === "") {
        locale = "vn";
      }
      let currCode = "VND";
      let vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      vnp_Params = sortObject(vnp_Params);
      console.log("🚀 ~ vnp_Params:", vnp_Params);

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
      console.log("🚀 ~ vnpUrl:", vnpUrl);

      if (req.body.goimua === "goi1") {
        const sl2 = fee.Soluongdangbai + sl;
        const fee1 = await db.Nhatuyendung.update(
          { Soluongdangbai: sl2 },
          { where: { id: fee.id } }
        );

        console.log("🚀 ~ router.post ~ fee1:", fee1);
      }
      if (req.body.goimua === "goi2") {
        const sl2 = fee.Soluongnoibat + sl;
        const fee1 = await db.Nhatuyendung.update(
          { Soluongnoibat: sl2 },
          { where: { id: fee.id } }
        );
      }
      if (req.body.goimua === "goi3") {
        const ntv = await db.Nguoitimviec.findOne({
          where: { MaND: req.body.id },
          raw: true,
          nest: true,
        });
        const sl2 = ntv.Soluongnophoso + sl;
        const fee2 = await db.Nguoitimviec.update(
          { Soluongnophoso: sl2 },
          { where: { id: ntv.id } }
        );
      }
      res.status(200).json({ paymentUrl: vnpUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/vnpay_return", function (req, res, next) {
    console.log("🚀 ~ req.query:", req.query);
    let vnp_Params = req.query;

    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = "6C7KFJWF";
    let secretKey = "0VMTHOONRW9VW6T4QAT5GI1AXJDDOOR2";

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    console.log("🚀 ~ signed:", signed);

    if (secureHash === signed) {
      res.json({
        message: "Payment successful",
        code: vnp_Params["vnp_ResponseCode"],
      });
    } else {
      res.json({ message: "Payment failed", code: "97" });
    }
  });

  app.use("/vieclamit", router);
};
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
module.exports = initApiRoutes;
