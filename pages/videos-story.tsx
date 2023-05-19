
import React, { Suspense } from "react";
import StoriesLazy from '@/components/story'
import LinkSVG from "@/assets/link.svg";
const stories2 = [
  {
    playbackId: "4vipwgRq4p01pYskY5oGjM02fwL6kGA00eG53ux02aQRl5w",
    duration: 9 * 1000,
    type: "mux-video",
  },
  {
    playbackId: "SmaCpxZUcHzrwE6qIuIzyrjwWSPy00OFWExu4waY2WA8", // groundbreak is short form video
    type: "mux-video",
    duration: 5 * 1000,
  },
  {
    playbackId: "6Rask9izbjGHMBGZiFS5xMoEDV2TYB6of27cuqpvIZk", // groundbreak is short form video
    type: "mux-video",
    duration: 22 * 1000,
  },
  {
    playbackId: "DhjdILWdsQSoqUs2ps9nFLs02K00c4Dx2hP1Iyemd8oAw", // best sales tool
    duration: 25 * 1000,
    type: "mux-video",
  },
  {
    playbackId: "AAjzwXeiO551UAvjID8fPS02bESiRX8jwyqUj024gcA28",
    duration: 15 * 1000,
    type: "mux-video",
  },
  {
    playbackId: "I01aOPryQi5hVuir02mqM02B3G01g45s00EFDaGzqlS3bQY4",
    duration: 11 * 1000,
    type: "mux-video",
  },
  {
    playbackId: "00CzDwETt01Sh1eNqIgp4DM01008SqWdqbeGEIkkAITagp8",
    duration: 10 * 1000,
    type: "mux-video",
  },
  {
    playbackId: "3RVRLNgGMso10291haDQk4AoPyMpiBHfdiFKFGExnv004",
    duration: 10 * 1000,
    type: "mux-video",
    overlay: () => {
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
            href="https://calendly.com/josh-israel/30min"
            target="_blank"
            style={{
              pointerEvents: "auto",
              position: "absolute",
              left: "30%",
              top: "20%",
              padding: "10px 20px",
              fontSize: "24px",
              color: "white",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "5px",
              background: "linear-gradient(to right, #6adbb1, #03de70)"
            }}
          >
            <span style={{
              marginRight: "10px"
            }}>
              <LinkSVG />
            </span>
            Calendly</a>
        </div>
      )
    }
  },
  {
    playbackId: "VCir1i1jaEiKP9fJZJZlCU8usf4c9M8u6PuuvM3Zcr00",
    duration: 3 * 1000,
    type: "mux-video",
  },
];

function App() {
  return (
    <div className="App">
      <div className="stories">
        <Suspense>
          <StoriesLazy
            height="100vh"
            width="calc(100vh * 9 / 16)"
            loop
            keyboardNavigation
            defaultInterval={8000}
            stories={stories2}
            onStoryEnd={(s: any, st: any) => console.log("story ended", s, st)}
            onAllStoriesEnd={(s: any, st: any) => console.log("all stories ended", s, st)}
            onStoryStart={(s: any, st: any) => console.log("story started", s, st)}
            storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
