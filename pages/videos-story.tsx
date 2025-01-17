
import React, { Suspense, useEffect, useState } from "react";
import StoriesLazy from '@/components/story'
import LinkSVG from "@/assets/link.svg";
const stories2 = [
  {
    playbackId: "4vipwgRq4p01pYskY5oGjM02fwL6kGA00eG53ux02aQRl5w",
    duration: 9.7 * 1000,
    type: "mux-video",
    isAutoplay: false,
    isFirstSlide: true,
  },
  {
    playbackId: "SmaCpxZUcHzrwE6qIuIzyrjwWSPy00OFWExu4waY2WA8", // groundbreak is short form video
    type: "mux-video",
    duration: 5 * 1000,
    isAutoplay: true,
  },
  {
    playbackId: "6Rask9izbjGHMBGZiFS5xMoEDV2TYB6of27cuqpvIZk", // groundbreak is short form video
    type: "mux-video",
    duration: 22.055367 * 1000,
    isAutoplay: true,
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
                left: "27%",
                top: "66%",
                padding: "10px 20px",
                fontSize: "24px",
                color: "black",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "40px",
                border: "5px solid black"
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
  },
  {
    playbackId: "AAjzwXeiO551UAvjID8fPS02bESiRX8jwyqUj024gcA28",
    duration: 15.081733 * 1000,
    type: "mux-video",
    isAutoplay: true,
  },
  {
    playbackId: "I01aOPryQi5hVuir02mqM02B3G01g45s00EFDaGzqlS3bQY4",
    duration: 11 * 1000,
    type: "mux-video",
    isAutoplay: true,
  },
  {
    playbackId: "00CzDwETt01Sh1eNqIgp4DM01008SqWdqbeGEIkkAITagp8",
    duration: 10 * 1000,
    type: "mux-video",
    isAutoplay: true,
    widgets: [{
      spawnTime: 0,
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
                left: "20%",
                top: "30%",
                width: "60%",
                padding: "10px",
                fontSize: "24px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "40px",
                border: "5px solid black"
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
                left: "20%",
                top: "45%",
                width: "60%",
                padding: "10px",
                fontSize: "24px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "40px",
                border: "5px solid black"
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
                left: "20%",
                top: "60%",
                width: "60%",
                padding: "10px",
                fontSize: "24px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "40px",
                border: "5px solid black"
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


function App() {
  const [height, setHeight] = useState('100vh'); // default to vh

  useEffect(() => {
    if ('CSS' in window && CSS.supports('height', '100svh')) {
      setHeight('100svh'); // switch to svh if supported
    }
  }, []);

  return (
    <div className="App" style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height }}>
      <div className="stories">
        <Suspense>
          <StoriesLazy
            height={height}
            width="calc(100svh * 9 / 16)" // replace this with the corresponding svh calculation if it exists
            loop
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