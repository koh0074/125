import { useState, useEffect } from "react";
import styled from "styled-components";
import { FiTrash2 } from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import DeleteConfirmModal from "../../modal/DeleteConfirmModal";

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 40px;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const LeftActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DeleteButton = styled.button`
  background-color: #ecffee;
  color: #5ec27d;
  font-weight: bold;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
`;

const RightActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Select = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  color: #444;
`;

const SearchButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #444;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Thead = styled.thead`
  background-color: #f5f5f5;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 8px;
  color: #444;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px 8px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  color: #444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrashButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #888;

  &:hover {
    color: red;
  }
`;

function MyScrapPost() {
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchScraps = async () => {
    try {
      const res = await axiosInstance.get("/api/mypage/scraps");
      const data = res.data.scraps.map((item) => ({
        scrap_id: `${item.type}-${item.id}`,
        title: item.title || "제목 없음",
        writer: "작성자",
        category: item.type === "community" ? "커뮤니티" : "정보 게시판",
        date: (item.scrapped_at || item.created_at)?.substring(0, 10),
        postId: item.id,
        post_type: item.type,
      }));
      setPosts(data);
    } catch (error) {
      console.error("스크랩 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchScraps();
  }, []);

  const handleDelete = async (postId, post_type) => {
    try {
      await axiosInstance.delete(`/api/mypage/scraps/${postId}?type=${post_type}`);
      setPosts((prev) => prev.filter((p) => !(p.postId === postId && p.post_type === post_type)));
      setSelectedPosts((prev) => prev.filter((id) => id !== `${post_type}-${postId}`));
    } catch (err) {
      console.error("스크랩 삭제 실패:", err);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPosts([]);
    } else {
      const allIds = posts.map((p) => p.scrap_id);
      setSelectedPosts(allIds);
    }
    setSelectAll((prev) => !prev);
  };

  const handleSelectOne = (scrap_id) => {
    setSelectedPosts((prev) => (prev.includes(scrap_id) ? prev.filter((id) => id !== scrap_id) : [...prev, scrap_id]));
  };

  const handleDeleteSelected = () => {
    if (selectedPosts.length === 0) return;
    setShowModal(true);
  };

  const confirmDeleteSelected = async () => {
    try {
      for (const scrap_id of selectedPosts) {
        const [type, id] = scrap_id.split("-");
        await axiosInstance.delete(`/api/mypage/scraps/${id}?type=${type}`);
      }
      setPosts((prev) => prev.filter((p) => !selectedPosts.includes(p.scrap_id)));
      setSelectedPosts([]);
      setShowModal(false);
    } catch (err) {
      console.error("선택 삭제 실패:", err);
    }
  };

  return (
    <Wrapper>
      <Title>스크랩한 게시물</Title>
      <ControlBar>
        <LeftActions>
          <DeleteButton onClick={handleDeleteSelected}>{selectedPosts.length > 0 ? "모두 삭제" : "선택 삭제"}</DeleteButton>
        </LeftActions>
        <RightActions>
          <Select>
            <option value="">카테고리</option>
            <option value="커뮤니티">커뮤니티</option>
            <option value="정보 게시판">정보 게시판</option>
          </Select>
          <SearchButton>검색</SearchButton>
        </RightActions>
      </ControlBar>

      <Table>
        <Thead>
          <tr>
            <Th>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </Th>
            <Th>게시물 제목</Th>
            <Th>카테고리</Th>
            <Th>스크랩 날짜</Th>
            <Th></Th>
          </tr>
        </Thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.scrap_id}>
              <Td>
                <input type="checkbox" checked={selectedPosts.includes(post.scrap_id)} onChange={() => handleSelectOne(post.scrap_id)} />
              </Td>
              <Td>{post.title}</Td>
              <Td>{post.category}</Td>
              <Td>{post.date}</Td>
              <Td>
                <TrashButton onClick={() => handleDelete(post.postId, post.post_type)}>
                  <FiTrash2 size={18} />
                </TrashButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <DeleteConfirmModal
          title="정말 삭제하시겠습니까?"
          message="선택한 게시물을 모두 삭제하시겠습니까?"
          onClose={() => setShowModal(false)}
          onConfirm={confirmDeleteSelected}
        />
      )}
    </Wrapper>
  );
}

export default MyScrapPost;
