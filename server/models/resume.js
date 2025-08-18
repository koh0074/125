module.exports = (sequelize, DataTypes) => {
  const Resume = sequelize.define(
    "Resume",
    {
      resume_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      school: {
        type: DataTypes.STRING(100),
      },
      enrollment_status: {
        type: DataTypes.ENUM(
          "초등학교",
          "중학교",
          "고등학교",
          "대학교(2,3년제)",
          "대학교(4년제)",
          "대학원",
          "재학",
          "휴학",
          "졸업"
        ),
      },
      career_type: {
        type: DataTypes.ENUM("신입", "경력"),
      },
      company_name: {
        type: DataTypes.STRING(100),
      },
      work_period_text: {
        type: DataTypes.STRING(50),
      },
      desired_location: {
        type: DataTypes.STRING(100),
      },
      desired_job_category: {
        type: DataTypes.ENUM(
          "직무 전체",
          "기획·경영",
          "마케팅·영업",
          "회계·인사·지원",
          "IT·데이터",
          "디자인·콘텐츠",
          "생산·물류",
          "교육·의료·연구",
          "공공·금융"
        ),
      },
      desired_work_duration: {
        type: DataTypes.ENUM(
          "무관",
          "하루",
          "1주 이하",
          "1주 ~ 1개월",
          "1개월 ~ 3개월",
          "3개월 ~ 6개월",
          "6개월 ~ 1년"
        ),
      },
      preferred_day_type: {
        type: DataTypes.ENUM("무관", "주말", "주중", "요일"),
      },
      preferred_time: {
        type: DataTypes.ENUM("무관", "오전", "오후", "저녁", "새벽", "풀타임"),
      },
      has_certificate: {
        type: DataTypes.BOOLEAN,
      },
      has_language_score: {
        type: DataTypes.BOOLEAN,
      },
      self_introduction: {
        type: DataTypes.STRING(500),
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      resume_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "resume",
      timestamps: false,
    }
  );

  Resume.associate = (models) => {
    Resume.hasMany(models.UserCertificate, {
      foreignKey: "resume_id",
      as: "certificates",
    });
    Resume.hasMany(models.UserLanguageScore, {
      foreignKey: "resume_id",
      as: "languageScores",
    });
    Resume.hasMany(models.UserPreferredDay, {
      foreignKey: "resume_id",
      as: "preferredDays",
    });
  };


  return Resume;
};
