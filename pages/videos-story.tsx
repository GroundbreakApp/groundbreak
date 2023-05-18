
import React, { Suspense } from "react";
import StoriesLazy from '@/components/story'

const stories2 = [
  {
    playbackId: "Fo4004ggpHhxpLoBmiJ5302VQAUJF7qTZKzFhwuh9Y9Wk",
    duration: 10 * 1000,
    type: "mux-video",
  },
  {
    url: "https://i.ibb.co/vx62r8X/image-first.png",
    type: "image",
    duration: 6.5 * 1000,
  },
  {
    playbackId: "UB02uduyMugRkGVvNHypNQszUdQ4300Qfw7UnmHgE3dME",
    duration: 5 * 1000,
    type: "mux-video",
  },
  {
    playbackId: "kxPkolm1cFhR02eaDkESrBVxeNSuHdfs9Z1TAiPDTIfo",
    duration: 10 * 1000,
    type: "mux-video",
  },
  {
    url: "https://i.ibb.co/094p0Gh/2nd-image.png",
    type: "image",
    duration: 6.5 * 1000,
  },
  {
    playbackId: "3RVRLNgGMso10291haDQk4AoPyMpiBHfdiFKFGExnv004",
    duration: 10 * 1000,
    type: "mux-video",
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
