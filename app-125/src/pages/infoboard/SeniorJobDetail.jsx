import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineEye } from "react-icons/hi";
import Header from "../../components/Header";

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
  border-radius: 8px;
  padding: 32px;
`;

const TopInfo = styled.div`
  margin-bottom: 12px;
`;

const InfoTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Meta = styled.div`
  color: #bdbdbd;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const Tag = styled.div`
  display: inline-block;
  border: 1px solid #2d66d0;
  color: #2d66d0;
  font-weight: 600;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 14px;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const JobDesc = styled.div`
  font-size: 16px;
  min-height: 180px;
  padding: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: white;
  white-space: pre-line; /* 줄바꿈 처리 */
`;

const HashtagGroup = styled.div`
  margin-top: 16px;
  color: #666;
  font-size: 14px;

  span {
    margin-right: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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

function SeniorJobDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3002/api/infoPosts?category=info_recommend")
      .then((res) => {
        const matched = res.data.find(
          (item) => String(item.info_post_id) === id
        );
        if (matched) {
          setData({
            title: matched.title,
            views: 1234, // 아직 API에 없으면 임시로
            date: new Date(matched.published_at).toLocaleDateString(),
            field: "직무 추천", 
            companyDesc: "", // 없으면 생략
            jobSummary: matched.content,
            hashtags: [], // 없다면 빈 배열
            siteUrl: matched.source_url || "", // 없으면 비워둠
          });
        }
      })
      .catch((err) => {
        console.error("데이터 가져오기 실패", err);
      });
  }, [id]);

  if (!data) return null;

  return (
    <>
      <Header />
      <PageWrapper>
        <Title>중장년 직무추천</Title>
        <CardWrapper>
          <TopInfo>
            <InfoTitle>{data.title}</InfoTitle>
            <Meta>
              <span>
                <HiOutlineEye /> {data.views}
              </span>
              <span>{data.date} 작성</span>
            </Meta>
          </TopInfo>

          <Tag>{data.field}</Tag>

          <JobDesc>{data.jobSummary}</JobDesc>

          {data.hashtags.length > 0 && (
            <HashtagGroup>
              {data.hashtags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </HashtagGroup>
          )}

          {data.siteUrl && (
            <ButtonWrapper>
              <GoSiteButton onClick={() => window.open(data.siteUrl)}>
                사이트 바로가기 →
              </GoSiteButton>
            </ButtonWrapper>
          )}
        </CardWrapper>
      </PageWrapper>
    </>
  );
}

export default SeniorJobDetail;
