import axios from "../../api/axiosInstance";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import Header from "../../components/Header";
import DeleteConfirmModal from "../../modal/DeleteConfirmModal";
import { FiMoreHorizontal, FiEdit, FiTrash2 } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import profileImg from "../../img/profile.png";

const PageWrapper = styled.div`
  padding: 140px 24px 80px;
  max-width: 1178px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  margin-top: 30px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #888;
  gap: 10px;
`;

const MoreMenuWrapper = styled.div`
  position: relative;
  margin-top: 30px;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const MenuItem = styled.button`
  width: 80px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 16px 0;
`;

const Thumbnail = styled.img`
  width: 20%;
  height: 20%;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Content = styled.p`
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const ReactionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-bottom: 30px;
`;

const ReactionIcon = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.$liked ? "red" : "#888")};
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")}; /* [수정] 로딩 중 클릭 방지 */
`;

const ScrapIcon = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.$scrapped ? "#f2a65a" : "#888")};
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")}; /* [수정] 로딩 중 클릭 방지 */
`;

const CommentSection = styled.div`
  margin-top: 30px;
`;

const CommentInput = styled.textarea`
  width: 99%;
  height: 80px;
  margin-top: 20px;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: none;
`;

const SubmitButton = styled.button`
  background-color: #f2a65a;
  color: white;
  border: none;
  padding: 10px 16px;
  margin-top: 12px;
  float: right;
  cursor: pointer;

  &:hover {
    background-color: #e6933e;
  }
`;

const CommentBox = styled.div`
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: 12px 16px;
  margin-bottom: 12px;
  gap: 12px;
  align-items: flex-start;
`;

const CommentProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

const CommentText = styled.div`
  font-size: 14px;
  color: #444;
  margin-bottom: 6px;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: #aaa;
`;

function CommunityDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const numericId = Number(id);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [scrapped, setScrapped] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 중복 클릭 방지용 플래그
  const [likePending, setLikePending] = useState(false);
  const [scrapPending, setScrapPending] = useState(false);

  // 로그인 사용자
  const USER_ID = Number(localStorage.getItem("userId") || localStorage.getItem("user_id") || 1);
  const LOCAL_USERNAME = localStorage.getItem("username") || localStorage.getItem("userName") || "";
  const token = localStorage.getItem("token");

  const getMyDisplayName = async () => {
    if (LOCAL_USERNAME) return LOCAL_USERNAME;
    try {
      const res = await axios.get(`/api/users/${USER_ID}`);
      return res?.data?.username || `유저 ${USER_ID}`;
    } catch {
      return `유저 ${USER_ID}`;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/community/${numericId}`);
        if (!res?.data?.post) {
          navigate("/community");
          return;
        }
        setPost(res.data.post);
        setComments(res.data.comments || []);
        if (typeof res.data.liked === "boolean") setLiked(res.data.liked);
      } catch (error) {
        if (error?.response?.status === 404) navigate("/community");
        else console.error("게시글 불러오기 실패:", error);
      }
    };

    // 스크랩 여부 조회
    const fetchScrapStatus = async () => {
      const res = await axios.get("/api/mypage/scraps", { params: { user_id: USER_ID } });
      const list = Array.isArray(res?.data?.scraps) ? res.data.scraps : [];
      const isScrapped = list.some((s) => s.type === "community" && Number(s.id) === Number(id));
      setScrapped(isScrapped);
    };

    if (!Number.isFinite(numericId)) {
      navigate("/community");
      return;
    }

    fetchPost();
    fetchScrapStatus();
  }, [numericId, navigate, USER_ID]);

  const toggleLike = async () => {
    if (likePending) return;
    setLikePending(true);
    try {
      if (!liked) {
        // 좋아요 등록
        await axios.post(`/api/community/${numericId}/like`, { user_id: USER_ID });
        setLiked(true);
        setPost((prev) => (prev ? { ...prev, like_count: (prev.like_count || 0) + 1 } : prev));
      } else {
        // 좋아요 취소
        await axios.delete(`/api/community/${numericId}/like`, {
          data: { user_id: USER_ID },
          headers: { Authorization: `Bearer ${token}` },
        });

        setLiked(false);
        setPost((prev) => (prev ? { ...prev, like_count: Math.max(0, (prev.like_count || 0) - 1) } : prev));
      }
    } catch (error) {
      const status = error?.response?.status;
      const msg = error?.response?.data?.message || "";

      if (!liked && status === 400) {
        // 이미 좋아요한 게시물
        window.alert("이미 좋아요한 게시물입니다."); // [수정]
        setLiked(true);
        setPost((prev) =>
          prev
            ? { ...prev, like_count: Math.max(0, prev.like_count || 1) } // ✅ alert 후 -1 처리
            : prev
        );
      } else if (liked && status === 400) {
        // 좋아요가 안 된 상태에서 취소 시도
        window.alert("이미 좋아요가 해제된 상태입니다."); // [수정]
        setLiked(false); //강제 보정
        setPost((prev) => (prev ? { ...prev, like_count: Math.max(0, prev.like_count || 0) } : prev));
      } else {
        console.error("좋아요 요청 실패:", status, msg, error);
      }
    } finally {
      setLikePending(false);
    }
  };

  //스크랩 토글(400 처리 + 보정)
  const toggleScrap = async () => {
    if (scrapPending) return; // 중복 클릭 방지
    setScrapPending(true);

    try {
      if (!scrapped) {
        // 스크랩 등록
        await axios.post(`/api/community/${numericId}/scrap`, { user_id: USER_ID });
        setScrapped(true); // ✅ 요청 성공 후 바로 상태 반영
      } else {
        // 스크랩 취소
        await axios.delete(`/api/mypage/scraps/${numericId}?type=community`);
        setScrapped(false); // ✅ 상태 바로 업데이트
      }
    } catch (error) {
      const status = error?.response?.status;

      // 이미 등록/삭제된 상태일 때 보정
      if (!scrapped && status === 400) {
        window.alert("이미 스크랩한 게시물입니다.");
        setScrapped(true);
      } else if (scrapped && status === 400) {
        window.alert("이미 스크랩이 해제된 상태입니다.");
        setScrapped(false);
      } else {
        console.error("스크랩 요청 실패:", status, error?.response?.data?.message);
      }
    } finally {
      setScrapPending(false);
    }
  };

  // 댓글 등록(이전 답변의 사용자명 보정 유지)
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const displayName = await getMyDisplayName();
      const res = await axios.post(`/api/community/${numericId}/comments`, {
        content: newComment,
        post_id: numericId,
        post_type: "community",
        user_id: USER_ID,
      });

      const serverId = res?.data?.comment_id;
      const serverCreated = res?.data?.created_at;

      const optimistic = {
        comment_id: serverId || `tmp-${Date.now()}`,
        content: newComment,
        created_at: serverCreated || new Date().toISOString(),
        post_id: numericId,
        post_type: "community",
        user_id: USER_ID,
        User: { user_id: USER_ID, username: displayName },
      };

      setComments((prev) => [...prev, optimistic]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.get(`/api/community/${numericId}/delete`);
      navigate("/community");
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const handleClose = () => setShowDeleteModal(false);

  if (!post) return null;

  return (
    <>
      <Header />
      <PageWrapper>
        <TitleWrapper>
          <div>
            <Title>{post.title}</Title>
            <MetaInfo>
              <AiOutlineEye />
              <span>{post.views ?? 0}</span>
              <span>|</span>
              <span>{post.created_at?.slice(0, 10)}</span>
            </MetaInfo>
          </div>

          <MoreMenuWrapper>
            <MoreButton onClick={() => setShowMenu((prev) => !prev)}>
              <FiMoreHorizontal />
            </MoreButton>
            {showMenu && (
              <DropdownMenu>
                <MenuItem onClick={() => navigate(`/community/${numericId}/edit`, { state: post })}>
                  <FiEdit /> 수정
                </MenuItem>
                <MenuItem onClick={() => setShowDeleteModal(true)}>
                  <FiTrash2 /> 삭제
                </MenuItem>
              </DropdownMenu>
            )}
          </MoreMenuWrapper>
        </TitleWrapper>

        <Divider />
        {post.thumbnail && <Thumbnail src={post.thumbnail} alt="thumbnail" />}
        <Content>{post.content}</Content>

        <ReactionBar>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ReactionIcon onClick={toggleLike} $liked={liked} $disabled={likePending} aria-label="like-toggle" title={liked ? "좋아요 취소" : "좋아요"}>
              {liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </ReactionIcon>
            <span style={{ fontSize: "14px", color: "#666" }}>{post.like_count}</span>
          </div>

          <ScrapIcon onClick={toggleScrap} $scrapped={scrapped} $disabled={scrapPending} aria-label="scrap-toggle" title={scrapped ? "스크랩 취소" : "스크랩"}>
            {scrapped ? <BsBookmarkFill /> : <BsBookmark />}
          </ScrapIcon>
        </ReactionBar>

        <Divider />
        <CommentSection>
          <h4>댓글</h4>
          {comments.map((comment) => (
            <CommentBox key={comment.comment_id || `${comment.user_id}-${comment.created_at || Math.random()}`}>
              <CommentProfile src={profileImg} alt="profile" />
              <CommentBody>
                <CommentAuthor>{comment?.User?.username || comment?.user?.username || comment?.username || `유저 ${comment.user_id}`}</CommentAuthor>
                <CommentText>{comment.content}</CommentText>
                <CommentDate>{comment.created_at?.slice(0, 10)}</CommentDate>
              </CommentBody>
            </CommentBox>
          ))}
          <CommentInput value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="댓글을 입력하세요" />
          <SubmitButton onClick={handleCommentSubmit}>댓글 등록</SubmitButton>
        </CommentSection>
      </PageWrapper>

      {showDeleteModal && (
        <DeleteConfirmModal title="정말 삭제하시겠습니까?" message="삭제된 게시글은 복구할 수 없습니다." onClose={handleClose} onConfirm={handleDelete} />
      )}
    </>
  );
}

export default CommunityDetail;
