// src/pages/DigitalEducation.jsx
import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import DigitalCardList from "../../components/infoboard/DigitalCardList";

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

function DigitalEducation() {
  return (
    <>
      <Header />
      <PageWrapper>
        <Title>디지털 기술 교육</Title>
        <DigitalCardList />
      </PageWrapper>
    </>
  );
}

export default DigitalEducation;
