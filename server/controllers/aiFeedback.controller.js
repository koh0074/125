const service = require("../services/aiFeedback.service");

exports.create = async (req, res) => {
  try {
    const result = await service.createFeedback(req.body);
    return res.status(200).json({
      message: "AI 피드백 생성 완료",
      feedback: result,
    });
  } catch (error) {
    console.error("[AIFeedback] error:", error);
    if (error.name === "NotFoundError") {
      return res.status(404).json({ message: error.message });
    }
    if (error.name === "BadAIResponse") {
      return res
        .status(500)
        .json({ message: "AI 응답이 JSON 형식이 아닙니다", raw: error.raw });
    }
    return res
      .status(500)
      .json({ message: "서버 오류", detail: error.message });
  }
};
