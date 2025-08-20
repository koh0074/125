import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const Meta = styled.div`
  color: #888;
  font-size: 13px;
  margin-bottom: 8px;
`;

const Question = styled.div`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: flex-start;
`;

const QuoteMark = styled.span`
  font-size: 24px;
  color: #bbb;
  margin: 0 6px 0 0;
`;

const EndQuoteMark = styled.span`
  font-size: 24px;
  color: #bbb;
  margin-left: 6px;
`;

const InterviewQuestionItem = ({ season, type, job, question }) => {
  return (
    <ItemWrapper>
      <Meta>{season}</Meta>
      <Meta>{type} - {job}</Meta>
      <Question>
        <QuoteMark>“</QuoteMark>
        <span>{question}</span>
        <EndQuoteMark>”</EndQuoteMark>
      </Question>
    </ItemWrapper>
  );
};

export default InterviewQuestionItem;
