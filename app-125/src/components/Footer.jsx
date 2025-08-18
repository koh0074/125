import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #3e3e3e;
  color: #fff;
  font-size: 14px;
  padding: 20px;
`;

const FooterInner = styled.div`
  max-width: 1178px;
  margin: 0 auto;
  line-height: 1.6;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        솔브잇 - 125 일이요! <br />
        김가빈 | 고화현 | 정예나 | 박민주 | 강효정
      </FooterInner>
    </FooterWrapper>
  );
}

export default Footer;
