import React, { useState } from "react";
import Create1 from "./Create1";
import Create2 from "./Create2";
import Create3 from "./Create3";
import Create4 from "./Create4";
import Create5 from "./Create5";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function ResumeForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Create1 상태
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Create1 회원 정보 자동 입력
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:3002/api/user/info-for-resume", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("서버 응답 실패");

        const data = await res.json();

        setName(data.name || "");
        setAge(data.age?.toString() || "");
        setGender(data.gender || "");
        setAddress(data.address || "");
        setTel(data.phone || "");

        if (data.email) {
          const [localPart, domain] = data.email.split("@");
          setEmail1(localPart || "");
          setEmail2(domain || "");
        }
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };

    fetchUserInfo();
  }, []);

  // Create2 상태
  const [school, setSchool] = useState("");
  const [status, setStatus] = useState("");
  const [careerStatus, setCareerStatus] = useState("");
  const [career, setCareer] = useState("");
  const [careersPeriod, setCareersPeriod] = useState("");

  // Create3 상태
  const [region, setRegion] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isEditing2, setIsEditing2] = useState(false);
  const [period, setPeriod] = useState("무관");
  const [day, setDay] = useState("무관");
  const [time, setTime] = useState("무관");
  const [selectedDays, setSelectedDays] = useState([]);

  // Create4 상태
  const [certificateStatus, setCertificateStatus] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [languageStatus, setLanguageStatus] = useState(false);
  const [languages, setLanguages] = useState([]);

  // Create5 상태
  const [selfIntro, setSelfIntro] = useState("");

  const goNextStep = () => setStep((prev) => prev + 1);
  const goPrevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (selfIntro.trim() === "") {
      alert("자기소개는 필수 입력 항목입니다.");
      return;
    }

    const token = localStorage.getItem("token");

    const resumeData = {
      resume_title: title,
      school,
      enrollment_status: status,
      career_type: careerStatus,
      company_name: career,
      work_period_text: careersPeriod,
      desired_location: region,
      desired_job_category: occupation,
      desired_work_duration: period,
      preferred_day_type: day,
      preferred_time: time,
      has_certificate: certificateStatus,
      has_language_score: languageStatus,
      self_introduction: selfIntro,
      certificates: certificates.map((c) => {
        const year = Number(c.acquisition_year);
        return {
          certificate_name: c.certificate_name || "",
          acquisition_year: year >= 1901 && year <= 2155 ? year : null,
        };
      }),
      languageScores: languages.map((l) => ({
        test_name: l.test_name,
        score: l.score,
        acquisition_year: Number(l.acquisition_year),
      })),
      preferredDays: selectedDays.map((d) => ({ day: d.day })),
      memberInfo: {
        username: name,
        age,
        phone_number: tel,
        gender,
        address,
      },
    };

    try {
      const res = await fetch("http://127.0.0.1:3002/api/resumes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resumeData),
      });

      if (!res.ok) throw new Error("이력서 등록 실패");

      const data = await res.json();
      console.log("이력서 등록 성공:");
      alert("이력서가 등록되었습니다!");
      navigate(`/resumes`); // 이력서 목록 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("이력서 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Header />
      {step === 1 && (
        <Create1
          title={title}
          setTitle={setTitle}
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          address={address}
          setAddress={setAddress}
          tel={tel}
          setTel={setTel}
          email1={email1}
          setEmail1={setEmail1}
          email2={email2}
          setEmail2={setEmail2}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onNext={() => {
            setIsEditing(false);
            goNextStep();
          }}
        />
      )}

      {step === 2 && (
        <>
          <Create2
            school={school}
            setSchool={setSchool}
            status={status}
            setStatus={setStatus}
            careerStatus={careerStatus}
            setCareerStatus={setCareerStatus}
            career={career}
            setCareer={setCareer}
            careersPeriod={careersPeriod}
            setCareersPeriod={setCareersPeriod}
            onNext={goNextStep}
            goPrev={goPrevStep}
          />
        </>
      )}

      {step === 3 && (
        <>
          <Create3
            region={region}
            setRegion={setRegion}
            occupation={occupation}
            setOccupation={setOccupation}
            isEditing={isEditing2}
            setIsEditing={setIsEditing2}
            period={period}
            setPeriod={setPeriod}
            day={day}
            setDay={setDay}
            time={time}
            setTime={setTime}
            onNext={goNextStep}
            goPrev={goPrevStep}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        </>
      )}

      {step === 4 && (
        <>
          <Create4
            certificateStatus={certificateStatus}
            setCertificateStatus={setCertificateStatus}
            certificates={certificates}
            setCertificates={setCertificates}
            languageStatus={languageStatus}
            setLanguageStatus={setLanguageStatus}
            languages={languages}
            setLanguages={setLanguages}
            onNext={goNextStep}
            goPrev={goPrevStep}
          />
        </>
      )}

      {step === 5 && (
        <>
          <Create5 selfIntro={selfIntro} setSelfIntro={setSelfIntro} onSubmit={handleSubmit} goPrev={goPrevStep} />
        </>
      )}
    </>
  );
}

export default ResumeForm;
