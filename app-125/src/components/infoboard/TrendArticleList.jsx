import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
  padding: 20px 16px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

// const Thumbnail = styled.img`
//   background-color: #d9d9d9;
//   height: 100px;
//   width: 100%;
//   object-fit: cover;
//   border-radius: 16px;
//   margin-bottom: 16px;
// `;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

function TrendArticleList() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/infoPosts?category=info_trend")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/infoboard/trend/${id}`);
  };

  const CardImage = ({ src, alt }) => {
  const [imgError, setImgError] = useState(false);

  return imgError || !src ? (
    <div
      style={{
        height: "100px",
        width: "100%",
        backgroundColor: "#d9d9d9",
        borderRadius: "16px",
        marginBottom: "16px",
      }}
    />
    ) : (
      <img
        src={src}
        alt=""
        onError={() => setImgError(true)}
        style={{
          height: "100px",
          width: "100%",
          objectFit: "cover",
          borderRadius: "16px",
          marginBottom: "16px",
          display: "block",
        }}
      />
    );
  };


  return (
    <Grid>
      {articles.map((article) => (
      <Card key={article.info_post_id} onClick={() => handleCardClick(article.info_post_id)}>
        <CardImage src={article.thumbnail} />
        <Title>{article.title}</Title>
      </Card>
      ))}
    </Grid>
  );
}

export default TrendArticleList;
