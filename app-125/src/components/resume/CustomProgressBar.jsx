import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import styled from "styled-components";

/* 
  프로그래스바 실행을 위해 라이브러리 설치해주세요.
  npm install react-step-progress-bar
*/

const Wrapper = styled.div`
  margin: 70px auto;
  width: 737px;
  margin-bottom: 100px;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Dot = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  top: 18px;
  border-radius: 50%;
  background-color: ${({ active, accomplished }) =>
    active ? "#5ec27d" : accomplished ? "#5ec27d" : "#fff"};
  border: ${({ active }) => (active ? "none" : "2px solid #5ec27d")};
  box-sizing: border-box;
  margin-bottom: 6px;
`;

const Label = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #888;
  white-space: nowrap;
  text-align: center;
`;

const stepLabels = [
  "제목 / 회원정보",
  "학력 / 경력",
  "근무",
  "자격증 / 어학",
  "자기소개",
];

// 현재 페이지는 1~5로 전달받는다고 가정
function CustomProgressBar({ currentPage }) {
  const percent = ((currentPage - 1) / (stepLabels.length - 1)) * 100;

  return (
    <Wrapper>
      <ProgressBar
        percent={percent}
        filledBackground="#5ec27d"
        unfilledBackground="#ccc"
        height={2} // ⭐️ 선 두께 설정
      >
        {stepLabels.map((label, index) => (
          <Step key={index}>
            {({ accomplished }) => (
              <StepWrapper>
                <Dot
                  active={currentPage === index + 1}
                  accomplished={accomplished}
                />
                <Label>{label}</Label>
              </StepWrapper>
            )}
          </Step>
        ))}
      </ProgressBar>
    </Wrapper>
  );
}

export default CustomProgressBar;
