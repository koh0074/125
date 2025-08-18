import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import TrendArticleList from "../../components/infoboard/TrendArticleList";

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

function EmploymentTrend() {
  return (
    <>
      <Header />
      <PageWrapper>
        <Title>취업 시장 트렌드</Title>
        <TrendArticleList />
      </PageWrapper>
    </>
  );
}

export default EmploymentTrend;
