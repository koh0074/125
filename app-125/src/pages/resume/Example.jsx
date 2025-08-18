import styled from "styled-components";

const Content = styled.div`
    height: 1800px;
    padding-top: 130px;
    background-color: #FDF8F4;

    display: flex;
    justify-content: center;
`;

const PositionWrap = styled.div `
`;

const Title = styled.h2 `
    color: #000000;
    font-weight: bold;
    font-size: 24px;
    margin: 64px 0 20px 3px;
`;

const Description = styled.p `
    width: 1277px;
    height: 96px;
    display: flex;
    align-items: center;
    border: 1px solid #BDBDBD;
    border-radius: 20px;
    
    margin-bottom:20px;
    padding-left: 34px;

    font-size: 18px;
`;

const Table = styled.table `
    border: none;
    border-bottom: 1px solid #D0D0CE;
    text-align: left;
    margin-bottom: 10px;
`;

const TableSubtitle = styled.th ` 
    background: #F9FBFC;
    padding: 20px 7px;
    font-weight: normal;
    color: #777E90;
`;

const TableContent = styled.td `
    background: #ffffff;
    padding: 20px 7px;
    color: #989CA9;
`;

const List = styled.ul `
    padding-left: 20px;
`;

function Example() {

    return (
    <>
        <Content>
            <PositionWrap>
            <Title>인적사항 작성하기</Title>
            <Description>이름, 성별, 생년월일, 주소, 연락처(이메일, 휴대전화, 비상연락망 등)는 주민등록에 기재된 것을 기준으로 작성합니다. <br/>연락처는 명확히 기재하고, 본인의 연락처 외에비상연락망을 기재하여 연락을 못 받는 경우를 대비하는 것이 좋습니다.</Description>
            
            <Title>학력사항 작성하기</Title>
            <Description>학력사항은 최종학력부터 기재해야 합니다.<br/>일반적으로 고교졸업 이상(대학원 포함) 학력을 기술하는데 대학명과 전공명, 재학기간(년/월 단위), 졸업여부(졸업/졸업예정/중퇴/수료) 등을 정확히 써야 합니다.</Description>
             <Table>
                    <tr>
                    <TableSubtitle style={{ width: '159px'}}>기간</TableSubtitle>
                    <TableSubtitle style={{ width: '294px'}}>학교명</TableSubtitle>
                    <TableSubtitle style={{ width: '254px'}}>전공</TableSubtitle>
                    <TableSubtitle style={{ width: '209px'}}>학점</TableSubtitle>
                    <TableSubtitle style={{ width: '300px'}}>졸업구분</TableSubtitle>
                    </tr>
                    <tr>
                    <TableContent>2023.09-2027.02</TableContent>
                    <TableContent>덕성여자대학교</TableContent>
                    <TableContent>디지털소프트웨어공학부</TableContent>
                    <TableContent>4.0/4.5</TableContent>
                    <TableContent>졸업</TableContent>
                    </tr>
            </Table>
            <Title>경력사항 작성하기</Title>
            <Description>자신이 근무한 회사명과 주요사업, 소속 부서, 최종 직급, 근무기간, 주요업무 및 성과 등을 표기합니다. <br/>근무 기간은 연도와 월을 기재하며 만약 부서 이동이나 직책 승진, 해외 근무 등이 있었다면 별도로 표기합니다. <br/>업무 내용 작성 시 지원하는 직무와 관련된 주요업무와 자신이 만들어낸 성과를 수치화하여 작성합니다.</Description>
            <Table>
                    <tr>
                    <TableSubtitle style={{ width: '280px'}}>회사명</TableSubtitle>
                    <TableContent style={{ width: '335px'}}>ㅇㅇ회사</TableContent>
                    <TableSubtitle style={{ width: '280px'}}>주요 사업</TableSubtitle>
                    <TableContent style={{ width: '335px'}}>ㅇㅇ사업 </TableContent>
                    </tr>
                    <tr>
                    <TableSubtitle>부서명</TableSubtitle>
                    <TableContent>마케팅기획부</TableContent>
                    <TableSubtitle>직책(직급)</TableSubtitle>
                    <TableContent>사원</TableContent>
                    </tr>
                    <tr>
                    <TableSubtitle>근무기간</TableSubtitle>
                    <TableContent>2019.09-2021.10</TableContent>
                    <TableSubtitle>근무일수</TableSubtitle>
                    <TableContent>2년 2개월</TableContent>
                    </tr>
                    <tr>
                    <TableSubtitle>주요사업 및 성과</TableSubtitle>
                    <TableContent colSpan="3">
                        OOO 사이트 운영<br/><br/>
                        <List>
                            <li>2020년 5월 오픈 OOO 가입</li>
                            <li>OOO 이벤트 진행: 이벤트 내 가입률 OO% 상승</li>
                            <li>월간 매출 OOOO 달성</li>
                            <li>검색어 광고 및 메일 등 마케팅 전략 수립</li>
                        </List>
                    </TableContent>
                    </tr>
            </Table>

            <Title>자격사항 작성하기</Title>
            <Description>자격사항에는 직무와 관련 있는 자격증을 최근 취득한 순서로 자격명, 취득일, 발행기관을 정확하게 기재해야 합니다.<br/>어학능력은 어학별 점수나 등급과 유효기간을 확인할 수 있도록 취득일을 명확히 기재합니다.</Description>
            <Table>
                    <tr>
                    <TableSubtitle style={{ width: '159px'}}>취득일자</TableSubtitle>
                    <TableSubtitle style={{ width: '572px'}}>자격명</TableSubtitle>
                    <TableSubtitle style={{ width: '514px'}}>발급기관</TableSubtitle>
                    </tr>
                    <tr>
                    <TableContent>2023.06.25</TableContent>
                    <TableContent>컴퓨터활용능력 1급</TableContent>
                    <TableContent>대한상공회의소</TableContent>
                    </tr>
            </Table>
            <Table>
                    <tr>
                    <TableSubtitle style={{ width: '159px'}}>취득일자</TableSubtitle>
                    <TableSubtitle style={{ width: '265px'}}>언어</TableSubtitle>
                    <TableSubtitle style={{ width: '289px'}}>시험명</TableSubtitle>
                    <TableSubtitle style={{ width: '204px'}}>점수/등급</TableSubtitle>
                    <TableSubtitle style={{ width: '300px'}}>발급기관</TableSubtitle>
                    </tr>
                    <tr>
                    <TableContent>2023.06.25</TableContent>
                    <TableContent>영어</TableContent>
                    <TableContent>TOEIC</TableContent>
                    <TableContent>750</TableContent>
                    <TableContent>한국TOEIC위원회</TableContent>
                    </tr>
            </Table>
            </PositionWrap>
        </Content>
    </>
  );
}

export default Example;