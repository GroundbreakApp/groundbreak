
import React, { Suspense, useState, useEffect } from "react";
import MyStory from '@/components/my-story'
import LinkSVG from "@/assets/link.svg";
import styled from 'styled-components';
import axios from 'axios';
import { TbSend } from "react-icons/tb"

import { isMobile } from 'react-device-detect';

import linkImage from '../assets/Subtract.png';
import { useAppDispatch } from "@/stores/hook";
import { setPause } from "@/components/my-story/slices/story.slice";


const stories2 = [
  {
    playbackId: "3pCZmRAJejFqHwgQBrKMR4TNb6p47GzMmRq02kC9HYA00",
    duration: 11 * 1000,
    type: "mux-video",
    isAutoplay: false,
    overlayColor: "#A38A8E"
  },

  {
    playbackId: "vn009Mat00To00IlkL4AlJczU300U3o2LqrV4wCURcBIuzE", // groundbreak is short form video
    type: "mux-video",
    duration: 8.5 * 1000,
    isAutoplay: true,
    overlayColor: "#EE7B33",
  },
  {
    playbackId: "AhHu00uQjZNVp1c8mtFdg9UeLN01Fa502Y5kn5mkYtwPUs", // groundbreak is short form video
    type: "mux-video",
    duration: 7.9 * 1000,
    isAutoplay: true,
    overlayColor: "#3E496F",
  },
  {
    playbackId: "MJ975pVShfrElrR3QdsyQoAYybbHz7Grw00702dJCQA7A", // best sales tool
    duration: 12.565 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#000000",
  },
  {
    playbackId: "sGHjahbiX2yPzpxpBHfeXqeimlZN00bWowBTDOOBwIA8",
    duration: 9.8 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#CCCCCC",
  },
  {
    playbackId: "00HocH0001t02OdxcQXec006RIttTogj02V3c4CVSeQPyqLLM",
    duration: 7.168 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#0A236B",
  },
  {
    playbackId: "u025nqqoFv9Im4bSvWN6yQzx7tSl2k8XP8c01mfXdDf1w",
    duration: 10.5 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#99BCB7",

  },
  {
    playbackId: "It01sE6jLq00OYZ4QuR00zusX6nytURqh202mQzQyAzNWK4",
    duration: 14.7 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#A38A8E",
  },
  {
    playbackId: "x01HGIYE6yt01SqaxsKPhgaqEWtyOH2RfI30078EET00OHg",
    duration: 24.4 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#A38A8E",
  },
  {
    playbackId: "krkpw1u7PGIrNaThpZEBOVhtAIgRE8O2wOl3AfgWS02A",
    duration: 10.4 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#568CC4",
  },
  {
    playbackId: "B801WWTyQurshGwy00AoVXDZ7ItakVWTeMLDm00KqAucZk",
    duration: 5 * 1000,
    type: "mux-video",
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
          var response = await axios.post(`${process.env.NEXT_PUBLIC_RENDER_ADDRESS}/metrics/tracking`, {
            deviceType: deviceType,
            clickSrc: clicksrc,
            page: "week2"
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
