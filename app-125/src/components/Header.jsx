// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import searchicon from "../img/Search.png";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  width: 100vw;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  z-index: 999;
`;

const Top = styled.div`
  width: 1178px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const AppLogo = styled.img`
  width: 180px;
  margin-bottom: 12px;
  cursor: pointer;
`;

const SearchBox = styled.form`
  width: 370px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #3478f6;
  padding-right: 10px;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 340px;
  border: none;
  padding-left: 21px;
  font-size: 15px;
  font-weight: bold;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`;

const SearchBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBtnImg = styled.img`
  width: 30px;
  height: 30px;
`;

const Navigation = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border-top: 1px solid #3478f6;
  border-bottom: 1px solid #3478f6;
  font-size: 20px;
  font-weight: bold;
  color: #2d66d0;
  position: relative;
`;

const Category = styled.li`
  width: 190px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  color: ${({ $active }) => ($active ? "white" : "#2d66d0")};
  background-color: ${({ $active }) => ($active ? "#2d66d0" : "transparent")};

  &:hover {
    color: white;
    background-color: #2d66d0;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 50px; /* 카테고리 높이 */
  left: 0;
  width: 100%;
  background: #2d66d0;
  border-bottom: 1px solid #2d66d0;
  z-index: 5;
  pointer-events: none;

  height: ${({ open }) => (open ? "180px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: height 0.22s ease, opacity 0.18s ease;
`;

const SubMenu = styled.div`
  position: absolute;
  top: 50px;
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  color: #fff;
  background: transparent;
  z-index: 6;
  overflow: hidden;

  max-height: ${({ open }) => (open ? "220px" : "0")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: max-height 0.22s ease, opacity 0.18s ease;
`;

const SubList = styled.ul`
  list-style: none;
  padding: 10px 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const SubItem = styled.li`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
  }
`;

function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(null); // 'infoboard'
  const [submenuLeft, setSubmenuLeft] = useState(0);
  const [submenuWidth, setSubmenuWidth] = useState(190);

  const navRef = useRef(null);
  const infoRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3002/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert("로그아웃 되었습니다.");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
      } else {
        alert("로그아웃 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      alert("로그아웃 중 오류가 발생했습니다.");
      console.error(e);
    }
  };

  const goToList = () => {
    const isLoggedIn = !!localStorage.getItem("token"); // 토큰이 있는지 확인 예시
    if (isLoggedIn) {
      navigate(`/resumes`);
    } else {
      alert("로그인 후 이용 가능합니다.");
      navigate(`/login`); // 로그인 페이지로 이동
    }
  };

  const goToMypage = () => {
    const isLoggedIn = !!localStorage.getItem("token"); // 토큰이 있는지 확인 예시
    if (isLoggedIn) {
      navigate(`/mypage`);
    } else {
      alert("로그인 후 이용 가능합니다.");
      navigate(`/login`); // 로그인 페이지로 이동
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) return;
    navigate(`/community?search=${encodeURIComponent(searchKeyword.trim())}`);
    setSearchKeyword("");
  };

  const openInfo = () => {
    if (!navRef.current || !infoRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const tabRect = infoRef.current.getBoundingClientRect();
    setSubmenuLeft(tabRect.left - navRect.left);
    setSubmenuWidth(tabRect.width);
    setActiveKey("infoboard");
    setOpen(true);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      setActiveKey(null);
    }, 140);
  };

  const isInfoOpen = open && activeKey === "infoboard";

  return (
    <Container onMouseLeave={scheduleClose}>
      <Top>
        <AppLogo src={logo} onClick={() => navigate("/")} />
        <SearchBox onSubmit={handleSearch}>
          <SearchInput type="text" placeholder="검색어를 입력하세요" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          <SearchBtn type="submit">
            <SearchBtnImg src={searchicon} alt="검색" />
          </SearchBtn>
        </SearchBox>
      </Top>
      <Navigation ref={navRef}>
        <Category onClick={() => navigate("/recruit")}>구인 / 구직</Category>
        <Category onClick={goToList}>이력서</Category>
        <Category onClick={() => navigate("/community")}>커뮤니티</Category>

        <Category ref={infoRef} $active={isInfoOpen} onMouseEnter={openInfo} onClick={() => navigate("/infoboard/trend")}>
          정보게시판
        </Category>

        <Category onClick={goToMypage}>마이페이지</Category>

        {isLoggedIn ? (
          <Category onClick={handleLogout} style={{ cursor: "pointer" }}>
            로그아웃
          </Category>
        ) : (
          <Category onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
            로그인
          </Category>
        )}

        {/* 가로 전체 파란 백드롭 */}
        <Backdrop open={isInfoOpen} />

        {/* 탭 폭만큼의 세로 드롭다운 항목 */}
        <SubMenu open={isInfoOpen} left={submenuLeft} width={submenuWidth} onMouseEnter={openInfo} onMouseLeave={scheduleClose}>
          <SubList>
            <SubItem onClick={() => navigate("/infoboard/trend")}>취업 트렌드</SubItem>
            <SubItem onClick={() => navigate("/infoboard/edu")}>디지털 교육</SubItem>
            <SubItem onClick={() => navigate("/infoboard/recommend")}>중장년 직무추천</SubItem>
          </SubList>
        </SubMenu>
      </Navigation>
    </Container>
  );
}

export default Header;
