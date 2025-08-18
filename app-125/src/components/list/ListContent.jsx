import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import modifyBtn from "../../img/list/modify.png";
import deleteBtn from "../../img/list/delete.png";

/*
부모 컴포넌트 호출 예시

정보게시판, 예상질문 목록 페이지 - 삭제만 
<ListContent type={"default"} index={123} title={"fdjfksdfdkj1"} date={"1223/22/03"}/>

이력서 목록 페이지 - 수정 / 삭제
<ListContent type={"resume"} index={1} title={1} date={1}/>
*/

const Content = styled.div`
  width: 1177px;
  height: 60px;
  background-color: white;
  border: 1px solid #d0d0ce;
  border-top: none;
  padding-left: 10px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  &:hover {
    background-color: #f8f8f8ff;
    box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
`;

const Index = styled.p`
  width: 56px;
  overflow: hidden;
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
  display: flex;
  justify-content: space-around;
`;

function ListContent({ type, id, index, title, date }) {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/resumes/${id}`); // 상세 페이지 라우트로 이동
  };

  const goToEdit = () => {
    navigate(`/resumes/edit/${id}`); // 수정 라우트로 이동
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:3002/api/resumes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("삭제에 실패했습니다.");
      }

      alert("삭제가 완료되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Content style={{ cursor: "pointer" }}>
      <Index onClick={goToDetail}>{index}</Index>
      <Title onClick={goToDetail}>{title}</Title>
      <Date onClick={goToDetail}>{date}</Date>
      <BtnDiv>
        {type === "resume" && <img width={15} src={modifyBtn} onClick={goToEdit} alt="수정" />}
        <img width={15} src={deleteBtn} alt="삭제" onClick={handleDelete} style={{ cursor: "pointer" }} />
      </BtnDiv>
    </Content>
  );
}

export default ListContent;
