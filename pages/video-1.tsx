
import React, { Suspense, useState, useEffect } from "react";
import MyStory from '@/components/my-story'
import LinkSVG from "@/assets/link.svg";
import styled from 'styled-components';
import axios from 'axios';
import { TbSend } from "react-icons/tb"

import { isMobile } from 'react-device-detect';

import linkImage from '../assets/Subtract.png';
import UpLeft from '../assets/up-left.svg';
import { useAppDispatch } from "@/stores/hook";
import { setPause } from "@/components/my-story/slices/story.slice";

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
    playbackId: "00qf3wmH00DHhiTZl8oe8RyulJPpa01jfQClmC5PbnAZ7Y",
    duration: 12.8 * 1000,
    type: "mux-video",
    isAutoplay: false,
    overlayColor: "#FFFFFF"
  },

  {
    playbackId: "3P00vfla6A2ds7wBnZIsZEDenPent9RwobTDi3GYWEfI", // groundbreak is short form video
    type: "mux-video",
    duration: 15.6 * 1000,
    isAutoplay: true,
    overlayColor: "#EFE4AF",
  },
  {
    playbackId: "Lrt72Y00TT2XyT6tqZ8OxbLDatFNt02eBLvbuAAju7LD00", // groundbreak is short form video
    type: "mux-video",
    duration: 7.7 * 1000,
    isAutoplay: true,
    overlayColor: "#659DAD",
    widgets: [
      {
        spawnTime: 0,
        duration: 7000,
        render: () => {
          return <div className="flex justify-center items-start h-full w-full absolute left-0 top-0 z-[99999] ">
            <a href="http://pmf.highalpha.com" target="_blank" className="mt-4 bg-[#FFBB86] text-[#172358] rounded-lg font-semibold py-2 flex items-center justify-center px-2">
              Register Here
              <span className="ml-2 w-4 h-4"> <UpLeft /> </span>
            </a>
          </div>
        }
      },
      //   {
      //   spawnTime: 0,
      //   duration: 7000,
      //   render: () => {
      //     // eslint-disable-next-line react-hooks/rules-of-hooks
      //     const dispatch = useAppDispatch();
      //     return (
      //       <div className="flex justify-center items-end h-full w-full absolute left-0 top-0 z-[99999]"
      //         onFocus={() => dispatch(setPause(true))}
      //       >
      //         <div className="flex flex-col items-stretch bg-white w-[80%] mb-2 gap-4 p-2">
      //           <p className="font-semibold text-sm">Fill out the form to join the waitlist</p>
      //           <input type="text" className="text-gray-800 bg-transparent border border-gray-400 rounded-lg px-2 py-1" placeholder="First name" />
      //           <input type="text" className="text-gray-800 bg-transparent border border-gray-400 rounded-lg px-2 py-1" placeholder="Last name" />
      //           <input type="email" className="text-gray-800 bg-transparent border border-gray-400 rounded-lg px-2 py-1" placeholder="Email" />
      //           <button className="bg-[#CBFD55] rounded-lg font-semibold py-2">
      //             Join Waitlist
      //           </button>
      //         </div>
      //       </div>
      //     )
      //   }
      // }
    ]
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
        </Suspense>
      </div>
    </div>
  );
}

export default App;
