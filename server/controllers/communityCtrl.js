// controllers/communityCtrl.js
const { CommunityPost, User } = require('../models');

/** POST /community  ─ 게시글 작성 */
exports.createPost = async (req, res, next) => {
  try {
    const post = await CommunityPost.create({
      title:   req.body.title,
      content: req.body.content,
      user_id: req.user.id,          // 로그인 미들웨어에서 넣어둔 값
    });
    res.status(201).json(post);
  } catch (err) { next(err); }
};

/** GET /community/:id ─ 단일 게시글 + 작성자 정보 */
exports.getPost = async (req, res, next) => {
  try {
    const found = await CommunityPost.findByPk(req.params.id, {
      include: [{ model: User, as: 'author', attributes: ['username', 'email'] }],
    });
    if (!found) return res.status(404).json({ message: 'Not found' });
    res.json(found);
  } catch (err) { next(err); }
};
