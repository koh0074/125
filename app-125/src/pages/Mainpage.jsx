// MainPage.js
import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import bannerBackground from "../img/bannerbackground.png";
import AIRetouchingImg from "../img/AIRetouchingImg.png";
import JobResearchImg from "../img/JobResearchImg.png";
import InfoBroadImg from "../img/InfoBroadImg.png";
import CommunityImg from "../img/CommunityImg.png";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom'

const PageWrapper = styled.div`
  padding-top: 114px;
`;

const Banner = styled.section`
  width: 100%;
  height: 400px;
  background-image: url(${bannerBackground});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerContent = styled.div`
  width: 1178px;
  text-align: left;
  color: black;
`;

const BannerTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

const BannerSubtitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-top: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 30px;
`;

const BannerButtonPrimary = styled.button`
  background: linear-gradient(to right, #2D66D0, #5EC27D);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  padding: 12px 24px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #1f4fab;
  }
`;

const BannerButtonSecondary = styled.button`
  background: linear-gradient(to right, #2D66D0, #FEAD5C);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  padding: 12px 24px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Section = styled.section`
  max-width: 1178px;
  margin: 80px auto 200px auto;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 40px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 22%;
  min-width: 200px;
  max-width: 240px;
  height: 220px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <PageWrapper>
        <Banner>
          <BannerContent>
            <BannerTitle>125 일이요! :</BannerTitle>
            <BannerSubtitle>한 번 더, 두 번째 기회, 다섯 가지의 가능성!</BannerSubtitle>
            <ButtonGroup>
              <BannerButtonPrimary onClick={() => navigate('/resume')}>이력서 리터칭 시작하기</BannerButtonPrimary>
              <BannerButtonSecondary onClick={() => navigate('/recruit')}>채용 공고 바로가기</BannerButtonSecondary>
            </ButtonGroup>
          </BannerContent>
        </Banner>

        <Section>
          <SectionTitle>서비스 바로가기</SectionTitle>
          <CardContainer>
            <Card onClick={() => navigate('/recruit')}>
              <CardImage src={JobResearchImg} alt="구인/구직 게시판" />
              <CardText>구인/구직 게시판</CardText>
            </Card>
            <Card onClick={() => navigate('/resume')}>
              <CardImage src={AIRetouchingImg} alt="AI 이력서 리터칭" />
              <CardText>AI 이력서 리터칭</CardText>
            </Card>
            <Card onClick={() => navigate('/community')}>
              <CardImage src={CommunityImg} alt="커뮤니티" />
              <CardText>커뮤니티</CardText>
            </Card>
            <Card onClick={() => navigate('/infoboard/trend')}>
              <CardImage src={InfoBroadImg} alt="정보게시판" />
              <CardText>정보게시판</CardText>
            </Card>
          </CardContainer>
        </Section>

        <Footer />
      </PageWrapper>
    </>
  );
}

export default MainPage;
