const router = require("express").Router();
const ctrl = require("../controllers/aiFeedback.controller");

// POST /api/ai-feedback
router.post("/", ctrl.create);

module.exports = router;

// const express = require("express");
// const dotenv = require("dotenv");
// const OpenAI = require("openai");
// const { AIFeedback } = require("../models"); // Sequelize 모델
// const { Resume } = require("../models");

// dotenv.config();
// const router = express.Router();

// // OpenAI 객체 생성
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // AI 피드백 생성 라우트
// router.post("/", async (req, res) => {
//   const { resume_id, job_role, industry, career_gap, career_history } =
//     req.body;

//   let resumeText = "";
//   if (resume_id) {
//     const resume = await Resume.findByPk(resume_id);
//     if (!resume) {
//       return res
//         .status(404)
//         .json({ message: "해당 resume_id를 찾을 수 없습니다." });
//     }
//     resumeText = resume.content || ""; // content 컬럼 있다고 가정
//   }

//   try {
//     const prompt = `
//     당신은 면접 준비를 도와주는 AI입니다.
//     다음 정보를 바탕으로 한국어로만 응답하고, 아래와 같은 JSON 객체를 반환하세요.

//     ⚠️ 반드시 마크다운, 설명, 텍스트 없이 **JSON만** 반환하세요.

//     JSON 응답 형식:
//     {
//       "expected_questions": ["질문1", "질문2", "질문3"],
//       "model_answers": ["답변1", "답변2", "답변3"],
//       "strengths": "이력서를 기반으로 한 장점 요약 (200자 이내)",
//       "weaknesses": "이력서를 기반으로 한 단점 요약 (200자 이내)",
//       "recommended_keywords": "직무 관련 키워드 쉼표로 구분",
//       "recommended_activities": {
//         "온라인 강의 수강 및 수료": [
//           "예시 항목 1",
//           "예시 항목 2"
//         ],
//         "교육 콘텐츠 제작 / 블로그 운영": [
//           "예시 항목 1",
//           "예시 항목 2"
//         ],
//         "자격증 / 교육 이수": [
//           "예시 항목 1",
//           "예시 항목 2"
//         ]
//       }
//     }

//     이력서 본문: ${resumeText}

//     제공된 이력서 정보:
//     - 직무: ${job_role}
//     - 산업군: ${industry}
//     - 경력 공백: ${career_gap}
//     - 경력 사항: ${career_history}
//     `;

//     // GPT 호출
//     const response = await openai.chat.completions.create({
//       model: "gpt-4-turbo",
//       messages: [
//         {
//           role: "system",
//           content: `
//         당신은 면접 준비를 도와주는 AI입니다. 반드시 아래 JSON 형식에 맞추어 **한국어로만** 응답하세요. 마크다운, 설명, 해석 없이 JSON만 반환하세요.

//         {
//           "expected_questions": ["질문1", "질문2", "질문3"],
//           "model_answers": ["답변1", "답변2", "답변3"],
//           "strengths": "한 문장 또는 요약된 형태 (200자 이내)",
//           "weaknesses": "한 문장 또는 요약된 형태 (200자 이내)",
//           "recommended_keywords": "쉼표로 구분된 키워드 목록 (예: 책임감, 협업, 백엔드)",
//           "recommended_activities": "추천 활동을 요약하여 기술 (200자 이내)"
//         }

//         ※ 주의: 질문과 답변은 짝이 맞도록 배열로 3개씩 생성하세요.
//         ※ 한국어로만 응답하세요.
//         ※ JSON 외 텍스트나 마크다운 사용 금지.
//         `.trim(),
//         },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.7,
//     });

//     const aiText = response.choices[0]?.message?.content?.trim();

//     // JSON 파싱 시도
//     let parsed;
//     try {
//       parsed = JSON.parse(aiText);
//     } catch (err) {
//       console.error("JSON 파싱 실패:", aiText);
//       return res
//         .status(500)
//         .json({ message: "AI 응답이 JSON 형식이 아닙니다", raw: aiText });
//     }

//     // DB에 저장
//     const saved = await AIFeedback.create({
//       resume_id,
//       job_role,
//       industry,
//       career_gap,
//       career_history,
//       expected_questions: JSON.stringify(parsed.expected_questions),
//       model_answers: JSON.stringify(parsed.model_answers),
//       strengths: parsed.strengths,
//       weaknesses: parsed.weaknesses,
//       recommended_keywords: parsed.recommended_keywords,
//       recommended_activities: JSON.stringify(parsed.recommended_activities),
//     });

//     res.json({
//       message: "AI 피드백 생성 완료",
//       feedback: {
//         ...saved.toJSON(),
//         expected_questions: JSON.parse(saved.expected_questions),
//         model_answers: JSON.parse(saved.model_answers),
//       },
//     });
//   } catch (error) {
//     console.error("피드백 생성 에러:", error);
//     res.status(500).json({ message: "서버 오류", detail: error.message });
//   }
// });

// module.exports = router;
