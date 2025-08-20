import thumb1 from "../img/thumb1.png";
import thumb2 from "../img/thumb2.png";

const communityPosts = [
  {
    id: 1,
    title: "졸업 영화",
    preview: "졸업작품 영상에 대해 궁금하신 분들을 위해 정보를 나눠요.",
    content: "졸업작품은 영상 형식으로 제작됩니다. 편집툴은 프리미어나 다빈치리졸브를 추천드립니다. 조별로 주제를 정해 발표하게 되며, 실습 영상도 제출하게 됩니다.",
    views: 1204,
    comments: 4,
    likes: 10,
    thumbnail: thumb1 ,
    date: "2025-06-10",
    replies: [
      { author: "주황냥꾼", text: "저도 관심있어요! 나중에 링크 공유도 부탁드려요~" },
      { author: "해니", text: "졸업작품에 대해선 교수님께 먼저 문의해보세요. 그리고 주제발표보단 진짜 제작!" }
    ]
  },
  {
    id: 2,
    title: "그만둬야 할지 고민입니다..",
    preview: "회사 생활이 힘들어졌어요. 같은 고민 있으신 분 계신가요?",
    content: "요즘 출근이 너무 힘들어요. 업무량도 많고 상사와의 소통도 어렵네요. 같은 고민을 겪고 계신 분들의 이야기가 듣고 싶습니다.",
    views: 896,
    comments: 8,
    likes: 21,
    thumbnail: null,
    date: "2025-06-11",
    replies: [
      { author: "익명1", text: "저도 같은 고민하고 있어요. 힘내세요!" },
      { author: "익명2", text: "적절한 시기에 휴직도 고려해보세요." }
    ]
  },
  {
    id: 3,
    title: "합격했습니다!",
    preview: "취준생분들 힘내세요! 면접 팁 공유드려요.",
    content: "드디어 합격했습니다! 면접에서 받은 질문은 주로 협업 경험과 문제 해결 능력 위주였어요. 준비하시는 분들께 작은 도움이 되길 바라요.",
    views: 501,
    comments: 1,
    likes: 9,
    thumbnail: thumb2,
    date: "2025-06-12",
    replies: [
      { author: "취준러", text: "축하드려요! 면접 팁 정말 감사합니다." }
    ]
  }
];

export default communityPosts;
