import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";

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

const TableWrapper = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
`;

const Thead = styled.thead`
  background-color: #f2f2f2;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  color: #888;
  border-bottom: 2px solid #ccc;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
`;

function SeniorJobRecommend() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3002/api/infoPosts?category=info_recommend")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
      });
  }, []);

  return (
    <>
      <Header />
      <PageWrapper>
        <Title>중장년 직무 추천</Title>
        <TableWrapper>
          <Table>
            <Thead>
              <tr>
                <Th>번호</Th>
                <Th>추천 직무</Th>
                <Th>업데이트 날짜</Th>
              </tr>
            </Thead>
            <tbody>
              {jobs.map((item, index) => (
                <Tr key={item.info_post_id}>
                  <Td>
                    <StyledLink to={`/infoboard/recommend/${item.info_post_id}`}>
                      {index + 1}
                    </StyledLink>
                  </Td>
                  <Td>
                    <StyledLink to={`/infoboard/recommend/${item.info_post_id}`}>
                      {item.title}
                    </StyledLink>
                  </Td>
                  <Td>
                    <StyledLink to={`/infoboard/recommend/${item.info_post_id}`}>
                      {new Date(item.published_at).toLocaleDateString()}
                    </StyledLink>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </PageWrapper>
    </>
  );
}

export default SeniorJobRecommend;
