const { Router } = require("express");
const passport = require("passport");

const { checkUserJWT, checkUserPermission } = require("../middleware/JWT.js");
const authController = require("../controller/Authcontroller.js");
const emCtl = require("../controller/NhatdController.js");
const jbpCtl = require("../controller/TintdController.js");

const router = Router();
const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", authController.register);
  router.post("/login", authController.Login);
  router.get("/logout", authController.logout);
  router.get("/account", authController.getUserAccount);
  router.get("/search", emCtl.getEmployersById);
  router.get("/jb", jbpCtl.getAllTintd);
  router.post("/sea", jbpCtl.getTintdByID);
  router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );

  router.get(
    "/google/callback",
    (req, res, next) => {
      passport.authenticate("google", (err, profile) => {
        req.user = profile;

        next();
      })(req, res, next);
    },
    (req, res) => {
      const token = req.user?.tokenLogin;
      const data = {
        id: req.user?.id,
        username: req.user?.displayName,
        email: req.user?.emails[0]?.value,
        access_token: token, // Trả token về client
        role: req.user.role,
      };
      console.log("data fgsđsfsfsfd", data);

      res.status(200).json(data);
    }
  );

  router.get(
    "/facebook",
    passport.authenticate("facebook", { session: false, scope: ["email"] })
  );

  router.get(
    "/facebook/callback",
    (req, res, next) => {
      passport.authenticate("facebook", (err, profile) => {
        req.user = profile;

        next();
      })(req, res, next);
    },
    (req, res) => {
      const token = req.user?.tokenLogin;
      const data = {
        id: req.user?.id,
        username: req.user?.displayName,
        email: req.user?.emails[0]?.value,
        access_token: token, // Trả token về client
        role: req.user.role,
      };
      console.log("data fgsđsfsfsfd", data);

      res.status(200).json(data);
    }
  );

  app.use("/vieclamit", router);
};
module.exports = initApiRoutes;
