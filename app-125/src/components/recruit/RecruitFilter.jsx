import styled from 'styled-components';

const FilterContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 32px 24px;
  margin-bottom: 24px;
`;
const Title = styled.h3`
  font-size: 20px;
  margin: 0 0 16px 0;
  font-weight: 600;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, auto));
  gap: 12px;
`;
const Btn = styled.button`
  padding: 10px 16px;
  font-size: 16px;
  border: 2px solid ${(p) => (p.$active ? '#2962f6' : '#ddd')};
  background-color: ${(p) => (p.$active ? '#f9fcffff' : '#fff')};
  color: ${(p) => (p.$active ? '#2962f6' : '#333')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { background-color: #f5f5f5; }
`;

/**
 * label: 화면 표시용
 * value: 서버/프론트가 사용하는 실제 ENUM 값. null이면 전체.
 */
const OPTIONS = [
  { label: '직무 전체', value: null },
  { label: '기획·경영', value: '기획·경영' },
  { label: '마케팅·영업', value: '마케팅·영업' },
  { label: '회계·인사·지원', value: '회계·인사·지원' },
  { label: 'IT·데이터', value: 'IT·데이터' },
  { label: '디자인·콘텐츠', value: '디자인·콘텐츠' },
  { label: '생산·물류', value: '생산·물류' },
  { label: '교육·의료·연구', value: '교육·의료·연구' },
  { label: '공공·금융', value: '공공·금융' },
];

export default function RecruitFilter({ value, onChange }) {
  return (
    <FilterContainer>
      <Title>직무 카테고리</Title>
      <Grid>
        {OPTIONS.map((opt) => (
          <Btn
            key={opt.label}
            $active={value === opt.value}     
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
          >
            {opt.label}
          </Btn>
        ))}
      </Grid>
    </FilterContainer>
  );
}
