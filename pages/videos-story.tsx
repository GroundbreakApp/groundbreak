
import React, { Suspense } from "react";
import StoriesLazy, { WithSeeMore } from '@/components/story'

const stories2 = [
  {
    playbackId: "U6oA02Lp8WKqwHdu3yexAwOrSRSIMt1wpjrcilg363rQ",
    duration: 10 * 1000,
    type: "mux-video",
  },
  {
    url: "https://i.ibb.co/vx62r8X/image-first.png",
    type: "image",
    duration: 6.5 * 1000,
  },
  {
    playbackId: "LDxRsBkTCmaDwpUzQwyvH8DWFAVPmJPsu01QMO2Enaz00",
    duration: 10 * 1000,
    type: "mux-video",
  },
  {
    url: "https://i.ibb.co/094p0Gh/2nd-image.png",
    type: "image",
    duration: 6.5 * 1000,
  },
  {
    playbackId: "x9h902uaW7TxCE3euREskpHA8lATkD302vYR5e00C5tong",
    duration: 10 * 1000,
    type: "mux-video",
  },
  {
    playbackId: "lbd5FkTc00SdkNwMnR2HrbMNKLevCT2yUlEdy3YtXs98",
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
