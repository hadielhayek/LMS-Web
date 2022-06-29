import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 100px;
  background: #f7f8f9;
  position: relative;
  overflow: hidden;
  /* margin-bottom: 20px; */
  user-select: none;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: auto;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HeaderIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  width: 55px;
  color: #484e53;
  background: white;
  border: 1px solid #707070;
  border-radius: 6px;
`;

const HeaderTitle = styled.h1`
  color: #484e53;
  font-size: 2rem;
  width: max-content;
  margin-bottom: 0;
  margin-top: 0;
  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const HeaderDesc = styled.p`
  color: #484e53;
  font-size: 0.95rem;
  font-weight: 400;
  width: fit-content;
  margin-bottom: 0;
  @media (max-width: 767px) {
    font-size: 0.75rem;
  }
`;
const Header = (props) => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderIconContainer>{props.icon}</HeaderIconContainer>
        <div>
          <HeaderTitle>{props.title}</HeaderTitle>
          <HeaderDesc>{props.subTitle}</HeaderDesc>
        </div>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
