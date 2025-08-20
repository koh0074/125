import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  HiUser,
  HiDocumentText,
  HiBookmark,
  HiLockClosed
} from "react-icons/hi";

const Sidebar = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 5px;
  padding: 12px;
  border-radius: 8px;
  color: #666;
  text-decoration: none;
  transition: all 0.2s ease;

  &.active {
    font-weight: 600;
    color: #000000ff;
    background-color: #f2f6ff;
  }

  &:hover {
    background-color: #f9f9f9;
  }

  svg {
    margin-right: 12px;
    font-size: 18px;
  }

  &.active svg {
    color: #000000ff;
  }
`;

function MyPageSidebar() {
  return (
    <Sidebar>
      <MenuItem to="/mypage/profile"><HiUser />프로필</MenuItem>
      <MenuItem to="/mypage/applies"><HiDocumentText />지원 현황</MenuItem>
      <MenuItem to="/mypage/scraps"><HiBookmark />스크랩한 게시물</MenuItem>
      <MenuItem to="/mypage/account"><HiLockClosed />계정 관리</MenuItem>
    </Sidebar>
  );
}

export default MyPageSidebar;
