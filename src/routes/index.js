const { Router } = require("express");
const passport = require("passport");

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
const Phongvanroute = require("../routes/Phongvan.js");
const quyenroute = require("../routes/Quyen.js");
const thanhtoanroute = require("../routes/Thanhtoan.js");
const Tintdroute = require("../routes/Tintd.js");
const Ungtuyenroute = require("../routes/Ungtuyen.js");
const Vitrituyendungroute = require("../routes/Vitriungtuyen.js");
const LuucongviecController = require("./luucongviec.js");

const router = Router();
const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", authController.register);
  router.post("/login", authController.Login);
  router.get("/logout", authController.logout);
  router.get("/account", authController.getUserAccount);
  router.get("/search", emCtl.getNtdById);
  router.get("/jb", jbpCtl.getAllTintd);
  router.post("/sea", jbpCtl.getTintdByID);
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
  router.get("/files/:fileId", (req, res) => {
    const fileId = req.params.fileId;
    const filePath = path.join(__dirname, "src/uploads", fileId);

    // Kiểm tra xem file có tồn tại không
    if (fs.existsSync(filePath)) {
      // Đọc file dưới dạng buffer và chuyển đổi thành Base64
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          res.status(500).json({ message: "Error reading file" });
          return;
        }
        const base64Data = data.toString("base64");
        res
          .status(200)
          .json({ file: `data:application/pdf;base64,${base64Data}` });
      });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  });
  router.use("/capbac", Capbacroute);
  router.use("/kynang", Knroute);
  router.use("/Kntt", Knttroute);
  router.use("/lstt", Lsttroute);
  router.use("/nguoidung", Nguoidungroute);
  router.use("/nhatd", NhaTDroute);
  router.use("/ngtviec", Nguoitimviecroute);
  router.use("/phongvan", Phongvanroute);
  router.use("/quyen", quyenroute);
  router.use("/thanhtoan", thanhtoanroute);
  router.use("/tintd", Tintdroute);
  router.use("/Ut", Ungtuyenroute);
  router.use("/vtri", Vitrituyendungroute);
  router.use("/lcv", LuucongviecController);

  app.use("/vieclamit", router);
};
module.exports = initApiRoutes;
