const { CommunityPost, Comment, User, Like, Scrap } = require('../models');
const { Op } = require('sequelize');

// 게시글 전체 조회 + 검색 기능 추가
exports.getAllPosts = async (req, res) => {
  try {
    const search = req.query.search || '';

    const whereCondition = search
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { content: { [Op.like]: `%${search}%` } }
          ]
        }
      : {};

    const posts = await CommunityPost.findAll({
      where: whereCondition,
      order: [['created_at', 'DESC']],
    });

    res.json(posts); 
  } catch (error) {
    res.status(500).json({ message: '게시글 조회 중 오류 발생', error });
  }
};


// 게시글 작성

exports.createPost = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    const newPost = await CommunityPost.create({
      title,
      content,
      user_id,
      created_at: new Date(),
      like_count: 0
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '게시글 생성 중 오류 발생', error });
  }
};


// 게시글 상세 보기 (댓글 포함)
exports.getPostDetail = async (req, res) => {
  try {
    const postId = Number(req.params.id ?? req.params.postId);
    if (!Number.isInteger(postId)) return res.status(400).json({ message: 'Invalid id' });


    const post = await CommunityPost.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    const comments = await Comment.findAll({
      where: { post_type: 'community', community_post_id: postId },
      include: [{ model: User, attributes: ['username'] }],
      order: [['created_at', 'ASC']]
    });

    res.json({ post, comments });
  } catch (error) {
    res.status(500).json({ message: '게시글 상세 조회 중 오류 발생', error });
  }
};

// 게시글 수정 폼
// exports.getEditForm = (req, res) => {
//   res.status(400).json({ message: '폼 렌더링은 JSON API에서 지원하지 않습니다.' });
// };

// 게시글 수정
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const postId = parseInt(req.params.id, 10);

    const [updatedCount] = await CommunityPost.update(
      { title, content },
      { where: { community_post_id: postId } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: '수정할 게시글이 없습니다.' });
    }

    const updatedPost = await CommunityPost.findByPk(postId);
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: '게시글 수정 중 오류 발생', error });
  }
};

// 게시글 수정용 데이터 조회 (edit 요청용)
exports.editPost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);

    const post = await CommunityPost.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: '게시글 조회 중 오류 발생', error });
  }
};


// 게시글 삭제
exports.deletePost = async (req, res) => {
  try {
    const deletedCount = await CommunityPost.destroy({
      where: { community_post_id: req.params.id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: '삭제할 게시글이 없습니다.' });
    }

    res.json({ message: '게시글이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '게시글 삭제 중 오류 발생', error });
  }
};

// 댓글 작성
// 댓글 작성
exports.createComment = async (req, res) => {
  try {
    const userId = req.user?.userId ?? req.user?.id ?? req.body.user_id;
    const postId = Number(req.params.id ?? req.params.postId);
    const { content } = req.body;

    // ✅ (추가1) 들어온 값 로그로 확인 — 왜 안 저장되는지 즉시 보임
    console.log('[createComment]', { postId, userId, content });

    // ✅ (추가2) 필수값 검증 — 문제를 4xx로 명확히 반환
    if (!Number.isInteger(postId)) {
      return res.status(400).json({ message: 'Invalid postId' });
    }
    if (!userId) {
      return res.status(401).json({ message: '로그인이 필요합니다.(userId 없음)' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ message: '내용이 비어 있습니다.' });
    }

    // ✅ (추가3) 글 존재 여부 확인 — 잘못된 ID로 DB 오염 방지
    const post = await CommunityPost.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    // 저장
    const newComment = await Comment.create({
      post_type: 'community',
      community_post_id: postId,
      user_id: userId,
      content,
      created_at: new Date(),
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error('[createComment] ERROR:', error);
    return res.status(500).json({ message: '댓글 작성 중 오류 발생', detail: error.message });
  }
};


// 게시글 좋아요 추가
exports.likePost = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.user_id;
    const postId = parseInt(req.params.id, 10);

    // 중복 체크
    const existing = await Like.findOne({
      where: {
        user_id: userId,
        post_type: 'community',
        community_post_id: postId,
      }
    });

    if (existing) {
      return res.status(400).json({ message: '이미 좋아요를 눌렀습니다.' });
    }

    await Like.create({
      user_id: userId,
      post_type: 'community',
      community_post_id: postId,
      liked_at: new Date(),
    });

    // 게시글 like_count 증가
    await CommunityPost.increment('like_count', {
      by: 1,
      where: { community_post_id: postId },
    });

    res.status(201).json({ message: '좋아요를 눌렀습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '좋아요 처리 중 오류 발생', error });
  }
};

// 게시글 좋아요 취소
exports.unlikePost = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.user_id;
    const postId = parseInt(req.params.id, 10);

    const deleted = await Like.destroy({
      where: {
        user_id: userId,
        post_type: 'community',
        community_post_id: postId,
      }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: '좋아요 정보가 없습니다.' });
    }

    // 게시글 like_count 감소
    await CommunityPost.decrement('like_count', {
      by: 1,
      where: { community_post_id: postId },
    });

    res.json({ message: '좋아요를 취소했습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '좋아요 취소 중 오류 발생', error });
  }
};


// 커뮤니티 게시글 스크랩
exports.scrapCommunityPost = async (req, res) => {
  const userId = req.user?.id||1; // 로그인한 사용자 ID
  const postId = req.params.postId;

  try {
    const [scrap, created] = await Scrap.findOrCreate({
      where: {
        user_id: userId,
        post_type: "community",
        community_post_id: postId,
      },
      defaults: {
        scrapped_at: new Date()
      }
    });

    if (!created) {
      return res.status(400).json({ message: "이미 스크랩한 게시글입니다." });
    }

    res.status(201).json({ message: "스크랩 성공", scrap });
  } catch (err) {
    console.error("스크랩 오류:", err);
    res.status(500).json({ message: "스크랩 중 오류 발생" });
  }
};

// 커뮤니티 게시글 스크랩 취소
exports.unscrapCommunityPost = async (req, res) => {
  const userId = req.user?.id||1;
  const postId = req.params.postId;

  try {
    const deleted = await Scrap.destroy({
      where: {
        user_id: userId,
        post_type: "community",
        community_post_id: postId,
      }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "스크랩이 존재하지 않습니다." });
    }

    res.status(200).json({ message: "스크랩 취소 성공" });
  } catch (err) {
    console.error("스크랩 취소 오류:", err);
    res.status(500).json({ message: "스크랩 취소 중 오류 발생" });
  }
};




// 테스트용 게시글 생성 (임시)
async function insertDummyPost() {
  await CommunityPost.create({
    title: '테스트 게시글입니다',
    content: '이 게시글은 테스트 용도로 삽입된 것입니다.',
    user_id: 1,
    created_at: new Date(),
    like_count: 0,
  });

  console.log(`더미 게시글 삽입 완료`);
}

insertDummyPost();

