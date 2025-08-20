// const { Model, DataTypes } = require('sequelize');

// class JobPost extends Model {
//   static init(sequelize) {
//     return super.init({
//       job_post_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//       },
//       company_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       title: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       job_field: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//       },
//       location_city: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//       },
//       employment_type: {
//         type: DataTypes.ENUM('fullTime', 'partTime', 'contract'),
//         defaultValue: 'fullTime',
//       },
//       work_hour: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//       },
//       salary_info: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.ENUM('read', 'unread'),
//         defaultValue: 'unread',
//       },
//       required_keword: {
//         type: DataTypes.TEXT,
//       },
//       min_age: {
//         type: DataTypes.INTEGER,
//       },
//       max_age: {
//         type: DataTypes.INTEGER,
//       },
//       ai_match_result: {
//         type: DataTypes.TEXT,
//       },
//       created_at: {
//         type: DataTypes.DATE,
//       },
//       deadline: {
//         type: DataTypes.DATE,
//       },
//     }, {
//       sequelize,
//       modelName: 'JobPost',
//       tableName: 'JobPost',
//       timestamps: false,
//     });
//   }

//   static associate(db) {
//     if (db.Application) {  // 임시로 오류 방지 - 합친뒤 삭제
//       db.JobPost.hasMany(db.Application, {
//         foreignKey: 'job_post_id',
//         sourceKey: 'job_post_id',
//         onDelete: 'CASCADE',
//       });
//     }

//     if (db.Scrap) {
//       db.JobPost.hasMany(db.Scrap, {
//         foreignKey: 'job_post_id',
//         sourceKey: 'job_post_id',
//         onDelete: 'CASCADE',
//       });
//     }

//     if (db.Comment) {
//       db.JobPost.hasMany(db.Comment, {
//         foreignKey: 'job_post_id',
//         sourceKey: 'job_post_id',
//         onDelete: 'CASCADE',
//       });
//     }
//   }
// }

// module.exports = JobPost;

// models/jobPost.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class JobPost extends Model {
    static associate(db) {
      if (db.Application) {
        db.JobPost.hasMany(db.Application, {
          foreignKey: "job_post_id",
          sourceKey: "job_post_id",
          onDelete: "CASCADE",
        });
      }

      if (db.Scrap) {
        db.JobPost.hasMany(db.Scrap, {
          foreignKey: "job_post_id",
          sourceKey: "job_post_id",
          onDelete: "CASCADE",
        });
      }

      if (db.Comment) {
        db.JobPost.hasMany(db.Comment, {
          foreignKey: "job_post_id",
          sourceKey: "job_post_id",
          onDelete: "CASCADE",
        });
      }
    }
  }

  JobPost.init(
    {
      job_post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      location_city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      employment_type: {
        type: DataTypes.ENUM("fullTime", "partTime", "contract"),
        defaultValue: "fullTime",
      },
      work_hour: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      salary_info: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("open", "closed"),
        defaultValue: "open",
      },
      required_keyword: {
        type: DataTypes.TEXT,
      },
      min_age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      max_age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ai_match_result: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      career: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      education: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      skills: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      preference: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      job_field: {
        type: DataTypes.ENUM(
          "전체",
          "기획·경영",
          "마케팅·영업",
          "회계·인사·지원",
          "IT·데이터",
          "디자인·콘텐츠",
          "생산·물류",
          "교육·의료·연구",
          "공공·금융"
        ),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "JobPost",
      tableName: "JobPost",
      timestamps: false,
    }
  );

  return JobPost;
};
