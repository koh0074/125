import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import axios from '../../api/axiosInstance';
import RecruitCard from '../../components/recruit/RecruitCard';
import RecruitFilter from '../../components/recruit/RecruitFilter';

const PageWrapper = styled.div`
  padding-top: 200px;
  padding-bottom: 80px;
  max-width: 1178px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 10px 0 12px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const Sub = styled.span`
  color: #666;
  font-size: 14px;
`;

const Empty = styled.div`
  padding: 24px 0;
  color: #888;
`;

export default function RecruitListPage() {
  const [allPosts, setAllPosts] = useState([]);     
  const [posts, setPosts] = useState([]);           
  const [jobField, setJobField] = useState(null);   
  const [loading, setLoading] = useState(false);


  const applyFilter = (data, field) => {
    if (!field) return data;
    return (data || []).filter((p) => (p?.job_field || '') === field);
  };


  const fetchJobPosts = async (field) => {
    setLoading(true);
    try {
      const params = {};
      if (field) {
        params.job_field = field;   // snakeCase
        params.jobField = field;    // camelCase (혹시 백엔드에서 이 키를 쓰는 경우 대비)
      }
      console.log('[GET] /api/jobPosts', params);
      const res = await axios.get('/api/jobPosts', { params });
      const data = Array.isArray(res.data) ? res.data : [];
      setAllPosts(data);                      // 원본 저장
      setPosts(applyFilter(data, field));     // 화면 데이터 저장
    } catch (e) {
      console.error('채용 공고 불러오기 실패:', e);
      setAllPosts([]);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    setPosts(applyFilter(allPosts, jobField));
    fetchJobPosts(jobField);

  }, [jobField]);


  useEffect(() => {
    fetchJobPosts(null);

  }, []);

  return (
    <>
      <Header />
      <PageWrapper>
        <TitleRow>
          <Title>채용 정보</Title>
          <Sub>{jobField ? `선택: ${jobField}` : '전체'} · {posts.length}건</Sub>
        </TitleRow>

        {/* 제어 컴포넌트: value=null|ENUM, onChange=setJobField */}
        <RecruitFilter value={jobField} onChange={setJobField} />

        {loading && <Empty>불러오는 중…</Empty>}
        {!loading && posts.length === 0 && <Empty>조건에 맞는 채용 공고가 없습니다.</Empty>}

        {!loading && posts.map((post) => (
          <RecruitCard key={post.job_post_id} post={post} />
        ))}
      </PageWrapper>
    </>
  );
}
