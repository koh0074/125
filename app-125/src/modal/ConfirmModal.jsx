import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 12px;
  padding: 40px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #222;
`;

const Message = styled.p`
  font-size: 15px;
  color: #444;
  margin-bottom: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const CancelButton = styled.button`
  background-color: #bfbfbf;
  color: white;
  padding: 10px 32px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #a5a5a5;
  }
`;

const ConfirmButton = styled.button`
  background-color: #222;
  color: white;
  padding: 10px 32px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

function ConfirmModal({ onCancel, onConfirm }) {
  return (
    <Overlay>
      <ModalBox>
        <Title>정말 탈퇴하시겠습니까?</Title>
        <Message>모든 데이터가 삭제되며 복구할 수 없습니다.</Message>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonGroup>
      </ModalBox>
    </Overlay>
  );
}

export default ConfirmModal;
