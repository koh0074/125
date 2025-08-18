import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import SuccessModal from "../../modal/SuccessModal";

const Container = styled.div`
  max-width: 480px;
  margin: 80px auto 0;
  padding: 0 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #5b6270;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: #f3f6fb;
  border: none;
  font-size: 16px;
  margin-bottom: 32px;

  &::placeholder {
    color: #aab0b9;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 32px;
`;

const SubmitButton = styled.button`
  padding: 12px 32px;
  background-color: #2e2e2e;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1c1c1c;
  }
`;

function ChangePassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put("/api/user/mypage/update", {
        password: newPassword,
      });

      setShowModal(true);
      setNewPassword("");
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/mypage/account"); // 계정 관리 페이지로 이동
  };

  return (
    <Container>
      <Label htmlFor="newPassword">새로운 비밀번호 입력</Label>
      <Input
        id="newPassword"
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <ButtonWrapper>
        <SubmitButton onClick={handleSubmit}>수정하기</SubmitButton>
      </ButtonWrapper>

      {showModal && (
        <SuccessModal
          onClose={handleCloseModal}
          title="비밀번호 변경 완료"
          message="비밀번호가 성공적으로 변경되었습니다."
        />
      )}
    </Container>
  );
}

export default ChangePassword;
