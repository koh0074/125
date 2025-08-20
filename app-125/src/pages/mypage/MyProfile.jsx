import { useState, useEffect } from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import SuccessModal from "../../modal/SuccessModal";
import axiosInstance from "../../api/axiosInstance";

const ProfileContainer = styled.div`
  max-width: 1178px;
  margin: 0 auto;
  padding: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 40px;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--border, #ddd);          
  padding: 40px;
  border-radius: 4px;
  background-color: var(--card-bg, #fff);         
  margin-bottom: 20px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f2f2f2;
`;

const ProfileInfo = styled.div`
  font-size: 16px;
  line-height: 2;
`;

const Label = styled.div`
  font-size: 13px;
  color: var(--muted, #777);                      
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;                     
  background-color: var(--input-bg, #fdfdfd);     
  font-size: 14px;
  color: var(--text, #333);                        
  outline: none;

  &:focus {
    border-color: var(--accent, #3e63dd);         
  }
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;

  & > div {
    flex: 1;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const EditButton = styled.button`
  background-color: var(--btn-bg, #000);          
  color: #fff;
  padding: 10px 24px;
  font-size: 15px;
  border: none;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background-color: var(--btn-bg-hover, #333);  
  }
`;

function MyProfile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/api/user/mypage");
      const data = response.data.user;
      setUser(data);
      setBio(data.bio || "");
      setAddress(data.address || "");
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditClick = async () => {
    try {
      await axiosInstance.put("/api/user/mypage/update", { bio, address });
      await fetchUserProfile();
      setShowModal(true);
    } catch (error) {
      console.error("프로필 수정 실패:", error);
    }
  };

  return (
    <ProfileContainer>
      <SectionTitle>프로필</SectionTitle>

      {user && (
        <>
          <ProfileCard>
            <AvatarWrapper>
              <Avatar src={user.profileImage || avatar} alt="프로필 이미지" />
            </AvatarWrapper>

            <div style={{ flex: 1 }}>
              {/* 프로필 정보 */}
              <ProfileInfo>
                <div>이름: {user.username}</div>
                <div>아이디: {user.login_id}</div>
                <div>생년월일: {user.birthdate}</div>
                <div>성별: {user.gender === "female" ? "여자" : "남자"}</div>
                {user.bio && <div>자기소개: {user.bio}</div>}
              </ProfileInfo>
            </div>
          </ProfileCard>

          <Row>
            <div>
              <Label>이메일</Label>
              <Input type="email" value={user.email} disabled />
            </div>
            <div>
              <Label>휴대폰 번호</Label>
              <Input type="text" value={user.phone_number} disabled />
            </div>
          </Row>

          <div>
            <Label>자기소개</Label>
            <Input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자기소개를 입력하세요"
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <Label>주소</Label>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소를 입력하세요"
            />
          </div>

          <ButtonSection>
            <EditButton onClick={handleEditClick}>수정하기</EditButton>
          </ButtonSection>
        </>
      )}

      {showModal && (
        <SuccessModal
          onClose={() => setShowModal(false)}
          title="수정 성공"
          message="프로필이 수정되었습니다."
        />
      )}
    </ProfileContainer>
  );
}

export default MyProfile;
