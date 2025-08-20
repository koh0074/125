import React, { useState } from "react";
import styled from "styled-components";
import CustomProgressBar from "../../components/resume/CustomProgressBar";

const Content = styled.div`
  height: 1000px;
  padding-top: 170px;
  background-color: #fdfcfc;
  display: flex;
  justify-content: center;
`;

const PositionWrap = styled.div``;

const Title = styled.h2`
  color: #000000;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 30px;
`;

const Subtitle = styled.h3`
  font-weight: bold;
  margin: 0;
  font-size: 20px;
  margin-bottom: 24px;
`;

const Textarea = styled.textarea`
  padding-left: 10px;
  padding-top: 10px;
  width: 1177px;
  height: 402px;
  border: 2px solid #ccc;
  color: #777e90;
  font-size: 18px;
  border-radius: 12px;
  resize: none;
`;

const Essential = styled.span`
  color: red;
`;

const BtnDiv = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  /*버튼 디자인*/
  width: 86px;
  height: 60px;
  border: none;
  background-color: #2d66d0;
  border-radius: 30px;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;

  /*폰트*/
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;

  /* 호버 효과 */
  &:hover {
    background-color: #5a7ed8; /* 기존 색보다 연한 파란색 */
    cursor: pointer;
  }
`;

const Btn2 = styled(Btn)`
  width: 150px;
  background-color: #5ec27d;

    /* 호버 효과 */
  &:hover {
    background-color: #81d29d;
    cursor: pointer;
`;

function Create5({ selfIntro, setSelfIntro, onSubmit, goPrev }) {
  return (
    <Content>
      <PositionWrap>
        <Title>이력서 작성</Title>
        <CustomProgressBar currentPage={5} />

        <Subtitle>
          자기소개 <Essential>*</Essential>
        </Subtitle>
        <Textarea value={selfIntro} onChange={(e) => setSelfIntro(e.target.value)} placeholder="자기소개를 입력하세요" rows="10" cols="80" />
        <BtnDiv>
          {/* 이전 */}
          <Btn onClick={goPrev}>← 이전</Btn>
          {/* 다음 */}
          <Btn2 onClick={onSubmit}>이력서 완성하기</Btn2>
        </BtnDiv>
      </PositionWrap>
    </Content>
  );
}

export default Create5;
