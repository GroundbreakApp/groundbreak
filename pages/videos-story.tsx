import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const StyledForm = styled.form`
  position: relative;
`;

const StyledStoryPage = styled.div`
  position: relative;
  width: 414px;
  height: 896px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0) 14.39%,
    rgba(0, 0, 0, 0) 43.49%,
    rgba(0, 0, 0, 0) 73.82%,
    rgba(0, 0, 0, 0.2) 92.19%
  );
  background-image: url('new client.png');
`;

const StyledShowMoreIcon = styled.div`
  position: absolute;
  visibility: hidden;
  width: 23px;
  height: 24px;
  left: 39.5px;
  top: 55.5px;
  transform: rotate(90deg);
`;

const StyledProfilePicture = styled.div`
  position: absolute;
  visibility: hidden;
  width: 47px;
  height: 47px;
  left: 360px;
  top: 423px;
`;

const StyledLikeButton = styled.div`
  position: absolute;
  visibility: hidden;
  width: 35px;
  height: 56.25px;
  left: 366px;
  top: 501px;
`;

const StyledActionButton = styled.div`
  position: absolute;
  visibility: hidden;
  width: 35px;
  height: 56.25px;
  left: 366px;
  top: 579px;
`;

const StyledMusicDisc = styled.div`
  position: absolute;
  visibility: hidden;
  width: 49px;
  height: 49px;
  left: 359px;
  top: 732px;
`;

const StyledCommentBar = styled.div`
  box-sizing: border-box;
  position: absolute;
  visibility: hidden;
  width: 414px;
  height: 82.5px;
  left: 0px;
  top: 813px;
  background: #121212;
  border: 1px solid #333333;
`;

const StyledBottomInformations = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 11px;
  gap: 7px;
  position: absolute;
  visibility: hidden;
  width: 299px;
  height: 92.65px;
  left: 0px;
  bottom: 104.35px;
`;

const StyledBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 10px;
  gap: 7px;
  position: absolute;
  width: 414px;
  height: 21px;
  left: 0px;
  bottom: 83px;
`;

const StyledProgress = styled.div`
  display: none;
  width: 193.5px;
  height: 2px;
  background: rgba(255, 255, 255, 0.34);
  border-radius: 10px;
  flex: none;
  order: 0;
  flex-grow: 1;
`;

const StyledProgress2 = styled.div`
  display: none;
  width: 193.5px;
  height: 2px;
  background: rgba(255, 255, 255, 0.34);
  border-radius: 10px;
  flex: none;
  order: 1;
  flex-grow: 1;
`;

const StyledRectangle = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 343px;
  height: 43px;
  background: rgba(203, 253, 85, 0.5);
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
`;

const StyledSendFeedback = styled.div`
  position: absolute;
  width: 88px;
  height: 13px;
  font-family: 'Graphik';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 13px;
  display: flex;
  align-items: center;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;

const StyledSendFill = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  opacity: 0.5;
`;

const StyledSubtract = styled.div`
  position: absolute;
  width: 15.93px;
  height: 15.93px;
  left: 4.25px;
  top: 4.83px;
  background: #222222;
`;

const StyledVector121 = styled.div`
  position: absolute;
  left: 8.33%;
  right: 16.67%;
  top: 16.67%;
  bottom: 8.33%;
  background: #33363F;
  border-radius: 1px;
`;

const StyledVector122 = styled.div`
  position: absolute;
  left: 33.33%;
  right: 37.5%;
  top: 37.5%;
  bottom: 33.33%;
  border: 2px solid #33363F;
  border-radius: 2px;
`;

const App: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
    // Handle form submission logic
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledStoryPage>
        <StyledShowMoreIcon />
        <StyledProfilePicture />
        <StyledLikeButton />
        <StyledActionButton />
        <StyledActionButton />
        <StyledMusicDisc />
        <StyledCommentBar />
        <StyledBottomInformations />
        <StyledBar>
          <StyledProgress />
          <StyledProgress2 />
        </StyledBar>
      </StyledStoryPage>
      <StyledRectangle />
      <StyledSendFeedback>Send Feedback</StyledSendFeedback>
      <StyledSendFill>
        <StyledSubtract />
        <StyledVector121 />
        <StyledVector122 />
      </StyledSendFill>
      <button type="submit">Submit</button>
    </StyledForm>
  );
};

export default App;
