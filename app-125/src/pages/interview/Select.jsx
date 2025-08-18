import React, { useState } from "react";
import styled from "styled-components";

const Content = styled.div`
    height: 1000px;
    padding-top: 150px;
    background-color: #FDF8F4;

     display: flex;
    justify-content: center;
`;

const Form = styled.form `
`;

const Title = styled.h2 `
    color: #000000;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 25px;
    margin-left: 30px;
`;

const InputWrap = styled.div ` /* 위치 조정을 위한 div */
  display: flex;
  width: 1176px;
  justify-content: space-between;
`;

const InputDiv = styled.div `
    margin-bottom: 76px;
    margin-left: 30px;
`;

const Label = styled.p `
    width: 140px;
    color: #B1B5C3;
    font-size: 18px;
    margin: 0;
    margin-bottom: 6px;
`;

const ResumeDiv = styled.div `
  display: flex;
  align-items: center;
`;

const Dropbox = styled.select `
    width: 411px;
    height: 48px;
    border: 2px solid #E6E8EC;
    border-radius: 12px;
    color: #777E90;
    font-size: 18px;
    background-color:#00000000
`;

const ChangeBtn = styled.button`
    /*버튼 디자인*/
    width: 226px;
    height: 60px;
    border: none;
    background-color: #2D66D0;
    border-radius: 30px;
    box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
    margin-left: 24px;

    display: flex;
    justify-content: center;
    align-items: center;
    
    /*폰트*/
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
`;

const Input = styled.input `
    width: 307px;
    height: 48px;
    border: 2px solid #E6E8EC;
    border-radius: 12px;
    background-color:#00000000;
    padding: 0 10px;
    
    color: #777E90;
    font-size: 18px;
    
    
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 1160px;
  height: 231px;
  border: 2px solid #E6E8EC;
  border-radius: 12px;
  padding: 10px;
  font-size: 18px;
  background-color:#00000000;
  color: #777E90;
  
  resize: none;
  overflow: auto;

  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled(ChangeBtn) `
width: 193px;
background: linear-gradient(to right, #2D66D0, #5EC27D);
`;


function Select() {
    return (
    <>
    <Content>
      <Form>
      <Title>예상 질문 확인하기</Title>
        <InputDiv>
          <Label>이력서 선택</Label>
      <ResumeDiv>
          <Dropbox type="dropbox">
            <option value="" hidden disabled selected>이력서를 선택해주세요</option>
            <option value="resume1">이력서 1</option>
            <option value="resume2">이력서 2</option>
          </Dropbox>
        <ChangeBtn>다른 이력서 선택하기</ChangeBtn>
      </ResumeDiv>
        </InputDiv>
      <InputWrap>
        <InputDiv>
          <Label>이력서 선택</Label>
          <Input type="text"/>
        </InputDiv>
        <InputDiv>
          <Label>이력서 선택</Label>
          <Input type="text"/>
        </InputDiv>
        <InputDiv>
          <Label>이력서 선택</Label>
          <Input type="text"/>
        </InputDiv>
      </InputWrap>
      <InputDiv>
        <Label>이력서 선택</Label>
        <Textarea/>
      </InputDiv>
      <SubmitBtn type="submit">예상 질문 확인하기 →</SubmitBtn>
      </Form>
    </Content>
    </>
  );
}

export default Select;