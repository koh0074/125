import React, { useState, useEffect } from "react";
import styled from "styled-components";
import List from "../../components/list/List";
import Header from "../../components/Header";

const Content = styled.div`
  height: 900px;
  padding-top: 170px;
  background-color: #fdfcfc;

  display: flex;
  justify-content: center;
`;

function ResumeList() {
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:3002/api/resumes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("서버 응답이 좋지 않습니다.");
        }

        const data = await response.json();

        // 날짜 포맷으로 변환
        const formatted = data.resumes.map((item) => ({
          id: item.resume_id,
          title: item.title,
          date: item.created_at.split("T")[0],
        }));

        setResumeList(formatted);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <Content>
      <Header />
      <List type={"이력서"} data={resumeList} />
    </Content>
  );
}
export default ResumeList;
