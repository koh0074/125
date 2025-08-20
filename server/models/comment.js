//server/models/comment.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_type: {
      type: DataTypes.ENUM('job', 'info', 'community'),
      defaultValue: 'job',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    info_post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    community_post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'comment',
    timestamps: false,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
    // post_type에 따라 여러 게시판에 연결되는 복잡한 관계라 기본 associate는 user만 둡니다.
  };

  return Comment;
};
