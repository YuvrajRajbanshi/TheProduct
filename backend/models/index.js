const { Sequelize } = require("sequelize");
const config = require("../config/env");
const dbConfig = require("../config/database");

const env = config.app.nodeEnv || "development";
const sequelize = new Sequelize(
  dbConfig[env].database,
  dbConfig[env].username,
  dbConfig[env].password,
  {
    host: dbConfig[env].host,
    port: dbConfig[env].port,
    dialect: dbConfig[env].dialect,
    logging: dbConfig[env].logging,
    pool: dbConfig[env].pool,
  },
);

const User = require("./User")(sequelize);
const Task = require("./Task")(sequelize, User);

// Associations
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  Task,
};
