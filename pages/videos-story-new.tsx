
import React, { Suspense,useState, useEffect } from "react";
import MyStory from '@/components/my-story'
import LinkSVG from "@/assets/link.svg";
import styled from 'styled-components';
import axios from 'axios';

import linkImage from '../assets/Subtract.png';
/*
const stories2 = [
  {
    playbackId: "4vipwgRq4p01pYskY5oGjM02fwL6kGA00eG53ux02aQRl5w",
    duration: 9.7 * 1000,
    type: "mux-video",
    isAutoplay: false,
    overlayColor: "#434458"
  },
  {
    playbackId: "SmaCpxZUcHzrwE6qIuIzyrjwWSPy00OFWExu4waY2WA8", // groundbreak is short form video
    type: "mux-video",
    duration: 5 * 1000,
    isAutoplay: true,
    overlayColor: "#CBFD55"
  },
  {
    playbackId: "6Rask9izbjGHMBGZiFS5xMoEDV2TYB6of27cuqpvIZk", // groundbreak is short form video
    type: "mux-video",
    duration: 22.055367 * 1000,
    isAutoplay: true,
    overlayColor: "#ABFD55",
    widgets: [{
      spawnTime: 13000,
      duration: 8500,
      render: () => {
        return (
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: "9999",
            pointerEvents: "none"
          }}>
            <a
              href="https://docs.google.com/presentation/d/1oNcfzR-yjERDBtwihW86UqKGfvi0AR8T/edit?usp=sharing&ouid=113854719469946467137&rtpof=true&sd=true"
              target="_blank"
              style={{
                pointerEvents: "auto",
                position: "absolute",
                left: "22%",
                top: "63%",
                padding: "7px 15px",
                fontSize: "24px",
                color: "black",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "40px",
                border: "2px solid black"
              }}
            >
              <span style={{
                marginRight: "10px"
              }}>
                <LinkSVG />
              </span>
              Kickoff Deck </a>
          </div>
        )
      }
    }]
  },
  {
    playbackId: "DhjdILWdsQSoqUs2ps9nFLs02K00c4Dx2hP1Iyemd8oAw", // best sales tool
    duration: 25.133333 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CBAD55",
  },
  {
    playbackId: "AAjzwXeiO551UAvjID8fPS02bESiRX8jwyqUj024gcA28",
    duration: 15.081733 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CBADA5",
  },
  {
    playbackId: "I01aOPryQi5hVuir02mqM02B3G01g45s00EFDaGzqlS3bQY4",
    duration: 11 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CABD55",
  },
  {
    playbackId: "00CzDwETt01Sh1eNqIgp4DM01008SqWdqbeGEIkkAITagp8",
    duration: 10 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CAFDF5",
    widgets: [{
      spawnTime: 250,
      duration: 9000,
      render: () => {
        return (
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: "9999",
            pointerEvents: "none"
          }}>
            <a
              href=" https://docs.google.com/document/d/1FlVj-62uJBrHadc_A3il2e6RWnGmJ-XBbU1F-Q3RsvI/edit?usp=sharing"
              target="_blank"
              style={{
                pointerEvents: "auto",
                position: "absolute",
                left: "18%",
                top: "30%",
                width: "70%",
                padding: "10px",
                fontSize: "16px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "40px",
                border: "2px solid black"
              }}
            >
              <span style={{
                marginRight: "10px"
              }}>
                <LinkSVG />
              </span>
              Product Experiment </a>
            <a
              href="https://docs.google.com/spreadsheets/d/17vQW0nEmSmC_B6AhA_igT6vma1WYZlKI7MA6TsAVCYI/edit?usp=sharing"
              target="_blank"
              style={{
                pointerEvents: "auto",
                position: "absolute",
                left: "18%",
                top: "45%",
                width: "70%",
                padding: "10px",
                fontSize: "16px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "40px",
                border: "2px solid black"
              }}
            >
              <span style={{
                marginRight: "10px"
              }}>
                <LinkSVG />
              </span>
              Interview Questions</a>
            <a
              href="https://docs.google.com/spreadsheets/d/1Ku1U1IoHarK-h-eqt02YwvCMHfvLg3RQ41YbHb3YL9E/edit?usp=sharing"
              target="_blank"
              style={{
                pointerEvents: "auto",
                position: "absolute",
                left: "18%",
                top: "60%",
                width: "70%",
                padding: "10px",
                fontSize: "16px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "40px",
                border: "2px solid black"
              }}
            >
              <span style={{
                marginRight: "10px"
              }}>
                <LinkSVG />
              </span>
              Squad Assignments </a>
          </div>
        )
      }
    }]
  },
];
*/


const StyledForm = styled.form`
  position: relative;
  bottom: 0;
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
  color: rgba(0, 0, 0, 0.5);
`;

const StyledIcon = styled.div`
  width: 25px;
  height: 25px;
  opacity: 0.5;
  background: #33363F;
  border-radius: 1px;
`;

const stories2 = [
  {
    playbackId: "7GTNWaH02xd6HXl9jl602bHkOkLVQUT8VWjnJmVfn00bFc",
    duration: 4.02 * 1000,
    type: "mux-video",
    isAutoplay: false,
    overlayColor: "#434458",
  },

  {
    playbackId: "KzQwJ4SJDpw01gRqM46dOkXtEIfHsjjyx42Bxirm01aGo", // groundbreak is short form video
    type: "mux-video",
    duration: 10.8 * 1000,
    isAutoplay: true,
    overlayColor: "#CBFD55",
    widgets: [{
      spawnTime: 2000,
      duration: 6000,
      render: () => {
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
        return (
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: "20000",
            pointerEvents: "none"
          }}>
           <StyledForm>
              <StyledInput
                placeholder="Send Feedback"
                value={feedbackText} // Set the value of StyledInput to feedbackText state
                onChange={(event: any) => setFeedbackText(event.target.value)} // Update feedbackText state on input change
              />
              <StyledIcon onClick={handleIconClick as () => void} style={{backgroundImage: `url(${linkImage})`}} />
            </StyledForm>
          </div>
        )
      }
    }]
  },
  {
    playbackId: "sWIY011z63lA4hBLmKcuyAUp78CTfGUdZ5JLjx7ljwfk", // groundbreak is short form video
    type: "mux-video",
    duration: 10.96 * 1000,
    isAutoplay: true,
    overlayColor: "#ABFD55",
  },
  {
    playbackId: "Xx1yt01P01nlAlNczxtbxCw02w01Y5RPDy6Rp02kDWbPWwtc", // best sales tool
    duration: 29.1 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CBAD55",
  },
  {
    playbackId: "R5Yp102400d2V1dujSo2CMcIYReAC3JvpU018vsaT4M902A",
    duration: 17.4 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CBADA5",
  },
  {
    playbackId: "u4ln00BGmXUctKfF6Co3GwLDjrqNb00LnldUMkDJEJGKY",
    duration: 21.83 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CABD55",
  },
  {
    playbackId: "tvIVtQeTr7rZMNyM00cfKzC3YyFxHm902CnieWfSvPMug",
    duration: 15.86 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CAFDF5",
  },
  {
    playbackId: "A2tS5hFYhOZJWmZtLbd00UecC31palp4JgRP6Shs9uA00",
    duration: 5 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CAFDF5",
  },
];


function App() {
  return (
    <div className="App" style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="stories">
        <Suspense>
          <MyStory
            height="100vh"
            width="100vw"
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
