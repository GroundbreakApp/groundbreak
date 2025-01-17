
import React, { Suspense, useState, useEffect } from "react";
import MyStory from '@/components/my-story'
import UpLeft from "@/assets/up-left.svg";
import styled from 'styled-components';
import axios from 'axios';
import { TbSend } from "react-icons/tb"

import { isMobile } from 'react-device-detect';

import { useAppDispatch } from "@/stores/hook";
import { setPause } from "@/components/my-story/slices/story.slice";
import { RegisterForm } from "@/components/RegisterForm";
import { Logo } from "@/components/logo";
import Head from "next/head";


const stories2 = [
  {
    playbackId: "i4f025tuVa2024JMiniMEEdR013EVwhbJpJK800ehk4pVmc",
    duration: 13 * 1000,
    type: "mux-video",
    isAutoplay: false,
    overlayColor: "#45476d"
  },

  {
    playbackId: "txu6bFcw502HhhA2SkZc14pUujOwQi1lZzrNEIkULIkQ", // groundbreak is short form video
    type: "mux-video",
    duration: 4.3 * 1000,
    isAutoplay: true,
    overlayColor: "#222c67",
  },
  {
    playbackId: "pV02Txnt7SFyO6OAhH3W5o6IWwd5Zpfc02r7meaKimPt00", // groundbreak is short form video
    type: "mux-video",
    duration: 3.8 * 1000,
    isAutoplay: true,
    overlayColor: "#664636",
  },
  {
    playbackId: "3I9gOOM2LpVqjOv00ejZx3nYQ2q5xluD4HtSez02MDN00w", // groundbreak is short form video
    type: "mux-video",
    duration: 4.2 * 1000,
    isAutoplay: true,
    overlayColor: "#b8a0da",
  },
  {
    playbackId: "b5NrVCRkAobl02NKKtf96HkXzIKzdnBuRlKopG8ZZRpI", // groundbreak is short form video
    type: "mux-video",
    duration: 3.7 * 1000,
    isAutoplay: true,
    overlayColor: "#ebc38e",
    widgets: [
      {
        spawnTime: 0,
        duration: 7000,
        render: () => {
          return <div className="flex justify-center items-start h-full w-full absolute left-0 top-8 z-[99999] ">
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
    duration: 7.9 * 1000,
    isAutoplay: true,
    overlayColor: "#ffffff",
    widgets: [
      {
        spawnTime: 0,
        duration: 7000,
        render: () => <RegisterForm />
      }
    ]
  },
  {
    playbackId: "Mahil2YLAqtLr0101txaKF1fw5mJrWMl54SKIy302zW02uw", // groundbreak is short form video
    type: "mux-video",
    duration: 5.2 * 1000,
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

    //window.addEventListener('touchstart', function(e){ e.preventDefault(); });
    window.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

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
            page: "ph2"
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
    <>
      <Head>
        <meta
          content="Groundbreak is a B2B vertical video platform that gets your foot in the door through personalized, disruptive experiences."
          name="description"
        />
        <meta content="Project Horizon - Finding Product-Market Fit" property="og:title" />
        <meta
          content="Groundbreak is a B2B vertical video platform that gets your foot in the door through personalized, disruptive experiences."
          property="og:description"
        />
        <meta
          content="https://groundbreak-qa.vercel.app/images/rj-express.gif"
          property="og:image"
        />
        <meta
          content="Groundbreak - Break Through the Noise"
          property="twitter:title"
        />
        <meta
          content="Groundbreak is a B2B vertical video platform that gets your foot in the door through personalized, disruptive experiences."
          property="twitter:description"
        />
        <meta
          content="https://groundbreak-qa.vercel.app/images/rj-express.gif"
          property="twitter:image"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          property="og:image:secure_url"
          content="https://groundbreak-qa.vercel.app/images/rj-express.gif"
        />
        <meta property="og:image:type" content="image/gif" />
        <meta property="og:image:width" content="270" />
        <meta property="og:image:height" content="480" />
      </Head>
      <div className="App" style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height, }}>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <div className="stories">
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
        </div>
      </div>
    </>

  );
}

export default App;
