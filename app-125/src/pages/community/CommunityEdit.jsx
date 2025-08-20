import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../../api/axiosInstance";
import Header from "../../components/Header";

const PageWrapper = styled.div`
  padding-top: 140px;
  padding-bottom: 80px;
  max-width: 1178px;
  margin: 0 auto;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  padding: 16px 0;
  margin-top: 50px;
  border: none;
  border-bottom: 1px solid #ddd;
  background-color: #fdfcfcff;
  outline: none;
  &::placeholder { color: #aaa; }
`;

const EditorWrapper = styled.div`
  margin-top: 40px;
  position: relative;
`;

const EditorToolbar = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  background-color: #f7f7f7;
  padding: 8px 16px;
  border-radius: 20px;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  button {
    background: none; border: none; font-weight: 600; font-size: 14px; color: #555; cursor: pointer;
    &:hover { color: #000; }
  }
`;

const EditorTextarea = styled.textarea`
  width: 100%;
  height: 400px;
  border: none; outline: none;
  padding: 40px 0 20px;
  font-size: 16px;
  background-color: #fdfcfcff;
  resize: none;
  &::placeholder { color: #bbb; }
`;

const Divider = styled.hr`
  border: none; height: 1px; background-color: #eee; margin: 60px 0 30px;
`;

const SubmitButton = styled.button`
  display: block; margin: 0 auto;
  background-color: #f2a154; color: #fff;
  border: none; padding: 12px 28px; font-size: 16px; font-weight: bold; cursor: pointer;
  &:hover { background-color: #e8963f; }
`;

function CommunityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const postData = location.state;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        if (postData) {
          setTitle(postData.title || "");
          setContent(postData.content || "");
          return;
        }
        const res = await axiosInstance.get(`/api/community/${id}`);
        const data = res?.data?.post || res?.data || {};
        setTitle(data.title || "");
        setContent(data.content || "");
      } catch (err) {
        console.error("수정용 게시글 불러오기 실패:", err);
        alert("게시글을 불러오지 못했습니다.");
        navigate("/community");
      }
    };
    load();
  }, [id, postData, navigate]);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      
      await axiosInstance.put(`/api/community/${id}`, { title, content });
      alert("수정 완료!");
      navigate(`/community/${id}`);
    } catch (err) {
      const status = err?.response?.status;
      try {
        if (status === 404 || status === 405) {
          await axiosInstance.post(`/api/community/${id}/edit`, { title, content });
          alert("수정 완료!");
          navigate(`/community/${id}`);
          return;
        }
      } catch (err2) {
        console.error("게시글 수정 실패(폴백도 실패):", err2);
      }
      console.error("게시글 수정 실패:", err);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <TitleInput
          type="text"
          placeholder="제목을 작성해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <EditorWrapper>
          <EditorToolbar>
            <button>B</button>
            <button>/</button>
            <button>•</button>
            <button>📷</button>
            <button>🔗</button>
          </EditorToolbar>

          <EditorTextarea
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </EditorWrapper>

        <Divider />
        <SubmitButton onClick={handleUpdate}>수정 완료</SubmitButton>
      </PageWrapper>
    </>
  );
}

export default CommunityEdit;
