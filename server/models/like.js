module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      like_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      liked_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      post_type: {
        type: DataTypes.ENUM("job", "info", "community"),
        allowNull: false,
        defaultValue: "job",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      community_post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      info_post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "like",
      timestamps: false,
    }
  );

  Like.associate = (models) => {
    Like.belongsTo(models.User, { foreignKey: "user_id" });
    Like.belongsTo(models.CommunityPost, { foreignKey: "community_post_id" });
  };

  return Like;
};
