import styled from "styled-components";
import ListContent from "./ListContent";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination"; // ✅ MUI에서 가져오기
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

/*
    실행 전 패키지 설치해주세요!
    npm install @mui/material @emotion/react @emotion/styled


    부모 컴포넌트 호출 예시
    <List type={"이력서"} data={리스트 형태의 데이터}/>
*/

const PositionWrap = styled.div`
  width: 1177px;
  position: relative;
`;

const ListTitle = styled.h2`
  color: black;
  font-weight: bold;
  font-size: 24px;
`;

const ListWrap = styled.div`
  width: 1177px;
  display: column;
  justify-content: center;
`;

const Content = styled.div`
  margin-top: 30px;
`;

const SubTitle = styled.div`
  width: 1177px;
  height: 60px;
  background-color: #f9fbfc;
  border: 1px solid #d0d0ce;
  border-bottom: none;
  padding-left: 7px;
  margin: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Index = styled.p`
  width: 56px;
  color: #6a6a65;
  font-size: 14px;
`;

const Title = styled(Index)`
  width: 536px;
`;

const Date = styled(Index)`
  width: 375px;
`;

const BtnDiv = styled.div`
  width: 66px;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const Button = styled.button`
  /*버튼 디자인*/
  width: 50px;
  height: 40px;
  border: none;
  background-color: #5ec27d;
  border-radius: 30px;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

  position: absolute;
  top: 23px;
  right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  /*폰트*/
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;

    /* 호버 효과 */
  &:hover {
    background-color: #81d29d;
    cursor: pointer;
`;

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "black",
          border: "none",
          backgroundColor: "#F5F5F5",
          "&.Mui-selected": {
            backgroundColor: "#FEAD5C",
            color: "#fff",
          },
        },
      },
    },
  },
});

function List({ type, data }) {
  const [stockList, setStockList] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    setStockList(data);
  }, [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastPage = Math.ceil(stockList.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentList = stockList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // 생성
  const goToCreate = () => {
    navigate(`/resumes/create`);
  };

  return (
    <>
      <PositionWrap>
        <ListTitle>{type}</ListTitle>
        <Button onClick={goToCreate}>+</Button>
        <ListWrap>
          <Content>
            <SubTitle>
              <Index>번호</Index>
              <Title>제목</Title>
              <Date>작성일</Date>
              <BtnDiv></BtnDiv>
            </SubTitle>

            {currentList.map((item, idx) => (
              <ListContent
                key={item.id}
                type={type === "이력서" ? "resume" : "default"}
                index={indexOfFirstItem + idx + 1} // 이건 화면 표시용
                id={item.id} // 삭제 API용 id 전달
                title={item.title}
                date={item.date}
              />
            ))}
          </Content>
          <PaginationWrap>
            <ThemeProvider theme={theme}>
              <Pagination
                page={currentPage}
                count={lastPage}
                shape={"rounded"}
                onChange={handlePageChange}
                siblingCount={2} // 현재 페이지 좌우 몇 개 보여줄지
                boundaryCount={1} // 처음과 끝 몇 개 보여줄지
              />
            </ThemeProvider>
          </PaginationWrap>
        </ListWrap>
      </PositionWrap>
    </>
  );
}

export default List;
