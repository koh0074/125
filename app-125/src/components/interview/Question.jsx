import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

/*
라이브러리 설치해주세요!
npm install framer-motion

부모 컴포넌트 호출 예시

<Question question={sampleQuestion} answer={sampleAnswer} />
*/

const Content = styled.div`
  margin-bottom: 30px;
`;

const Qdiv = styled.div`
  width: 1177px;
  border: none;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Qtext = styled.p`
  width: 950px;

  /*폰트*/
  color: black;
  font-size: 18px;
`;

const Qbutton = styled.button`
  /*버튼 디자인*/
  width: 171px;
  height: 60px;
  border: none;
  background-color: #5ec27d;
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
    background-color: #81d29d;
    cursor: pointer;
`;

const Adiv = styled(Qdiv)`
  height: 100px;
  border: 1px solid #bdbdbd;
  background-color: #ffffff00;
  box-shadow: none;
  padding: 54.5px 25px;
`;

const Atext = styled(Qtext)`
  width: 1171px;
`;

function Question({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false); // 초기 false

  const toggleAnswer = () => setShowAnswer((prev) => !prev);

  return (
    <>
      <Content>
        <Qdiv>
          <Qtext>{question}</Qtext>
          <Qbutton onClick={toggleAnswer}>{showAnswer ? "모범 답안 숨기기" : "모범 답안 확인하기"}</Qbutton>
        </Qdiv>

        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <Adiv>
                <Atext>{answer}</Atext>
              </Adiv>
            </motion.div>
          )}
        </AnimatePresence>
      </Content>
    </>
  );
}

export default Question;
