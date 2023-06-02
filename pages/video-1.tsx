
import React, { Suspense, useState, useEffect } from "react";
import MyStory from '@/components/my-story'
import LinkSVG from "@/assets/link.svg";
import styled from 'styled-components';
import axios from 'axios';
import { TbSend } from "react-icons/tb"
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";

import { isMobile } from 'react-device-detect';

import linkImage from '../assets/Subtract.png';
import UpLeft from '../assets/up-left.svg';
import { useAppDispatch } from "@/stores/hook";
import { setPause } from "@/components/my-story/slices/story.slice";
import { useJoinWaitList } from "@/services/api";
import { RegisterForm } from "@/components/RegisterForm";
import { Logo } from "@/components/logo";

const StyledForm = styled.form`
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); // semi-transparent background
  padding: 10px;
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
  color: white;
`;

const StyledIcon = styled.div`
  width: 25px;
  height: 25px;
  opacity: 0.5;
  background: #33363F;
  border-radius: 1px;
`;

const FeedbackForm = () => {
  const [feedbackText, setFeedbackText] = useState(''); // Add state for feedback text
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
  const dispatch = useAppDispatch();
  return (
    <div style={{
      position: "absolute",
      left: 0,
      right: 0,
      width: "100%",
      height: "100%",
      zIndex: "20000",
    }}>
      <StyledForm>
        <StyledInput
          placeholder="Send Feedback"
          value={feedbackText} // Set the value of StyledInput to feedbackText state
          onChange={(event: any) => setFeedbackText(event.target.value)} // Update feedbackText state on input change
          onFocus={() => dispatch(setPause(true))}
        />
        {/* <StyledIcon onClick={handleIconClick as () => void} style={{ backgroundImage: `url(${linkImage})` }} /> */}
        <button className="h-8 w-8 text-white fill-current"
          onClick={handleIconClick}
        >

          <TbSend />
        </button>
      </StyledForm>
    </div>
  )
}

const stories2 = [
  {
    playbackId: "i4f025tuVa2024JMiniMEEdR013EVwhbJpJK800ehk4pVmc",
    duration: 12.8 * 1000,
    type: "mux-video",
    isAutoplay: false,
    overlayColor: "#45476d"
  },

  {
    playbackId: "3P00vfla6A2ds7wBnZIsZEDenPent9RwobTDi3GYWEfI", // groundbreak is short form video
    type: "mux-video",
    duration: 15.6 * 1000,
    isAutoplay: true,
    overlayColor: "#f7d4e2",
  },
  {
    playbackId: "Lrt72Y00TT2XyT6tqZ8OxbLDatFNt02eBLvbuAAju7LD00", // groundbreak is short form video
    type: "mux-video",
    duration: 7.7 * 1000,
    isAutoplay: true,
    overlayColor: "#d09269",
    widgets: [
      {
        spawnTime: 0,
        duration: 7000,
        render: () => <RegisterForm />
      }
    ]
  },
  {
    playbackId: "4ErHAaYolNXfnJHyyYP8NqhCVs3EaSI5VrJBXLlzwIE", // groundbreak is short form video
    type: "mux-video",
    duration: 5 * 1000,
    isAutoplay: true,
    overlayColor: "#000000",
  },
];


function App() {
  var loadIgnore = false;

  const [height, setHeight] = useState('100vh'); // default to vh

  useEffect(() => {
    if ('CSS' in window && CSS.supports('height', '100svh')) {
      setHeight('100svh'); // switch to svh if supported
    }

    if (!loadIgnore) {
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
        } catch (error) {
          console.error('Error making call:', error);
        }
      };
      makeCall()

    }
    loadIgnore = true
  }, []);

  return (
    <div className="App" style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height }}>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <div className="stories">
        <Suspense>
          <MyStory
            height="100svh"
            width="100svw"
            keyboardNavigation
            defaultInterval={8000}
            stories={stories2}
            onStoryEnd={(s: any, st: any) => { }}
            onAllStoriesEnd={(s: any, st: any) => { }}
            onStoryStart={(s: any, st: any) => { }}
            storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
          />
          <Logo />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
