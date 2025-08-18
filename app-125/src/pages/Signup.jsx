import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Content = styled.div`
  height: 1000px;
  padding-top: 170px;
  background-color: #fdfcfc;

  display: flex;
  justify-content: center;
`;

const Form = styled.form``;

const Title = styled.h2`
  color: #000000;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 30px;
`;

const InputBundle = styled.div`
  width: 1177px;
  height: 350px;
  border: none;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px 45px;
  margin-top: 30px;
`;

const SubTitle = styled.h3`
  font-size: 21px;
  margin: 0;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const InputDiv = styled.div`
  /* 상자 외 */
  display: flex;
  margin-bottom: 15px;
`;

const InputDiv2 = styled(InputDiv)`
  margin: 0;
`;

const InputDiv3 = styled(InputDiv2)`
  /* 상자 내 */
  margin-bottom: 5px;
`;

const Label = styled.p`
  width: 120px;
  color: #b1b5c3;
  font-size: 18px;
`;

const Label2 = styled(Label)``;

const Label3 = styled(Label2)`
  width: 90px;
  margin-left: 50px;
`;

const Label4 = styled(Label3)`
  width: 60px;
`;

const Essential = styled.span`
  color: red;
`;

const Input = styled.input`
  width: 312px;
  height: 48px;
  border: 2px solid #e6e8ec;
  border-radius: 12px;
  font-size: 15px;
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  padding-left: 10px;
  width: 1270px;
  height: 48px;
  border: 2px solid #e6e8ec;
  font-size: 15px;
  border-radius: 12px;
`;

const HalfInput = styled(Input)`
  width: 250px;
`;

const HalfSelect = styled(Select)`
  width: 150px;
`;

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`;

const Button = styled.button`
  /*버튼 디자인*/
  width: 155px;
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
  }
`;

const Wrap = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(""); // yyyy-mm-dd 형식
  const [gender, setGender] = useState(""); // male / female
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const navigate = useNavigate();

  // api 연동
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 휴대폰 번호 형식 체크
    if (phone.length !== 11 || !/^\d{11}$/.test(phone)) {
      alert("휴대폰 번호를 11자리 숫자로 입력해주세요.");
      return;
    }

    // 11자리면 하이픈 추가
    const formattedPhone = phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

    if (
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !name.trim() ||
      !birthdate.trim() ||
      !gender.trim() ||
      !address.trim() ||
      !formattedPhone.trim() ||
      !email1.trim() ||
      !email2.trim()
    ) {
      alert("필수 입력 항목을 모두 작성해 주세요.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3002/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_id: username,
          password: password,
          confirmPassword: confirmPassword,
          email: `${email1}@${email2}`,
          username: name,
          phone_number: formattedPhone, // 변환된 번호 전송
          gender: gender,
          birthdate: birthdate,
          address: address,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "회원가입 실패");
      }
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (error) {
      alert(`회원가입 중 오류 발생: ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <Content>
        <Form onSubmit={handleSubmit}>
          <Title>회원가입</Title>
          <InputDiv>
            <Label>
              아이디<Essential color="red">*</Essential>
            </Label>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </InputDiv>
          <InputDiv>
            <Label>
              비밀번호<Essential color="red">*</Essential>
            </Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputDiv>
          <InputDiv>
            <Label>
              비밀번호 확인<Essential color="red">*</Essential>
            </Label>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </InputDiv>
          <InputBundle>
            <SubTitle>회원 정보</SubTitle>
            <InputDiv2>
              <InputDiv3>
                <Label2>
                  이름<Essential color="red">*</Essential>
                </Label2>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </InputDiv3>
              <InputDiv3>
                <Label3>
                  생년월일<Essential>*</Essential>
                </Label3>
                <HalfInput type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
              </InputDiv3>
              <InputDiv3>
                <Label4>
                  성별<Essential>*</Essential>
                </Label4>
                <HalfSelect value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="" disabled hidden>
                    선택
                  </option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </HalfSelect>
              </InputDiv3>
            </InputDiv2>
            <InputDiv3>
              <Label2>
                주소<Essential color="red">*</Essential>
              </Label2>
              <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </InputDiv3>
            <InputDiv2>
              <InputDiv3>
                <Label2>
                  휴대폰<Essential color="red">*</Essential>
                </Label2>
                <Input type="text" placeholder={"ex) 01011112222"} onChange={(e) => setPhone(e.target.value)} />
              </InputDiv3>
              <InputDiv3>
                <Label3>
                  이메일<Essential color="red">*</Essential>
                </Label3>
                <Wrap>
                  <HalfInput onChange={(e) => setEmail1(e.target.value)} />
                  <span>@</span>
                  <HalfSelect onChange={(e) => setEmail2(e.target.value)}>
                    <option value="" disabled hidden>
                      선택
                    </option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                  </HalfSelect>
                </Wrap>
              </InputDiv3>
            </InputDiv2>
            <InputDiv3>
              <Label2>경력 단절 기간</Label2>
              <Input type="text" />
            </InputDiv3>
          </InputBundle>
          <BtnDiv>
            <Button>회원가입</Button>
          </BtnDiv>
        </Form>
      </Content>
    </>
  );
}

export default Signup;
