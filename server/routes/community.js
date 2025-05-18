const express = require('express');
const router = express.Router();
const { CommunityPost } = require('../models');
const { CommentService, LikeService, ScrapService } = require('../controllers/communityCtrl');

// 게시글 목록
router.get('/', async (req, res) => {
    const posts = await CommunityPost.findAll({ order: [['created_at', 'DESC']] });
    res.json(posts);
});

// 게시글 작성
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const post = await CommunityPost.create({ title, content, user_id: req.user.id });
    res.status(201).json(post);
});

// 단일 조회
router.get('/:id', async (req, res) => {
    const post = await CommunityPost.findByPk(req.params.id);
    res.json(post);
});

// 수정
router.put('/:id', async (req, res) => {
    const post = await CommunityPost.findByPk(req.params.id);
    if (post.user_id !== req.user.id) return res.status(403).end();
    await post.update(req.body);
    res.json(post);
});

// 삭제
router.delete('/:id', async (req, res) => {
    const post = await CommunityPost.findByPk(req.params.id);
    if (post.user_id !== req.user.id) return res.status(403).end();
    await post.destroy();
    res.status(204).end();
});

// ----- 공통 기능 -----
// 댓글
router.post('/:id/comments', async (req, res) => {
    const svc = new CommentService(req.app.get('models'));
    const c = await svc.create({
    userId: req.user.id,
    postId: req.params.id,
    postType: 'community',
    content: req.body.content
    });
    res.status(201).json(c);
});

// 좋아요
router.post('/:id/likes', async (req, res) => {
    const svc = new LikeService(req.app.get('models'));
    await svc.toggle({ userId: req.user.id, postId: req.params.id, postType: 'community' });
    res.status(204).end();
});

// 스크랩
router.post('/:id/scraps', async (req, res) => {
    const svc = new ScrapService(req.app.get('models'));
    await svc.toggle({ userId: req.user.id, community_post_id: req.params.id });
    res.status(204).end();
});

module.exports = router;
