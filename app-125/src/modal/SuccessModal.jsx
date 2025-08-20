import React from "react";
import {
  ModalOverlay,
  ModalBox,
  Title,
  Message,
  ConfirmButton,
} from "./ModalStyles";

function SuccessModal({ onClose, title = "수정 성공", message = "비밀번호가 수정되었습니다." }) {
  return (
    <ModalOverlay>
      <ModalBox>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalBox>
    </ModalOverlay>
  );
}

export default SuccessModal;
