import React, { useState } from "react";
import styled from "styled-components";
import CustomProgressBar from "../../components/resume/CustomProgressBar";

const Content = styled.div`
  height: 1000px;
  padding-top: 170px;
  background-color: #fdfcfc;

  display: flex;
  justify-content: center;
`;

const PositionWrap = styled.div``;

const Title = styled.h2`
  color: #000000;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 30px;
`;

const Subtitle = styled.h3`
  font-weight: bold;
  margin: 0;
  font-size: 20px;
`;

const SubTitle2 = styled(Subtitle)`
  margin-bottom: 24px;
`;

const Description = styled.p`
  color: #b1b5c3;
  font-size: 18px;
  margin: 0;
`;

const Essential = styled.span`
  color: red;
`;

const Box = styled.div`
  margin-top: 48px;
  width: 1177px;
  border: none;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 25px 0 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

const Label = styled.p`
  font-weight: bold;
  color: #b1b5c3;
  width: 120px;
`;

const InputDiv = styled.div`
  display: flex;
  aligh-items: center;
  text-align: center;
`;

const Input = styled.input`
  padding-left: 10px;
  width: 350px;
  height: 48px;
  border: 2px solid #ccc;
  color: #777e90;
  font-size: 18px;
  border-radius: 12px;

  ${({ disabled }) =>
    disabled &&
    `
    color:rgb(182, 184, 190);
    background-color: #fff;
    border: 1px solid #E6E8EC;
    cursor: default;
  `}
`;

const Input2 = styled.input`
  padding-left: 10px;
  width: 1177px;
  height: 48px;
  border: 2px solid #e6e8ec;
  color: #777e90;
  font-size: 18px;
  border-radius: 12px;
`;

const Select = styled.select`
  padding-left: 10px;
  width: 1270px;
  height: 48px;
  border: 2px solid #aaa;
  color: #777e90;
  font-size: 18px;
  border-radius: 12px;

  ${({ disabled }) =>
    disabled &&
    `
    appearance: none;
    background-color: #fff;
    border: 1px solid #E6E8EC;
    cursor: default;
    background-image: none;
  `}
`;

const Wrap = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const HalfInput = styled(Input)`
  width: 250px;
`;

const HalfSelect = styled(Select)`
  width: 150px;
`;

const HalfSelect2 = styled(HalfSelect)`
  margin-left: 20px;
`;

const Edit = styled.button`
  /*버튼 디자인*/
  width: 75px;
  height: 32px;
  border-radius: 30px;
  background: #fff;
  border: 1px solid #2d66d0;
  color: #2d66d0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 30px;

  /*폰트*/
  font-size: 18px;
  font-weight: bold;

  /* 호버 효과 */
  &:hover {
    background-color: #f0f5ff;
    border-color: #5a7ed8;
    color: #5a7ed8;
    cursor: pointer;
  }
`;

const BtnDiv = styled.div`
  width: 100%;
  margin-top: 60px;
  position: relative;
`;

const Btn = styled.button`
  /*버튼 디자인*/
  width: 86px;
  height: 60px;
  border: none;
  background-color: #2d66d0;
  border-radius: 30px;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

  position: absolute;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  /*폰트*/
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: #5a7ed8; /* 기존 색보다 연한 파란색 */
    cursor: pointer;
  }
`;

function Create1({
  title,
  setTitle,
  name,
  setName,
  age,
  setAge,
  gender,
  setGender,
  address,
  setAddress,
  tel,
  setTel,
  email1,
  setEmail1,
  email2,
  setEmail2,
  isEditing,
  setIsEditing,
  onNext,
}) {
  const handleEditToggle = () => {
    if (isEditing) {
      // 박스 안 필드 유효성 검사
      if (!name.trim() || !age.trim() || !gender.trim() || !address.trim() || !tel.trim() || !email1.trim() || !email2.trim()) {
        alert("모든 필드를 빠짐없이 입력해주세요.");
        return;
      }

      // 휴대폰 번호 형식 체크
      if (tel.length !== 11 || !/^\d{11}$/.test(tel)) {
        alert("휴대폰 번호를 11자리 숫자로 입력해주세요.");
        return;
      }

      // 11자리면 하이픈 추가
      const formattedPhone = tel.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      setTel(formattedPhone);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const fullEmail = `${email1}@${email2}`;
      if (!emailRegex.test(fullEmail)) {
        alert("올바른 이메일 주소를 입력해주세요.");
        return;
      }

      setIsEditing(false); // 완료 상태로 변경
    } else {
      setIsEditing(true); // 편집 상태로 변경
    }
  };

  return (
    <Content>
      <PositionWrap>
        <Title>이력서 작성</Title>
        <CustomProgressBar currentPage={1} />

        <SubTitle2>
          이력서 제목<Essential>*</Essential>
        </SubTitle2>
        <Input2
          type="text"
          value={title}
          disabled={isEditing} // 편집 중엔 제목 입력 가능, 완료 시 비활성화 (원하는대로 조정)
          onChange={(e) => setTitle(e.target.value)}
        />

        <Box>
          <Subtitle>회원 정보</Subtitle>
          <Description>{name}님의 정보가 맞는지 확인해주세요.</Description>

          <Wrap>
            <InputDiv>
              <Label>이름</Label>
              <Input value={name} disabled={!isEditing} onChange={(e) => setName(e.target.value)} />
            </InputDiv>

            <Wrap>
              <InputDiv>
                <Label>나이 ∙ 성별</Label>
                <HalfInput value={age} disabled={!isEditing} onChange={(e) => setAge(e.target.value)} />
                <HalfSelect2 value={gender} disabled={!isEditing} onChange={(e) => setGender(e.target.value)}>
                  <option value="female">여성</option>
                  <option value="male">남성</option>
                </HalfSelect2>
              </InputDiv>
            </Wrap>
          </Wrap>

          <InputDiv>
            <Label>주소</Label>
            <Input value={address} disabled={!isEditing} onChange={(e) => setAddress(e.target.value)} />
          </InputDiv>

          <Wrap>
            <InputDiv>
              <Label>휴대폰</Label>
              <HalfInput value={tel} disabled={!isEditing} onChange={(e) => setTel(e.target.value)} />
            </InputDiv>

            <InputDiv>
              <Label>이메일</Label>
              <Wrap>
                <HalfInput value={email1} disabled={!isEditing} onChange={(e) => setEmail1(e.target.value)} />
                <span>@</span>
                <HalfSelect value={email2} disabled={!isEditing} onChange={(e) => setEmail2(e.target.value)}>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                </HalfSelect>
              </Wrap>
            </InputDiv>
          </Wrap>

          <Edit onClick={handleEditToggle}>{isEditing ? "완료" : "수정"}</Edit>
        </Box>
        <BtnDiv>
          {/* 다음으로 가는 버튼 */}
          <Btn
            disabled={isEditing} // 수정 중일 땐 비활성화
            onClick={() => {
              if (isEditing) return; // 수정 중이면 무시

              if (!title.trim()) {
                alert("제목을 입력해주세요.");
                return;
              }

              if (typeof onNext === "function") {
                onNext();
              }
            }}
          >
            다음 →
          </Btn>
        </BtnDiv>
      </PositionWrap>
    </Content>
  );
}

export default Create1;
