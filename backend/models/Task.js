const { DataTypes } = require("sequelize");

module.exports = (sequelize, User) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Completed"),
        defaultValue: "Pending",
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          fields: ["userId"],
        },
      ],
    },
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
  };

  return Task;
};
