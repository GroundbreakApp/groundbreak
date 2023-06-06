
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
    playbackId: "Czf3UJj2KYKLO68oYKOIJ8PyVdHffdKtEbGC01301J016c",
    duration: 14.7 * 1000,
    type: "mux-video",
    isAutoplay: false,
    overlayColor: "#566169"
  },

  {
    playbackId: "nVWwWXh02601e0100vUlBn1v4012ZdR37ZiCR5iFEAF5VbBg", // groundbreak is short form video
    type: "mux-video",
    duration: 13.166667 * 1000,
    isAutoplay: true,
    overlayColor: "#CCB89E",
  },
  {
    playbackId: "E01zGwr5QLSS9kd5oMUCztKPnrvk69KzPUWLwb02bGi9s", // groundbreak is short form video
    type: "mux-video",
    duration: 14.833333 * 1000,
    isAutoplay: true,
    overlayColor: "#DFD1D6",
  },
  {
    playbackId: "pFvkuOsPnI27kDyqh1aG00cwDNrjL5TjxR9pU4wz9zx00", // best sales tool
    duration: 16.733333 * 1000,
    type: "mux-video",
    isAutoplay: true,
    overlayColor: "#D3DCDD",
    widgets: [{
      spawnTime: 4000,
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
              href=" https://calendly.com/josh-israel"
              target="_blank"
              style={{
                background: "#cbfd55",
                color: "#000",
                pointerEvents: "auto",
                position: "absolute",
                left: "22%",
                top: "10%",
                padding: "7px 15px",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "40px",
                borderColor: "transparent"
              }}
            >
              <span style={{
                marginRight: "10px"
              }}>
                <LinkSVG />
              </span>
              Book Time </a>
          </div>
        )
      }
    }]
  },
  {
    playbackId: "7SQgcYkf2b9srbLMZIkMpwY8OUewsUdDjsOC7sm02G9Q", // groundbreak is short form video
    type: "mux-video",
    duration: 5 * 1000,
    isAutoplay: true,
    overlayColor: "#000",
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
