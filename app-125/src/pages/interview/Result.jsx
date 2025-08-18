import React, { useState } from "react";
import styled from "styled-components";
import Question from "../../components/interview/Question";

const Content = styled.div`
    height: 1800px;
    padding-top: 200px;
    background-color: #FDF8F4;

    display: flex;
    justify-content: center;
`;

const Title = styled.h2 `
    color: #000000;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 61px;
`;

const ChangeBtn = styled.button`
    /*버튼 디자인*/
    width: 284px;
    height: 60px;
    border: none;
    background: linear-gradient(to right, #2D66D0, #5EC27D);
    border-radius: 30px;
    box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 270px;
    bottom: 0;
    
    /*폰트*/
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
`;

const NextBtn = styled(ChangeBtn) `
    height: 62px;
    width: 230px;
    background: #2D66D0;

    position: absolute;
    bottom: 0;
    left: 0;
`;

const QList = styled.div `
    height: 1600px;
    position: relative;
`;


function Result() {
    return (
    <>
        <Content>
            <QList>
                <Title>코딩 강사 지원서 최종 (2050. 13. 21)  예상 질문</Title>
            <Question question={"질문1 입니다."} answer={"답변1 입니다."}/>
            <Question question={"질문2 입니다."} answer={"답변2 입니다."}/>
            <Question question={"질문3 입니다."} answer={"답변3 입니다."}/>
            <Question question={"질문4 입니다."} answer={"답변4 입니다."}/>
            <NextBtn type="button">예상 질문 목록으로 이동 →</NextBtn>
            <ChangeBtn type="button">다른 이력서 예상 질문 생성하기 →</ChangeBtn>
            </QList>
        </Content>
    </>
  );
}

export default Result;