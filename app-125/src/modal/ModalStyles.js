import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 32px 70px;
  text-align: center;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #2e2e2e;
  margin-bottom: 8px;
`;

export const Message = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 24px;
`;

export const ConfirmButton = styled.button`
  padding: 8px 36px;
  background-color: #2e2e2e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #1c1c1c;
  }
`;
