import styled from "styled-components";
import MyPageSidebar from "./MyPageSidebar";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const Wrapper = styled.div`
  background-color: #fdfcfa;
  min-height: 100vh;
  padding-top: 200px; 
`;

const Container = styled.div`
  display: flex;
  max-width: 1178px;
  margin: 0 auto;
  padding-bottom: 80px;
`;


const SidebarWrapper = styled.div`
  width: 220px;
  heigth: 347px;
  margin-top: 50px;
  margin-right: 50px;
  flex-shrink: 0;              
`;

const ContentWrapper = styled.div`
  flex: 1;
`;



function MyPageLayout() {
  return (
    <Wrapper>
      <Header />
      <Container>
        <SidebarWrapper>
          <MyPageSidebar />
        </SidebarWrapper>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}

export default MyPageLayout;
