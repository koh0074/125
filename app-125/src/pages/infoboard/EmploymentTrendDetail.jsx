import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"; // ⭐ 추가

const PageWrapper = styled.div`
  padding-top: 140px;
  padding-bottom: 80px;
  max-width: 1178px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const CardWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 32px;
  background-color: #fff;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThumbnailWrapper = styled.div`  
  position: relative;
  margin-bottom: 24px;
`;

const ScrapIcon = styled.div`
  font-size: 26px;
  color: ${(props) => (props.scrapped ? "#f2a65a" : "#888")};
  cursor: pointer;
`;

const ImageThumbnail = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
`;

const GrayBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: #d9d9d9;
  border-radius: 16px;
`;

const CategoryTag = styled.div`
  display: inline-block;
  font-size: 14px;
  background-color: #f1f1f1;
  color: #555;
  border-radius: 8px;
  padding: 4px 12px;
  margin-bottom: 12px;
`;

const InfoTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #bdbdbd;
  margin-bottom: 20px;
`;

const Summary = styled.p`
  font-size: 15px;
  color: #444;
  line-height: 1.6;
  margin-bottom: 32px;
  white-space: pre-line;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GoSiteButton = styled.button`
  background: linear-gradient(90deg, #2d66d0 0%, #fead5c 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

function EmploymentTrendDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [scrapped, setScrapped] = useState(false); 

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3002/api/infoPosts/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
      });

    axios
      .get("http://127.0.0.1:3002/api/mypage/scraps") // 스크랩 여부 확인
      .then((res) => {
        const exists = res.data.scraps?.some(
          (scrap) =>
            scrap.post_type === "info" && String(scrap.info_post_id) === id
        );
        setScrapped(exists);
      })
      .catch((err) => {
        console.error("스크랩 확인 실패:", err);
      });
  }, [id]);

  const toggleScrap = async () => {
    try {
      if (scrapped) {
        await axios.delete(`http://127.0.0.1:3002/api/infoPosts/${id}/scrap`);
        setScrapped(false);
      } else {
        await axios.post(`http://127.0.0.1:3002/api/infoPosts/${id}/scrap`);
        setScrapped(true);
      }
    } catch (error) {
      console.error("스크랩 요청 실패:", error);
    }
  };

  if (!data) return <div style={{ paddingTop: "140px", textAlign: "center" }}>데이터를 불러오는 중입니다...</div>;

  return (
    <>
      <Header />
      <PageWrapper>
        <Title>중장년 취업 트렌드</Title>
        <CardWrapper>
          <TopBar>
            <TitleGroup>
              <InfoTitle>{data.title}</InfoTitle>
              <Meta>
                <span>{new Date(data.published_at).toLocaleDateString()}</span>
              </Meta>
            </TitleGroup>
            <ScrapIcon scrapped={scrapped} onClick={toggleScrap}>
              {scrapped ? <BsBookmarkFill /> : <BsBookmark />}
            </ScrapIcon>
          </TopBar>

          <ThumbnailWrapper>
            {data.thumbnail ? (
              <ImageThumbnail src={data.thumbnail} alt="썸네일 이미지" />
            ) : (
              <GrayBox />
            )}
          </ThumbnailWrapper>

          <CategoryTag>중장년 취업</CategoryTag>
          <Summary>{data.summary}</Summary>

          {data.source_url && (
            <ButtonWrapper>
              <GoSiteButton onClick={() => window.open(data.source_url, "_blank")}>
                사이트 바로가기 →
              </GoSiteButton>
            </ButtonWrapper>
          )}
        </CardWrapper>

      </PageWrapper>
    </>
  );
}

export default EmploymentTrendDetail;
