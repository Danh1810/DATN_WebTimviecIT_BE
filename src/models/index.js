"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "test";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

try {
  // Check if `use_env_variable` is defined in the config
  if (config.use_env_variable) {
    if (!process.env[config.use_env_variable]) {
      throw new Error(
        `Environment variable ${config.use_env_variable} is not set.`
      );
    }
    // Use the environment variable to initialize Sequelize
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    // Fallback to directly using the configuration details
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        dialect: config.dialect,
        port: config.port || 3306, // Include the port if defined or default to 3306
        logging: false, // Optional: disable SQL query logging
      }
    );
  }

  console.log("Sequelize instance initialized successfully.");
} catch (error) {
  console.error("Failed to initialize Sequelize:", error.message);
  process.exit(1); // Exit process if Sequelize fails to initialize
}

// Dynamically import all models in the current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && // Exclude hidden files
      file !== basename && // Exclude this file
      file.slice(-3) === ".js" && // Include only .js files
      file.indexOf(".test.js") === -1 // Exclude test files
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Run model associations, if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach Sequelize instance and library to the `db` object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
