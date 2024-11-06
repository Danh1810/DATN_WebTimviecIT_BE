const db = require("../models/index"); // Remove .js for CommonJS
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
// const sendEmail = require("./email.service"); // Uncomment if used
const JWTmdw = require("../middleware/JWT"); // Remove .js for CommonJS

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const register = async (data) => {
  try {
    const user = await db.Users.bulkCreate(
      data.map((item) => ({ ...item, password: hashPassword(item.password) }))
    );
    if (user) {
      return { status: 200, message: "Đăng ký thành công", code: 0, data: {} };
    }
  } catch (error) {
    return { status: 500, message: "", code: -1, data: {} };
  }
};

const checkPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

// Function to handle user login
const login = async (data) => {
  try {
    const user = await db.Nguoidung.findOne({
      where: {
        username: data.username,
      },
      include: [
        {
          model: db.Quyen,
          as: "Group",
        },
      ],
      raw: true,
      nest: true,
    });

    // Log the user data for debugging
    console.log("User data:", user.password);
    console.log("data", data.password);

    // Check if user exists and password is correct
    if (user) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      if (checkPassword(data.password, hashedPassword)) {
        console.log("Password matched");
        // Construct the payload for the JWT token
        const payload = {
          email: user.email,
          username: user.username,
          group_id: user.Quyen_id,
          role: user.Group.ten, // Access the role name from the 'Group' association
          id: user.id,
          name: user.username,
        };

        // Log the payload for debugging

        // Create the JWT token with the payload
        const token = await JWTmdw.createToken(payload);
        console.log(token);

        // Return the success response with the token and user data
        return {
          status: 200,
          message: "Đăng nhập thành công",
          code: 0,
          data: {
            email: user.email,
            username: user.username,
            id: user.id,
            access_token: token,
            group_id: user.Quyen_id,
            role: user.Group.ten,
            name: user.username,
          },
        };
      }
    }

    // If username or password is incorrect, return an error
    return {
      status: 400,
      message: "Ten đăng nhập hoặc mật khẩu không đúng",
      code: 3,
      data: {},
    };
  } catch (error) {
    // If there's a server error, log the error and return a server error response
    console.error("Server Error:", error);
    return { status: 500, message: "Lỗi đăng nhập", code: -1, data: {} };
  }
};
module.exports = { register, login };
