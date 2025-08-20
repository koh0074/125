import { useState } from "react";
import styled from "styled-components";
import deleteimg from "../../img/resume/x.png";
import CustomProgressBar from "../../components/resume/CustomProgressBar";

const Content = styled.div`
  height: 1600px;
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

const Label = styled.p`
  font-weight: bold;
  color: #b1b5c3;
  width: 120px;
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
  width: 1055px;
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

const Wrap2 = styled(Wrap)`
  // 희망 근무 조건 소제목과 내용 margin 주기 위해 추가
  margin-top: 15px;
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
  right: 50px;

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

const Add = styled.button`
  /*버튼 디자인*/
  width: 64px;
  height: 60px;
  border-radius: 30px;
  background: #5ec27d;
  border: none;
  color: #fff;
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

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

const AddElementDiv = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;
`;

const AddElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* 요소 간 간격 */

  padding: 10px;
  font-size: 18px;
  color: #fff;
  background-color: #fead5c;
  border-radius: 12px;
  width: fit-content; /* ✅ 텍스트 길이에 맞춰 유동적으로 */
  height: 28px;

  &:hover {
    background-color: #ffbf7f; /* 기존 색보다 연한 주황색 */
    cursor: pointer;
  }
`;

const AddText = styled.p``;

const Delete = styled.img`
  width: 11px;
  height: 11px;
`;

const DaySelectContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  margin-left: 134px;
`;

const DayButton = styled.button`
  width: 47px;
  height: 60px;
  margin: 4px;
  font-size: 18px;
  border-radius: 30px;
  border: 1px solid #fead5c;
  box-shadow: ${({ selected }) => (selected ? "inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);" : "none")};
  background-color: ${({ selected }) => (selected ? "#FEAD5C" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#FEAD5C")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  transition: background-color 0.2s ease;

  &:hover {
    box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
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

const days = ["월", "화", "수", "목", "금", "토", "일"];

function Create3({
  selectedDays,
  setSelectedDays,
  region,
  setRegion,
  occupation,
  setOccupation,
  isEditing,
  setIsEditing,
  period,
  setPeriod,
  day,
  setDay,
  time,
  setTime,
  onNext,
  goPrev,
}) {
  const [inputText, setInputText] = useState("");

  // 요일 선택 토글
  const toggleDay = (dayOption) => {
    setSelectedDays((prev) => {
      const exists = prev.find((d) => d.day === dayOption);
      if (exists) {
        // 이미 있으면 제거
        return prev.filter((d) => d.day !== dayOption);
      } else {
        // 없으면 추가
        return [...prev, { day: dayOption }];
      }
    });
  };

  const handleNext = () => {
    if (region == "") {
      alert("희망 근무 지역을 추가해주세요.");
      return;
    }

    if (occupation == "") {
      alert("희망 업직종을 추가해주세요.");
      return;
    }

    // 유효성 검사 통과 시 다음 단계로 이동
    if (onNext) {
      onNext();
    }
  };

  // 이하 JSX는 기존 코드 유지, props로 받아온 상태 및 set함수 사용
  return (
    <>
      <Content>
        <PositionWrap>
          <Title>이력서 작성</Title>
          <CustomProgressBar currentPage={3} />

          {/* 희망 근무 지역 */}
          <Box>
            <Subtitle>
              희망 근무 지역 <Essential>*</Essential>
            </Subtitle>
            <Description>원하는 근무 지역을 선택해주세요.</Description>
            <Wrap>
              <Input type="text" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="예: 서울시 도봉구" />
            </Wrap>
          </Box>

          {/* 희망 근무 업직종 */}
          <Box>
            <Subtitle>
              희망 근무 업직종 <Essential>*</Essential>
            </Subtitle>
            <Description>원하는 직종을 선택해주세요.</Description>
            <Wrap>
              <Select value={occupation} onChange={(e) => setOccupation(e.target.value)}>
                <option value="" disabled hidden>
                  선택
                </option>
                <option value="직무 전체">직무 전체</option>
                <option value="기획·경영">기획·경영</option>
                <option value="마케팅·영업">마케팅·영업</option>
                <option value="회계·인사·지원">회계·인사·지원</option>
                <option value="IT·데이터">IT·데이터</option>
                <option value="디자인·콘텐츠">디자인·콘텐츠</option>
                <option value="생산·물류">생산·물류</option>
                <option value="교육·의료·연구">교육·의료·연구</option>
                <option value="공공·금융">공공·금융</option>
              </Select>
            </Wrap>
          </Box>

          {/* 희망 근무 형태 */}
          <Box>
            <Subtitle>희망 근무 조건</Subtitle>
            <Edit type="button" onClick={() => setIsEditing(!isEditing)} disabled={day === "요일 선택" && isEditing && selectedDays.length === 0}>
              {isEditing ? "완료" : "수정"}
            </Edit>

            <Wrap2>
              <Label>근무기간</Label>
              <HalfSelect value={period} onChange={(e) => setPeriod(e.target.value)} disabled={!isEditing}>
                <option value="무관">무관</option>
                <option value="하루">하루</option>
                <option value="1주 이하">1주 이하</option>
                <option value="1주 ~ 1개월">1주 - 1개월</option>
                <option value="1개월 ~ 3개월">1개월 - 3개월</option>
                <option value="3개월 ~ 6개월">3개월 - 6개월</option>
                <option value="6개월 ~ 1년">6개월 - 1년</option>
              </HalfSelect>
            </Wrap2>
            <Wrap>
              <Wrap>
                <Label>근무요일</Label>
                <HalfSelect value={day} onChange={(e) => setDay(e.target.value)} disabled={!isEditing}>
                  <option value="무관">무관</option>
                  <option value="주말">주말</option>
                  <option value="주중">주중</option>
                  <option value="요일">요일 선택</option>
                </HalfSelect>
              </Wrap>

              <Wrap>
                <Label>근무시간</Label>
                <HalfSelect value={time} onChange={(e) => setTime(e.target.value)} disabled={!isEditing}>
                  <option value="무관">무관</option>
                  <option value="오전">오전 (6-12)</option>
                  <option value="오후">오후 (12-18)</option>
                  <option value="저녁">저녁 (18-0)</option>
                  <option value="새벽">새벽 (0-6)</option>
                  <option value="풀타임">풀타임 (8시간 이상)</option>
                </HalfSelect>
              </Wrap>
            </Wrap>

            {day === "요일" && (
              <DaySelectContainer>
                {days.map((dayOption) => {
                  const isSelected = selectedDays.some((d) => d.day === dayOption);
                  return (
                    <DayButton key={dayOption} onClick={() => isEditing && toggleDay(dayOption)} selected={isSelected} disabled={!isEditing}>
                      {dayOption}
                    </DayButton>
                  );
                })}
              </DaySelectContainer>
            )}
          </Box>
          <BtnDiv>
            {/* 이전 */}
            <Btn onClick={goPrev}>← 이전</Btn>
            {/* 다음 */}
            <Btn onClick={handleNext} disabled={isEditing}>
              다음 →
            </Btn>
          </BtnDiv>
        </PositionWrap>
      </Content>
    </>
  );
}

export default Create3;
