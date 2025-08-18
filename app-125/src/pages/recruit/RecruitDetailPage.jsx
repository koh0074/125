import styled from 'styled-components';
import Header from '../../components/Header';
import InterviewQuestionSection from '../../components/interview/InterviewQuestionSection';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



const Container = styled.div`
  max-width: 1178px;
  margin: 40px auto;
  border-top: 3px solid black;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const LeftSection = styled.div`
  padding: 32px;
`;

const Company = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

const JobTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin: 12px 0 24px 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 0 0 24px 0;
`;

const SectionWrapper = styled.div`
  display: flex;
  gap: 60px;
`;

const Section = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h3`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
`;

const Item = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 14px;
`;

const Label = styled.div`
  width: 60px;
  color: #999;
`;

const Value = styled.div`
  color: #222;
`;

const OuterWrapper = styled.div`
  padding-top: 114px;
`;

const InnerWrapper = styled.div`
  max-width: 1178px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const ButtonWrap = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const DetailButtonStyled = styled.button`
  background: #FEAD5C;
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 14px 28px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: opacity 0.2s;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    opacity: 0.9;
  }
`;

const WebsiteButtonStyled = styled(DetailButtonStyled)`
  background: #5EC27D;
`;

const RecruitDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3002/api/jobPosts/${id}`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!job) return <p>해당 채용 공고를 찾을 수 없습니다.</p>;

  return (
    <>
      <Header />
      <OuterWrapper>
        <InnerWrapper>
          <Title>채용 정보</Title>
          <Container>
            <LeftSection>
              <Company>{job.company}</Company>
              <JobTitle>{job.title}</JobTitle>
              <Divider />
              <SectionWrapper>
                <Section>
                  <SectionTitle>지원자격</SectionTitle>
                  <Item><Label>경력</Label><Value>{job.career}</Value></Item>
                  <Item><Label>학력</Label><Value>{job.education}</Value></Item>
                  <Item><Label>스킬</Label><Value>{job.skills}</Value></Item>
                  <Item><Label>우대</Label><Value>{job.preference}</Value></Item>
                  <Item><Label>분야</Label><Value>{job.job_field}</Value></Item>
                  <Item><Label>연령</Label><Value>{job.min_age}세~{job.max_age}세</Value></Item>
                </Section>

                <Section>
                  <SectionTitle>근무조건</SectionTitle>
                  <Item><Label>고용형태</Label><Value>{job.employment_type}</Value></Item>
                  <Item><Label>급여</Label><Value>{job.salary_info}</Value></Item>
                  <Item><Label>지역</Label><Value>{job.location_city}</Value></Item>
                  <Item><Label>시간</Label><Value>{job.work_hour}</Value></Item>
                </Section>
              </SectionWrapper>
            </LeftSection>
          </Container>

          <ButtonWrap>
            <DetailButtonStyled>상세요강 바로가기 →</DetailButtonStyled>
            <WebsiteButtonStyled>홈페이지 바로가기 →</WebsiteButtonStyled>
          </ButtonWrap>

          <InterviewQuestionSection />
        </InnerWrapper>
      </OuterWrapper>
    </>
  );
};

export default RecruitDetailPage;

