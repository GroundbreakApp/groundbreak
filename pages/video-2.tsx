
import React, { Suspense, useState, useEffect } from "react";
import MyStory from '@/components/my-story'
import UpLeft from "@/assets/up-left.svg";
import styled from 'styled-components';
import axios from 'axios';
import { TbSend } from "react-icons/tb"

import { isMobile } from 'react-device-detect';

import { useAppDispatch } from "@/stores/hook";
import { setPause } from "@/components/my-story/slices/story.slice";


const stories2 = [
  {
    playbackId: "lEkxLDgI9UtYHavO02tMkeFiOb7JhalcI013mQYavsTpE",
    duration: 12.8 * 1000,
    type: "mux-video",
    isAutoplay: false,
    overlayColor: "#FFFFFF"
  },

  {
    playbackId: "txu6bFcw502HhhA2SkZc14pUujOwQi1lZzrNEIkULIkQ", // groundbreak is short form video
    type: "mux-video",
    duration: 4.1 * 1000,
    isAutoplay: true,
    overlayColor: "#EFE4AF",
  },
  {
    playbackId: "pV02Txnt7SFyO6OAhH3W5o6IWwd5Zpfc02r7meaKimPt00", // groundbreak is short form video
    type: "mux-video",
    duration: 3.6 * 1000,
    isAutoplay: true,
    overlayColor: "#659DAD",
  },
  {
    playbackId: "3I9gOOM2LpVqjOv00ejZx3nYQ2q5xluD4HtSez02MDN00w", // groundbreak is short form video
    type: "mux-video",
    duration: 4.0 * 1000,
    isAutoplay: true,
    overlayColor: "#659DAD",
  },
  {
    playbackId: "b5NrVCRkAobl02NKKtf96HkXzIKzdnBuRlKopG8ZZRpI", // groundbreak is short form video
    type: "mux-video",
    duration: 3.5 * 1000,
    isAutoplay: true,
    overlayColor: "#659DAD",
    widgets: [
      {
        spawnTime: 0,
        duration: 7000,
        render: () => {
          return <div className="flex justify-center items-start h-full w-full absolute left-0 top-0 z-[99999] ">
            <a href="http://pmf.highalpha.com" target="_blank" className="mt-4 bg-[#FFBB86] text-[#172358] rounded-lg font-semibold py-2 flex items-center justify-center px-2">
              View the Report
              <span className="ml-2 w-4 h-4"> <UpLeft /> </span>
            </a>
          </div>
        }
      },
    ]
  },
  {
    playbackId: "4W00hZ4pMCakw02ndar56omDgA5sWguaflfc002ckR7qwU", // groundbreak is short form video
    type: "mux-video",
    duration: 7.7 * 1000,
    isAutoplay: true,
    overlayColor: "#659DAD",
    widgets: [
      {
        spawnTime: 0,
        duration: 7000,
        render: () => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const dispatch = useAppDispatch();
          return (
            <div className="flex justify-center items-start h-full w-full absolute left-0 top-0 z-[99999]"
              style={{
                zoom: 0.7
              }}
              onFocus={() => dispatch(setPause(true))}
            >
              <div className="flex flex-col items-stretch bg-white w-[80%] mb-2 gap-4 p-2 mt-2">
                <p className="font-semibold text-base">Fill out the form to join the waitlist</p>
                <input type="text" className="text-gray-800 bg-transparent border border-gray-400 rounded-lg px-2 py-1" placeholder="First name" />
                <input type="text" className="text-gray-800 bg-transparent border border-gray-400 rounded-lg px-2 py-1" placeholder="Last name" />
                <input type="email" className="text-gray-800 bg-transparent border border-gray-400 rounded-lg px-2 py-1" placeholder="Email" />
                <button className="bg-[#CBFD55] rounded-lg font-semibold py-2">
                  Join Waitlist
                </button>
              </div>
            </div>
          )
        }
      }
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
