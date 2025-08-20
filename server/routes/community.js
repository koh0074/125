//server/routes/community.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/community.controller');

// 게시글 전체 목록 조회
router.get('/', controller.getAllPosts);

// 게시글 작성 (POST)
router.post('/create', controller.createPost);

// 게시글 상세 보기 (댓글 포함)
router.get('/:id', controller.getPostDetail);

// 게시글 수정 (POST로 요청 - /:id/edit)
router.post('/:id/edit', controller.updatePost);

// 게시글 수정용 데이터 조회 (edit용 json)
//router.get('/:id/edit', controller.editPost);

// 게시글 삭제 (POST 방식 사용)
router.get('/:id/delete', controller.deletePost);

// 댓글 작성 (get, 게시글 ID 필요)
router.post('/:id/comments', controller.createComment);

// 좋아요
router.post('/:id/like', controller.likePost);      // 좋아요 추가
router.delete('/:id/like', controller.unlikePost);  // 좋아요 취소

// 게시글 스크랩
router.post("/:postId/scrap", controller.scrapCommunityPost);

// 게시글 스크랩 취소
router.delete("/:postId/scrap", controller.unscrapCommunityPost);


module.exports = router;

