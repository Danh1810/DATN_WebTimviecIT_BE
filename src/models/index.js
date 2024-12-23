"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

// Check if `use_env_variable` is defined in the config
if (config.use_env_variable) {
  // Use the environment variable to initialize Sequelize
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Fallback to directly using the configuration details
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port, // Include the port if defined
    logging: false, // Optional: disable SQL query logging
  });
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

db.sequelize = sequelize; // Attach the Sequelize instance
db.Sequelize = Sequelize; // Attach the Sequelize library

module.exports = db;
