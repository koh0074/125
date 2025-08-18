import React from 'react';
import { useState } from 'react';
import {
  SectionWrapper,
  Title,
  FilterBar,
  FilterButton,
  ListWrapper,
} from './InterviewQuestionSection.styles';
import InterviewQuestionItem from './InterviewQuestionItem';

const mockQuestions = [
  {
    id: 1,
    season: '2025 상반기',
    type: '일반면접',
    job: '온라인 마케터',
    question: '자기소개 해주세요.',
  },
  {
    id: 2,
    season: '2025 상반기',
    type: '역량면접',
    job: '디자이너',
    question: '협업 시 갈등을 해결했던 경험을 말해주세요.',
  },
];


const InterviewQuestionSection = () => {
    const [selected, setSelected] = useState('면접 전체');

  return (
    <SectionWrapper>
      <Title>면접 예상 질문</Title>
        <FilterBar>
        {['면접 전체', '인성면접', '임원면접', '일반면접', '역량면접', 'PT면접'].map((label, index) => (
            <FilterButton
            key={index}
            active={selected === label}
            onClick={() => setSelected(label)}
            >
            {label}
            </FilterButton>
        ))}
        </FilterBar>

      <ListWrapper>
        {mockQuestions.map((item) => (
          <InterviewQuestionItem key={item.id} {...item} />
        ))}
      </ListWrapper>
    </SectionWrapper>
  );
};

export default InterviewQuestionSection;
