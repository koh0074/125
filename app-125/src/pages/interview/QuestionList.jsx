import React, { useState } from "react";
import styled from "styled-components";
import List from "../../components/list/List";

const Content = styled.div`
    height: 1000px;
    padding-top: 160px;
    background-color: #FDF8F4;

    display: flex;
    justify-content: center;
`;

function QuestionList() {
    const dummyList = [
    { id: 1, title: "자기소개를 해보세요.", date: "2025-06-01" },
    { id: 2, title: "지원 동기는 무엇인가요?", date: "2025-06-02" },
    { id: 3, title: "본인의 장점은 무엇인가요?", date: "2025-06-03" },
    { id: 4, title: "단점은 무엇이며, 어떻게 보완하고 있나요?", date: "2025-06-04" },
    { id: 5, title: "협업 시 갈등이 생기면 어떻게 해결하나요?", date: "2025-06-05" },
    { id: 6, title: "이전 프로젝트에서 맡은 역할은 무엇이었나요?", date: "2025-06-06" },
    { id: 7, title: "가장 어려웠던 경험과 극복 방법은?", date: "2025-06-07" },
    { id: 8, title: "지원한 직무에 필요한 역량은 무엇인가요?", date: "2025-06-08" },
    { id: 9, title: "향후 5년 계획은 어떻게 되나요?", date: "2025-06-09" },
    { id: 10, title: "기술 변화에 어떻게 대응하고 있나요?", date: "2025-06-10" },
    { id: 11, title: "실패를 경험한 적이 있다면?", date: "2025-06-11" },
    { id: 12, title: "이 직무를 선택한 이유는 무엇인가요?", date: "2025-06-12" },
    { id: 13, title: "최근 읽은 책이나 기사 중 기억에 남는 것은?", date: "2025-06-13" },
    { id: 14, title: "리더십 경험이 있다면?", date: "2025-06-14" },
    { id: 15, title: "타인의 피드백을 어떻게 수용하나요?", date: "2025-06-15" },
    { id: 16, title: "시간 관리 방법은 어떻게 되나요?", date: "2025-06-16" },
    { id: 17, title: "가장 자신 있는 기술 스택은?", date: "2025-06-17" },
    { id: 18, title: "문제를 해결한 경험이 있다면?", date: "2025-06-18" },
    { id: 19, title: "자신만의 학습 방법이 있다면?", date: "2025-06-19" },
    { id: 20, title: "어떤 개발 문화를 선호하나요?", date: "2025-06-20" },
    ];

    return (
    <>
        <Content>
            <List type={"예상 질문"} data={dummyList} />
        </Content>
    </>
  );
}

export default QuestionList;