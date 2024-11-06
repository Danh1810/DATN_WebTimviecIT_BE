const { Router } = require("express");
const passport = require("passport");
// import userRoutes from "./user.route";
// import profileRoutes from "./profile.route";
// import classRoutes from "./class.route";
// import feeRoutes from "./fee.route";
// import markTypeRoutes from "./marktype.route";
// import semesterRoutes from "./semester.route";
// import conductRoutes from "./conduct.route";
// import newsRoutes from "./news.route";
// import subjectRoutes from "./subject.route";
// import assignmentRoutes from "./assignment.route";
// import class_subject_userRoutes from "./class_subject_user.route";
// import teacherRoutes from "./teacher.route";
// import userFeeRoutes from "./userFee.route";
// import parentRoutes from "./parent.route";
// import studentRoutes from "./student.route";
// import assignment_classRoutes from "./assignment_class.route";
// import transcriptsRoutes from "./transcript.route";
// import markRoutes from "./mark.route";
// import groupRoutes from "./group.route";
// import schoolyearRoutes from "./schoolyear.route";
// import gradeRoutes from "./grade.route";
const { checkUserJWT, checkUserPermission } = require("../middleware/JWT.js");
const authController = require("../controller/Authcontroller.js");
const emCtl = require("../controller/NhatdController.js");
const jbpCtl = require("../controller/TintdController.js");
// import roleRoutes from "./role.route";
// import grouproleRoutes from "./group_role.route";
// import paymentRoutes from "./payment.route";
// import paymenthistoryRoutes from "./paymenthistory.route";
// import categoryRoutes from "./category.route";

const router = Router();
const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);
  // router.get("/ping", (req, res) => res.sendStatus(200));
  // router.get("/test", authController.test);
  router.post("/register", authController.register);
  router.post("/login", authController.Login);
  router.get("/logout", authController.logout);
  //   router.post("/changePassword", authController.changePassword);
  //   router.post("/forgotPassword", authController.forgotPassword);
  router.get("/account", authController.getUserAccount);
  router.get("/search", emCtl.getEmployersById);
  router.get("/jb", jbpCtl.getJobpost);
  // router.get("/jb/detail",jbpCtl.getJobpostByID);
  router.post("/sea", jbpCtl.searchJobPostsByKeyword);
  //   router.use("/user", userRoutes);
  //   router.use("/profile", profileRoutes);
  //   router.use("/class", classRoutes);
  //   router.use("/fee", feeRoutes);
  //   router.use("/marktype", markTypeRoutes);
  //   router.use("/semester", semesterRoutes);
  //   router.use("/conduct", conductRoutes);
  //   router.use("/news", newsRoutes);
  //   router.use("/subject", subjectRoutes);
  //   router.use("/assignment", assignmentRoutes);
  //   router.use("/csu", class_subject_userRoutes);
  //   router.use("/teacher", teacherRoutes);
  //   router.use("/userfee", userFeeRoutes);
  //   router.use("/parent", parentRoutes);
  //   router.use("/student", studentRoutes);
  //   router.use("/assignment_class", assignment_classRoutes);
  //   router.use("/transcript", transcriptsRoutes);
  //   router.use("/mark", markRoutes);
  //   router.use("/schoolyear", schoolyearRoutes);
  //   router.use("/group", groupRoutes);
  //   router.use("/grade", gradeRoutes);
  //   router.use("/role", roleRoutes);
  //   router.use("/grouprole", grouproleRoutes);
  //   router.use("/payment", paymentRoutes);
  //   router.use("/paymenthistory", paymenthistoryRoutes);
  //   router.use("/category", categoryRoutes);
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

  // router.get('/facebook',
  //   passport.authenticate('facebook', { session: false, scope: ['email'] }));

  // router.get('/facebook/callback', (req, res, next) => {
  //   passport.authenticate('facebook', (err, profile) => {
  //       req.user = profile
  //       next()
  //   })(req, res, next)
  // }, (req, res) => {
  //   res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenLogin}`)
  // })

  app.use("/vieclamit", router);
};
module.exports = initApiRoutes;
