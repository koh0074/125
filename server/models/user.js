// models/User.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      login_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      darkmode: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      is_out: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        defaultValue: "male",
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        get() {
          if (rawAge !== null) return rawAge; // 프론트에서 수정한 age 우선
          if (!birthdate) return null;
          const birth = new Date(birthdate);
          const today = new Date();
          let calculatedAge = today.getFullYear() - birth.getFullYear();
          const m = today.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) calculatedAge--;
          return calculatedAge;
    },
    {
      tableName: "User",
      timestamps: false, // created_at 직접 사용하므로 자동 생성 안 함
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Scrap, {
      foreignKey: "user_id",
      as: "scraps",
    });

    // 다른 연관관계도 여기에서 정의 (예: posts, comments 등)
  };

  return User;
};
