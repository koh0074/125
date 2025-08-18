import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance'; 

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #000;
  padding: 20px 0;
  cursor: pointer;
  gap: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CompanyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 20px;
  margin: 0;
`;

const Info = styled.div`
  font-size: 14px;
  color: #555;
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 20px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ApplyButton = styled.button`
  background-color: #65bc7b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const DeadlineInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Dday = styled.span`
  color: orange;
  font-weight: bold;
  font-size: 14px;
`;

const DeadlineDate = styled.span`
  color: #888;
  font-size: 14px;
`;

/* -------------------- 날짜 유틸 -------------------- */
// DB가 'YYYY-MM-DD HH:mm:ss' 로 주는 경우도 처리
const parseDate = (raw) => {
  if (!raw) return null;
  if (raw instanceof Date) return isNaN(raw) ? null : raw;
  if (typeof raw === 'number') {
    const d = new Date(raw);
    return isNaN(d) ? null : d;
  }
  if (typeof raw === 'string') {
    // 공백을 T로 바꿔 Safari/브라우저 호환
    const s = raw.includes(' ') ? raw.replace(' ', 'T') : raw;
    const d1 = new Date(s);
    if (!isNaN(d1)) return d1;
    // 날짜만 온 경우 보정
    const d2 = new Date(`${raw}T00:00:00`);
    return isNaN(d2) ? null : d2;
  }
  return null;
};

const calcDday = (dateObj) => {
  if (!dateObj) return '-';
  const today = new Date();
  // 시차 이슈를 줄이기 위해 00:00기준 계산
  const a = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const b = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  const diff = Math.ceil((b - a) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? `D-${diff}` : '마감';
};

const formatDate = (dateObj) => {
  if (!dateObj) return '';
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const weekday = ['일','월','화','수','목','금','토'][dateObj.getDay()];
  return `${mm}/${dd}(${weekday})`;
};
/* -------------------------------------------------- */

export default function RecruitCard({ post }) {
  const navigate = useNavigate();
  const [deadline, setDeadline] = useState(post?.deadline ?? null); 
  const [createdAt, setCreatedAt] = useState(post?.created_at ?? null); // 추가: fallback

  const handleClick = () => navigate(`/recruit/${post.job_post_id}`);

  // [추가] deadline이 없으면 상세 API로 보충 조회
  useEffect(() => {
    let ignore = false;
    async function fetchDetail() {
      try {
        if (deadline) return;
        const res = await axios.get(`/api/jobPosts/${post.job_post_id}`);
        if (ignore) return;
        // 응답에서 deadline/created_at 보충
        setDeadline(res.data?.deadline ?? null);
        setCreatedAt(res.data?.created_at ?? createdAt);
      } catch (e) {
        // 상세 실패해도 화면은 계속 동작
        // console.debug('job post detail fetch failed', e);
      }
    }
    fetchDetail();
    return () => { ignore = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.job_post_id, deadline]);

  // 최종 표시용 날짜 결정(1순위 deadline, 2순위 created_at)
  const dateObj = parseDate(deadline) || parseDate(createdAt);

  return (
    <Card onClick={handleClick}>
      <LeftSection>
        <CompanyRow>
          <span>{post.company || '회사명 없음'}</span>
        </CompanyRow>
      </LeftSection>

      <CenterSection>
        <Title>{post.title}</Title>
        <Info>{post.job_field} | {post.location_city}</Info>
      </CenterSection>

      <RightSection>
        <ApplyButton>홈페이지 지원</ApplyButton>
        <DeadlineInfo>
          <Dday>{calcDday(dateObj)}</Dday>
          <DeadlineDate>{dateObj ? `~ ${formatDate(dateObj)}` : ''}</DeadlineDate>
        </DeadlineInfo>
      </RightSection>
    </Card>
  );
}
