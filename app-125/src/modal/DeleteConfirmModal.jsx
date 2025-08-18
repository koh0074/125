import {
  ModalOverlay,
  ModalBox,
  Title,
  Message,
  ConfirmButton,
} from "./ModalStyles"; 

function DeleteConfirmModal({ title, message, onClose, onConfirm }) {
  return (
    <ModalOverlay>
      <ModalBox>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <ConfirmButton onClick={onConfirm}>삭제</ConfirmButton>
          <ConfirmButton style={{ backgroundColor: "#aaa" }} onClick={onClose}>
            취소
          </ConfirmButton>
        </div>
      </ModalBox>
    </ModalOverlay>
  );
}

export default DeleteConfirmModal;

