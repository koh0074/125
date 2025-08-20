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

const Label = styled.p`
  font-weight: bold;
  color: #b1b5c3;
  width: 120px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const CertificateDetail = styled.div`
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

const LanguageDetail = styled(CertificateDetail)``;

const Input = styled.input`
  padding-left: 10px;
  width: 900px;
  height: 48px;
  border: 2px solid #d9d9d9;
  color: #777e90;
  font-size: 18px;
  border-radius: 12px;
  background-color: #fff0;
`;

const Input2 = styled(Input)`
  width: 410px;
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
  gap: 0;
  margin-bottom: 8px;
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
  box-shadow: inset 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 50px;
  right: 50px;

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

function Create4({
  certificateStatus,
  setCertificateStatus,
  certificates,
  setCertificates,
  languageStatus,
  setLanguageStatus,
  languages,
  setLanguages,
  onNext,
  goPrev,
}) {
  const [certificateName, setCertificateName] = React.useState("");
  const [certificateYear, setCertificateYear] = React.useState("");
  const [languageTest, setLanguageTest] = React.useState("");
  const [languageScore, setLanguageScore] = React.useState("");
  const [languageYear, setLanguageYear] = React.useState("");
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editingSection, setEditingSection] = React.useState(null);

  const handleAddCertificate = () => {
    if (!certificateName.trim() || !certificateYear.trim()) {
      alert("자격증명과 취득년도를 모두 입력해주세요.");
      return;
    }

    const newCert = {
      certificate_name: certificateName.trim(),
      acquisition_year: certificateYear.trim(),
    };

    if (editingSection === "certificate" && editingIndex !== null) {
      // 수정 중이면 해당 인덱스만 교체
      setCertificates((prev) => prev.map((item, i) => (i === editingIndex ? newCert : item)));
    } else {
      // 새 항목 추가
      setCertificates((prev) => [...prev, newCert]);
    }

    setCertificateName("");
    setCertificateYear("");
    setEditingIndex(null);
    setEditingSection(null);
  };

  const handleEditCertificate = (index) => {
    const item = certificates[index];
    setCertificateName(item.certificate_name);
    setCertificateYear(item.acquisition_year);
    setEditingIndex(index);
    setEditingSection("certificate");
  };

  const handleDeleteCertificate = (index) => {
    const updated = certificates.filter((_, i) => i !== index);
    setCertificates(updated);
    if (editingSection === "certificate") {
      if (editingIndex === index) {
        setCertificateName("");
        setCertificateYear("");
        setEditingIndex(null);
        setEditingSection(null);
      } else if (editingIndex > index) {
        setEditingIndex(editingIndex - 1);
      }
    }
  };

  const handleAddLanguage = () => {
    if (!languageTest.trim() || !languageScore.trim() || !languageYear.trim()) {
      alert("공인시험, 점수/등급, 취득년도를 모두 입력해주세요.");
      return;
    }

    const newLang = {
      test_name: languageTest.trim(),
      score: languageScore.trim(),
      acquisition_year: languageYear.trim(),
    };

    if (editingSection === "language" && editingIndex !== null) {
      const updated = [...languages];
      updated[editingIndex] = newLang;
      setLanguages(updated);
    } else {
      setLanguages([...languages, newLang]);
    }
    setLanguageTest("");
    setLanguageScore("");
    setLanguageYear("");
    setEditingIndex(null);
    setEditingSection(null);
  };

  const handleEditLanguage = (index) => {
    const item = languages[index];
    setLanguageTest(item.test_name);
    setLanguageScore(item.score);
    setLanguageYear(item.acquisition_year);
    setEditingIndex(index);
    setEditingSection("language");
  };

  const handleDeleteLanguage = (index) => {
    const updated = languages.filter((_, i) => i !== index);
    setLanguages(updated);
    if (editingSection === "language") {
      if (editingIndex === index) {
        setLanguageTest("");
        setLanguageScore("");
        setLanguageYear("");
        setEditingIndex(null);
        setEditingSection(null);
      } else if (editingIndex > index) {
        setEditingIndex(editingIndex - 1);
      }
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Content>
      <PositionWrap>
        <Title>이력서 작성</Title>
        <CustomProgressBar currentPage={4} />

        {/* 자격증 정보 */}
        <Box>
          <Subtitle>자격증</Subtitle>
          <Description>자격증이 있나요?</Description>
          <Wrap>
            <InputDiv>
              <HalfSelect value={certificateStatus} onChange={(e) => setCertificateStatus(e.target.value === "true")}>
                <option value={false}>없음</option>
                <option value={true}>있음</option>
              </HalfSelect>
            </InputDiv>
          </Wrap>
        </Box>

        {certificateStatus && (
          <DetailBox>
            {certificates.map((item, index) => (
              <CertificateDetail key={index}>
                {`${item.certificate_name} (${item.acquisition_year})`}
                <Edit type="button" onClick={() => handleEditCertificate(index)}>
                  수정
                </Edit>
                <Delete type="button" onClick={() => handleDeleteCertificate(index)}>
                  삭제
                </Delete>
              </CertificateDetail>
            ))}

            {certificates.length > 0 && <Line />}

            <Description>자격증 정보를 입력해주세요.</Description>

            <Wrap>
              <Label>
                자격증명 <Essential>*</Essential>
              </Label>
              <Input type="text" value={certificateName} onChange={(e) => setCertificateName(e.target.value)} />
            </Wrap>

            <Wrap>
              <Label>
                취득년도 <Essential>*</Essential>
              </Label>
              <Input2 type="text" value={certificateYear} onChange={(e) => setCertificateYear(e.target.value)} />
            </Wrap>

            <Add type="button" onClick={handleAddCertificate}>
              {editingSection === "certificate" ? "완료" : "추가"}
            </Add>
          </DetailBox>
        )}

        {/* 어학 성적 */}
        <Box>
          <Subtitle>어학 성적</Subtitle>
          <Description>공인 어학성적이 있나요?</Description>
          <Wrap>
            <InputDiv>
              <HalfSelect value={languageStatus} onChange={(e) => setLanguageStatus(e.target.value === "true")}>
                <option value={false}>없음</option>
                <option value={true}>있음</option>
              </HalfSelect>
            </InputDiv>
          </Wrap>
        </Box>

        {languageStatus && (
          <DetailBox>
            {languages.map((item, index) => (
              <LanguageDetail key={index}>
                {`${item.test_name} (${item.score}, ${item.acquisition_year})`}
                <Edit type="button" onClick={() => handleEditLanguage(index)}>
                  수정
                </Edit>
                <Delete type="button" onClick={() => handleDeleteLanguage(index)}>
                  삭제
                </Delete>
              </LanguageDetail>
            ))}

            {languages.length > 0 && <Line />}

            <Description>어학 성적 정보를 입력해주세요.</Description>

            <Wrap>
              <Label>
                공인시험 <Essential>*</Essential>
              </Label>
              <Input type="text" value={languageTest} onChange={(e) => setLanguageTest(e.target.value)} />
            </Wrap>

            <Wrap>
              <Label>
                점수 / 등급 <Essential>*</Essential>
              </Label>
              <Input2 type="text" value={languageScore} onChange={(e) => setLanguageScore(e.target.value)} />
            </Wrap>

            <Wrap>
              <Label>
                취득년도 <Essential>*</Essential>
              </Label>
              <Input2 type="text" value={languageYear} onChange={(e) => setLanguageYear(e.target.value)} />
            </Wrap>

            <Add type="button" onClick={handleAddLanguage}>
              {editingSection === "language" ? "완료" : "추가"}
            </Add>
          </DetailBox>
        )}
        <BtnDiv>
          {/* 이전 */}
          <Btn onClick={goPrev}>← 이전</Btn>
          {/* 다음 */}
          <Btn onClick={handleNext}>다음 →</Btn>
        </BtnDiv>
      </PositionWrap>
    </Content>
  );
}

export default Create4;
