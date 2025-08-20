import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

const PageWrapper = styled.div`
  padding: 140px 24px 80px;
  max-width: 1178px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const FilterWrapper = styled.div`
  display: flex;
`;

const FilterButton = styled.button`
  padding: 6px 14px;
  border: 1px solid #f2a65a;
  background-color: ${(props) => (props.active ? "#f2a65a" : "white")};
  color: ${(props) => (props.active ? "white" : "#f2a65a")};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const WriteButton = styled.button`
  background-color: white;
  color: #f2a65a;
  border: 1px solid #f2a65a;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #f2a65a;
    color: white;
  }
`;

const PostCard = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-decoration: none;
  color: inherit;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #fafafa;
  }
`;

const PostContent = styled.div`
  flex: 1;
`;

const PostTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
`;

const PostPreview = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const MetaLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 130px;
  height: 101px;
  margin-left: 16px;
`;

function CommunityList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState("latest");

  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  // 게시글 불러오기 (search에 따라 API 변경)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = search
          ? `http://127.0.0.1:3002/api/community?search=${encodeURIComponent(search)}`
          : `http://127.0.0.1:3002/api/community`;
        const res = await axios.get(url);
        setPosts(res.data);
      } catch (error) { 
        console.error("게시글 불러오기 실패:", error);
      }
    };

    fetchPosts();
  }, [search]);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortType === "popular") return b.like_count - a.like_count;
    return b.community_post_id - a.community_post_id;
  });

  return (
    <>
      <Header />
      <PageWrapper>
        <Title>커뮤니티</Title>

        <TopBar>
          <FilterWrapper>
            <FilterButton
              active={sortType === "latest"}
              onClick={() => setSortType("latest")}
            >
              최신순
            </FilterButton>
            <FilterButton
              active={sortType === "popular"}
              onClick={() => setSortType("popular")}
            >
              인기순
            </FilterButton>
          </FilterWrapper>

          <WriteButton onClick={() => navigate("/community/write")}>
            작성하기
          </WriteButton>
        </TopBar>

        {sortedPosts.map((post) => (
          <PostCard to={`/community/${post.community_post_id}`} key={post.community_post_id}>
            <PostContent>
              <PostTitle>{post.title}</PostTitle>
              <PostPreview>{post.content.slice(0, 50)}...</PostPreview>
              <PostMeta>
                <MetaLeft>
                  <MetaItem>
                    <AiOutlineHeart />
                    <span>{post.like_count}</span>
                  </MetaItem>
                  <span>{post.created_at.slice(0, 10)}</span>
                </MetaLeft>
              </PostMeta>
            </PostContent>

            <ThumbnailWrapper />
          </PostCard>
        ))}
      </PageWrapper>
    </>
  );
}

export default CommunityList;
