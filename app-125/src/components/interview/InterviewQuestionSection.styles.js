import styled from 'styled-components';

export const SectionWrapper = styled.section`
  margin-top: 60px;
  margin-bottom: 60px;
  padding: 0 20px;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
  overflow-x: auto;
`;

export const FilterButton = styled.button`
  flex: 1;
  margin: 0 6px;
  padding: 10px 16px;
  font-size: 16px;
  border: 2px solid ${(props) => (props.active ? '#2962f6' : '#ddd')};
  background-color: ${(props) => (props.active ? '#f9fcffff' : '#fff')};
  color: ${(props) => (props.active ? '#2962f6' : '#333')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ListWrapper = styled.div`
  margin-top: 16px;
`;