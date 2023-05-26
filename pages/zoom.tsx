import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import axios from 'axios';

import linkImage from '../assets/Subtract.png';

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 343px;
  height: 43px;
  background: rgba(203, 253, 85, 0.5);
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 0 10px;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  flex-grow: 1;
  background: transparent;
  border: none;
  font-family: 'Graphik';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.5);
`;

const StyledIcon = styled.div`
  width: 25px;
  height: 25px;
  opacity: 0.5;
  background: #33363F;
  border-radius: 1px;
`;


const App = () => {
  const [feedbackText, setFeedbackText] = useState(''); // Add state for feedback text
  var loadIgnore = false;

  const handleIconClick = async () => {

    console.log("Submit clicked")
    try {
        console.log("Making call to send feedback")

        const response = await axios.post('https://groundbreak.onrender.com/metrics/feedback', {
          text: feedbackText,
        });

        console.log(response)
        setFeedbackText('');
    } catch (error) {
        console.error('Error sending feedback call:', error);
    }
  };

  useEffect(() => {

    if (!loadIgnore){
        const searchParams = new URLSearchParams(location.search);
        const parameterValue = searchParams.get('clicksrc');

        var clicksrc = 'none'
        var deviceType = 'desktop'
        if (parameterValue) {
            clicksrc = parameterValue
        }
        if (isMobile) {
            deviceType = 'mobile'
        }
        console.log("Making post call")
        
        const makeCall = async () => {
            try {
                var response = await axios.post('https://groundbreak.onrender.com/metrics/tracking', {
                    deviceType: deviceType,
                    clickSrc: clicksrc,
                });
                console.log(response)
            }catch(error){
                console.error('Error making call:', error);
            }
        };
        //makeCall()
        
    }
    loadIgnore = true
  }, []);

  return (
    <StyledForm>
      <StyledInput
        placeholder="Send Feedback"
        value={feedbackText} // Set the value of StyledInput to feedbackText state
        onChange={(event: any) => setFeedbackText(event.target.value)} // Update feedbackText state on input change
      />
      <StyledIcon onClick={handleIconClick as () => void} style={{backgroundImage: `url(${linkImage})`}} />
    </StyledForm>
  );
};

export default App;


