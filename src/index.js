const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const initApiRoutes = require("./routes/index");
import allowCrossDomain from "./config/configCors";
const path = require("path");
require("./passport");
env.config();
const app = express();
const { sequelize } = require("./models/index");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(allowCrossDomain);
//app.use(allowCrossDomain);
app.use(cors({ credentials: true, origin: true }));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

initApiRoutes(app);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  //swaggerDocs(app, port);
});
