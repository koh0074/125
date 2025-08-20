import styled from "styled-components";
import strengthIcon from "../../img/interview/Strength.png";
import weaknessIcon from "../../img/interview/Weakness.png";

/*
부모 컴포넌트 호출 예시
<Recommend
  type="Strength"
  title="계획 굿"
  content="어쩌구저쩌구"
/>

<Recommend
  type="Weakness"
  title="계획 부족"
  content="계획 없이 진행하다 보니 종종 일정에 차질이 생깁니다."
  solution="최근에는 캘린더 앱과 루틴을 설정하여 체계적으로 관리하고 있습니다."
/>
*/

const PositionWrap = styled.div `
  margin-bottom: 48px;
`;

const Title = styled.div`
  width: 1280px;
  border: none;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px 25px;
  display: flex;
  align-items: center;
`;

const Titletext = styled.p`
  width: 1000px;
  margin-left: 32px;
  color: black;
  font-weight: bold;
  font-size: 18px;
`;

const Content = styled.div`
  width: 1280px;
  background-color: #ffffff00;
  border-radius: 20px;
  border: 1px solid ${(props) => props.borderColor};
  padding: 33px 25px;
  margin-top: 18px;
`;

const Contenttext = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: black;
`;

function Recommend({ type, title, content, solution }) {
  const isWeakness = type === "Weakness";

  const icon = type === "Strength" ? strengthIcon : weaknessIcon;
  const titleText = title || (type === "Strength" ? "강점" : "약점");

  return (
    <>
    <PositionWrap>
      <Title>
        <img src={icon} alt={`${type} 아이콘`} />
        <Titletext>{titleText}</Titletext>
      </Title>

      {/* Strength 혹은 Weakness 첫번째 content */}
      <Content borderColor={type === "Strength" ? "#5EC27D" : "#FEAD5C"}>
        <Contenttext>{content}</Contenttext>
      </Content>

      {/* Weakness일 경우 해결책 content 추가로 출력 */}
      {isWeakness && (
        <Content borderColor="#2D66D0">
          <Contenttext>{solution}</Contenttext>
        </Content>
      )}
      </PositionWrap>
    </>
  );
}

export default Recommend;
