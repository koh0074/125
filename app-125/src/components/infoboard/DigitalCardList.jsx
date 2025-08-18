import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 24px;
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;

const ImageBox = styled.div`
  height: 180px;
  background-color: #d9d9d9;
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 10px 0;
`;

const Period = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
`;

const ApplyButton = styled.button`
  background-color: #2d66d0;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #244ea3;
  }
`;

function DigitalCardList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3002/api/infoPosts") // category 없이 전체 요청
      .then((res) => {
        console.log("받은 데이터:", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("에러:", err);
      });
  }, []);

  return (
    <Grid>
      {posts.map((program) => (
        <Card key={program.info_post_id}>
          <ImageBox />
          <Content>
            <Title>{program.title}</Title>
            <Period>{new Date(program.published_at).toLocaleDateString()}</Period>
            <a href={program.source_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <ApplyButton>바로가기</ApplyButton>
            </a>
          </Content>
        </Card>
      ))}
    </Grid>
  );
}

export default DigitalCardList;
