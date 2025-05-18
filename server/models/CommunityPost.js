'use strict';

/**
 * CommunityPost 모델
 *  - SQL 정의를 그대로 옮겼고, FK(user_id) → User 테이블과 연관
 *  - 댓글·좋아요·스크랩 같은 다형성(polymorphic) 테이블과의 관계는
 *    필요할 때 주석 해제해서 쓰면 됩니다.
 */
module.exports = (sequelize, DataTypes) => {
  const CommunityPost = sequelize.define('CommunityPost', {
    community_post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,          // PK라 자동 증가
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',              // FK → User.user_id
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'CommunityPost',
    timestamps: false,              // created_at 직접 관리
  });

  /** 관계(associate) 정의 */
  CommunityPost.associate = models => {
    // 작성자(User) 1:N CommunityPost
    CommunityPost.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author',
    });

    // --- 공통 모듈 예시 ---
    // 댓글(Comment) 1:N
    // CommunityPost.hasMany(models.Comment, {
    //   foreignKey: 'post_id',
    //   scope: { post_type: 'community' },
    //   as: 'comments',
    // });

    // 좋아요(Like) 1:N
    // CommunityPost.hasMany(models.Like, {
    //   foreignKey: 'post_id',
    //   scope: { post_type: 'community' },
    //   as: 'likes',
    // });

    // 스크랩(Scrap) 1:N
    // CommunityPost.hasMany(models.Scrap, {
    //   foreignKey: 'community_post_id',
    //   as: 'scraps',
    // });
  };

  return CommunityPost;
};
