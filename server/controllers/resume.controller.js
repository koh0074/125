// controllers/resume.controller.js
const { Resume, User, UserCertificate, UserLanguageScore, UserPreferredDay } = require('../models');

/*// 생년월일 → 나이 계산 함수
function calculateAge(birthdate) {
  if (!birthdate) return null;
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}*/

// [API: POST /resume/create] 이력서 생성 + 회원정보 업데이트
exports.createResume = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 0) memberInfo 있으면 회원정보 업데이트 (age만 반영)
    if (req.body.memberInfo) {
      const info = req.body.memberInfo;
      const updateData = {};

      ["username", "age", "gender", "address", "phone_number", "email"].forEach(field => {
        if (info[field] !== undefined) updateData[field] = info[field];
      });

      if (Object.keys(updateData).length > 0) {
        await User.update(updateData, { where: { user_id: userId } });
      }
    }

    // 1) 이력서 필수 체크
    if (!req.body.resume_title || req.body.resume_title.trim() === '') {
      return res.status(400).json({ message: '이력서 제목은 필수 입력입니다.' });
    }

    // 2) Resume 생성
    const resume = await Resume.create({
      ...req.body,
      resume_title: req.body.resume_title,
      user_id: userId,
    });

    const resumeId = resume.resume_id;

    // 3) 연관 데이터 생성
    for (const cert of (req.body.certificates || [])) {
      await UserCertificate.create({
        ...cert,
        user_id: userId,
        resume_id: resumeId,
      });
    }

    for (const lang of (req.body.languageScores || [])) {
      await UserLanguageScore.create({
        ...lang,
        user_id: userId,
        resume_id: resumeId,
      });
    }

    for (const dayObj of (req.body.preferredDays || [])) {
      await UserPreferredDay.create({
        ...dayObj,
        user_id: userId,
        resume_id: resumeId,
      });
    }

    // 4) 저장된 데이터 다시 조회
    const fullResume = await Resume.findOne({
      where: { resume_id: resumeId },
      include: [
        { model: UserCertificate, as: 'certificates', attributes: ['certificate_name', 'acquisition_year'] },
        { model: UserLanguageScore, as: 'languageScores', attributes: ['test_name', 'score', 'acquisition_year'] },
        { model: UserPreferredDay, as: 'preferredDays', attributes: ['day'] }
      ],
    });

    // 회원정보 조회 (birthdate 제외 → age만 반환)
    const user = await User.findByPk(userId, {
      attributes: ["user_id", "username", "age", "gender", "address", "phone_number", "email"]
    });

    res.status(201).json({ message: '이력서 등록 성공', resume: fullResume, memberInfo: user });
  } catch (err) {
    console.error('이력서 등록 에러:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// [API: GET /resume] 전체 이력서 조회
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.findAll({
      where: { user_id: req.user.userId },
      order: [['created_at', 'DESC']],
      attributes: ['resume_id', 'resume_title', 'created_at']
    });

    const result = resumes.map(r => ({
      resume_id: r.resume_id,
      title: r.resume_title,
      created_at: r.created_at,
    }));

    res.json({ resumes: result });
  } catch (err) {
    console.error('이력서 목록 조회 에러:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// [API: GET /resume/:resumeId] 단일 이력서 조회 + 회원정보 포함
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: { resume_id: req.params.resumeId, user_id: req.user.userId },
      include: [
        { model: UserCertificate, as: 'certificates', attributes: ['certificate_name', 'acquisition_year'] },
        { model: UserLanguageScore, as: 'languageScores', attributes: ['test_name', 'score', 'acquisition_year'] },
        { model: UserPreferredDay, as: 'preferredDays', attributes: ['day'] }
      ],
    });

    if (!resume) return res.status(404).json({ message: '이력서 없음' });

    // 회원정보도 같이 조회 (birthdate 제외)
    const user = await User.findByPk(req.user.userId, {
      attributes: ["user_id", "username", "age", "gender", "address", "phone_number", "email"]
    });

    res.json({ resume, memberInfo: user });
  } catch (err) {
    console.error('이력서 단일 조회 에러:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// [API: PUT /resume/:resumeId] 이력서 수정 + 회원정보 업데이트
exports.updateResume = async (req, res) => {
  try {
    const userId = req.user.userId;
    const resume = await Resume.findOne({
      where: { resume_id: req.params.resumeId, user_id: userId },
    });

    if (!resume) return res.status(404).json({ message: '이력서 없음' });

    // 0) memberInfo 있으면 회원정보 업데이트 (age만 반영)
    if (req.body.memberInfo) {
      const info = req.body.memberInfo;
      const updateData = {};
      ["username", "age", "gender", "address", "phone_number", "email"].forEach(field => {
        if (info[field] !== undefined) updateData[field] = info[field];
      });

      if (Object.keys(updateData).length > 0) {
        await User.update(updateData, { where: { user_id: userId } });
      }
    }

    // 1) 이력서 업데이트
    await resume.update({
      ...req.body,
      resume_title: req.body.resume_title || resume.resume_title
    });

    // 업데이트 후 회원정보 조회 (birthdate 제외)
    const user = await User.findByPk(userId, {
      attributes: ["user_id", "username", "age", "gender", "address", "phone_number", "email"]
    });

    res.json({ message: '이력서 및 회원정보 업데이트 완료', resume, memberInfo: user });
  } catch (err) {
    console.error('이력서 수정 에러:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// [API: DELETE /resume/:resumeId] 이력서 삭제
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: { resume_id: req.params.resumeId, user_id: req.user.userId },
    });

    if (!resume) return res.status(404).json({ message: '이력서 없음' });

    await resume.destroy();
    res.json({ message: '이력서 삭제 완료' });
  } catch (err) {
    console.error('이력서 삭제 에러:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};
