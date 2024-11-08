const db = require("../models/index");

// const getAllClass = async (limit, page, grade_id, schoolyear_id) => {
//   if (!limit) limit = 10;
//   if (!page) page = 1;
//   const offset = (page - 1) * limit;
//   try {
//     const condition1 = grade_id ? { grade_id: grade_id } : {};
//     const condition2 = schoolyear_id ? { schoolyear_id: schoolyear_id } : {};
//     const { count, rows } = await db.Classes.findAndCountAll({
//       where: { ...condition1, ...condition2, ishidden: 0 },
//       include: [
//         {
//           model: db.Users,
//           as: "GVCN",
//           include: {
//             model: db.Profiles,
//             attributes: ["firstname", "lastname"],
//           },
//         },
//         {
//           model: db.Schoolyears,
//           attributes: ["name"],
//         },
//       ],
//       limit: +limit,
//       offset: +offset,
//       raw: true,
//       nest: true,
//     });

//     return {
//       status: 200,
//       code: 0,
//       message: "success",
//       data: { rows, count },
//     };
//   } catch (error) {
//     return { status: 500, code: -1, message: error.message, data: "" };
//   }
// };
// const getClasses = async () => {
//   try {
//     const res = await db.Classes.findAll({
//       where: { ishidden: 0 },
//       include: [
//         {
//           model: db.Users,
//           as: "GVCN",
//           include: {
//             model: db.Profiles,
//             attributes: ["firstname", "lastname"],
//           },
//         },
//         { model: db.Schoolyears, attributes: ["name"] },
//       ],
//     });
//     if (res) {
//       return { status: 200, code: 0, message: "success", data: res };
//     } else {
//       return { status: 500, code: 1, message: "fail", data: "" };
//     }
//   } catch (error) {
//     return { status: 500, code: -1, message: error.message, data: "" };
//   }
// };
const getNTDById = async (id) => {
  try {
    const res = await db.NhaTuyenDung.findOne({
      where: { MaNTD: id },
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

module.exports = {
  getNTDById,
};
