import React, { useState } from "react";
import styled from "styled-components";
import CustomProgressBar from "../../components/resume/CustomProgressBar";

const Content = styled.div`
  height: 1100px;
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
  margin-bottom: 3px;
`;

const Description = styled.p`
  color: #b1b5c3;
  font-size: 18px;
  margin: 0;
  margin-bottom: 20px;
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
  position: relative;
`;

const DetailBox = styled(Box)`
  margin: 0;
  background-color: #f8fcf8;
`;

const InputDiv = styled.div`
  display: flex;
  aligh-items: center;
  text-align: center;
`;

const CareerDetail = styled.div`
  padding-left: 10px;
  width: 955px;
  height: 48px;
  border: 2px solid #d9d9d9;
  color: rgb(164, 164, 164);
  font-size: 18px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;

const Input = styled.input`
  padding-left: 10px;
  width: 450px;
  height: 48px;
  border: 2px solid #d9d9d9;
  color: #777e90;
  font-size: 18px;
  border-radius: 12px;
`;

const DetailInput = styled(Input)`
  background-color: #fff0;
  width: 1000px;
`;

const Select = styled.select`
  padding-left: 10px;
  width: 530px;
  height: 48px;
  border: 2px solid #d9d9d9;
  color: #777e90;
  font-size: 18px;
  border-radius: 12px;
  margin-right: 47px;
`;

const Wrap = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const HalfSelect = styled(Select)`
  width: 340px;
`;

const Line = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  border-top: 1px solid #5ec27d;
  width: 606px;
`;

const Edit = styled.button`
  /*버튼 디자인*/
  width: 60px;
  height: 32px;
  border-radius: 30px;
  background: #fff0;
  border: 1px solid #2d66d0;
  color: #2d66d0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 80px;

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

const Delete = styled(Edit)`
  right: 10px;
`;

const Add = styled.button`
  /*버튼 디자인*/
  width: 75px;
  height: 32px;
  border-radius: 30px;
  background: #5ec27d;
  border: none;
  color: #fff;
  box-shadow: inset 0px 2 px 4px 0px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;

  /*폰트*/
  font-size: 18px;
  font-weight: bold;

      /* 호버 효과 */
  &:hover {
    background-color: #81d29d;
    cursor: pointer;
`;

const BtnDiv = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  /*버튼 디자인*/
  width: 86px;
  height: 60px;
  border: none;
  background-color: #2d66d0;
  border-radius: 30px;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;

  /*폰트*/
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;

  /* 호버 효과 */
  &:hover {
    background-color: #5a7ed8; /* 기존 색보다 연한 파란색 */
    cursor: pointer;
  }
`;

function Create2({ school, setSchool, status, setStatus, careerStatus, setCareerStatus, career, setCareer, careersPeriod, setCareersPeriod, onNext, goPrev }) {
  const [careerInput, setCareerInput] = useState("");
  const [editing, setEditing] = useState(false);

  // 회사명과 기간 분리 함수
  const parseCareerInput = (input) => {
    const match = input.match(/^(.*)\s*\((.*)\)$/);
    if (!match) return { company: input, period: "" };
    const company = match[1].trim();
    const period = match[2].trim();
    return { company, period };
  };

  const handleAddCareer = () => {
    if (!careerInput.trim()) return;

    const { company, period } = parseCareerInput(careerInput);

    setCareer(company);
    setCareersPeriod(period);
    setCareerInput("");
    setEditing(false);

    console.log(company, period);
  };

  const handleEditCareer = () => {
    setCareerInput(`${career} (${careersPeriod})`);
    setEditing(true);
  };

  const handleDeleteCareer = () => {
    setCareer("");
    setCareersPeriod("");
    setCareerInput("");
    setEditing(false);
  };

  const handleNext = () => {
    if (!school) {
      alert("학교를 선택해주세요.");
      return;
    }
    if (!status) {
      alert("상태를 선택해주세요.");
      return;
    }
    if (!careerStatus) {
      alert("경력 사항을 선택해주세요.");
      return;
    }
    if (careerStatus === "경력" && !career) {
      alert("경력 사항을 입력해주세요.");
      return;
    }
    onNext?.();
  };

  return (
    <Content>
      <PositionWrap>
        <Title>이력서 작성</Title>
        <CustomProgressBar currentPage={2} />

        {/* 학력 정보 */}
        <Box>
          <Subtitle>
            학력 정보 <Essential>*</Essential>
          </Subtitle>
          <Description>최종 학력을 입력해주세요.</Description>
          <Wrap>
            <InputDiv>
              <Select value={school} onChange={(e) => setSchool(e.target.value)}>
                <option value="" disabled hidden>
                  학교
                </option>
                <option value="초등학교">초등학교</option>
                <option value="중학교">중학교</option>
                <option value="고등학교">고등학교</option>
                <option value="대학교(2, 3년제)">대학교 (2, 3년제)</option>
                <option value="대학교(4년제)">대학교 (4년제)</option>
                <option value="대학원">대학원</option>
              </Select>
              <HalfSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="" disabled hidden>
                  상태
                </option>
                <option value="재학">재학</option>
                <option value="휴학">휴학</option>
                <option value="졸업">졸업</option>
              </HalfSelect>
            </InputDiv>
          </Wrap>
        </Box>

        {/* 경력 사항 */}
        <Box>
          <Subtitle>
            경력 사항 <Essential>*</Essential>
          </Subtitle>
          <Description>경력 사항이 있다면 입력해주세요.</Description>
          <Wrap>
            <InputDiv>
              <HalfSelect value={careerStatus} onChange={(e) => setCareerStatus(e.target.value)}>
                <option value="" disabled hidden>
                  선택
                </option>
                <option value="신입">신입</option>
                <option value="경력">경력</option>
              </HalfSelect>
            </InputDiv>
          </Wrap>
        </Box>

        {/* 경력 상세 입력 (경력일 때만) */}
        {careerStatus === "경력" && (
          <DetailBox>
            {career && (
              <CareerDetail>
                {career} ({careersPeriod})
                <Edit
                  type="button"
                  onClick={handleEditCareer}
                  disabled={editing} // 이미 편집 중이면 수정 버튼 비활성화
                >
                  수정
                </Edit>
                <Delete
                  type="button"
                  onClick={handleDeleteCareer}
                  disabled={editing} // 이미 편집 중이면 삭제 버튼 비활성화
                >
                  삭제
                </Delete>
              </CareerDetail>
            )}
            <Description>경력 사항(회사명, 재직 기간)을 입력해주세요. [예: ㅇㅇ기업 (2023.02-2025.05)]</Description>
            <Wrap>
              <DetailInput
                type="text"
                value={careerInput}
                onChange={(e) => setCareerInput(e.target.value)}
                placeholder="회사명 (YYYY.MM ~ YYYY.MM)"
                disabled={!!career && !editing} // 이미 값이 있고 편집 중이 아니면 입력 불가
              />
              <Add
                type="button"
                onClick={handleAddCareer}
                disabled={!!career && !editing} // 이미 값이 있고 편집 중이 아니면 버튼 클릭 불가
              >
                {editing ? "완료" : "추가"}
              </Add>
            </Wrap>
          </DetailBox>
        )}

        <BtnDiv>
          <Btn onClick={goPrev}>← 이전</Btn>
          <Btn onClick={handleNext}>다음 →</Btn>
        </BtnDiv>
      </PositionWrap>
    </Content>
  );
}

export default Create2;
