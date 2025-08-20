import React from "react";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResumeList from "./pages/resume/ResumeList";
import ResumeCreate from "./pages/resume/ResumeCreate";
import Example from "./pages/resume/Example";
import Detail from "./pages/resume/Detail";
import Edit from "./pages/resume/Edit";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/Mainpage";
import GlobalStyle from "./Globalstyle";
import RecruitListPage from "./pages/recruit/RecruitListPage";
import RecruitDetailPage from "./pages/recruit/RecruitDetailPage";
import DigitalEducation from "./pages/infoboard/DigitalEducation";
import EmploymentTrend from "./pages/infoboard/EmploymentTrend";
import SeniorJobRecommend from "./pages/infoboard/SeniorJobRecommend";
import EmploymentTrendDetail from "./pages/infoboard/EmploymentTrendDetail";
import SeniorJobDetail from "./pages/infoboard/SeniorJobDetail";
import CommunityList from "./pages/community/CommunityList";
import CommunityDetail from "./pages/community/CommunityDetail";
import CommunityWrite from "./pages/community/CommunityWrite";
import CommunityEdit from "./pages/community/CommunityEdit";
import MyPageLayout from "./components/mypage/MyPageLayout";
import MyProfile from "./pages/mypage/MyProfile";
import MyApplyHistory from "./pages/mypage/MyApplyHistory";
import MyScrapPost from "./pages/mypage/MyScrapPost";
import ChangePassword from "./pages/mypage/ChangePassword";
import AccountManagement from "./pages/mypage/AccountManagement";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* 이력서 */}
        <Route path="/resumes" element={<ResumeList />} />
        <Route path="/resumes/create" element={<ResumeCreate />} />
        <Route path="/resumes/:id" element={<Detail />} />
        <Route path="/resumes/edit/:id" element={<Edit />} />

        {/* 유저 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 구인/구직 */}
        <Route path="/recruit" element={<RecruitListPage />} />
        <Route path="/recruit/:id" element={<RecruitDetailPage />} />

        {/* 커뮤니티 */}
        <Route path="/community" element={<CommunityList />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/community/:id/edit" element={<CommunityEdit />} />

        {/* 정보게시판 */}
        <Route path="/infoboard/edu" element={<DigitalEducation />} />
        <Route path="/infoboard/trend" element={<EmploymentTrend />} />
        <Route path="/infoboard/trend/:id" element={<EmploymentTrendDetail />} />
        <Route path="/infoboard/recommend" element={<SeniorJobRecommend />} />
        <Route path="/infoboard/recommend/:id" element={<SeniorJobDetail />} />

        {/* 마이페이지 */}
        <Route path="/mypage/*" element={<MyPageLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="applies" element={<MyApplyHistory />} />
          <Route path="scraps" element={<MyScrapPost />} />
          <Route path="account" element={<AccountManagement />} />
          <Route path="password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
