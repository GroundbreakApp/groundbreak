
import React, { Suspense } from "react";
import MyStory from '@/components/my-story'
import LinkSVG from "@/assets/link.svg";
const stories2 = [
  {
    playbackId: "7GTNWaH02xd6HXl9jl602bHkOkLVQUT8VWjnJmVfn00bFc",
    duration: 4.02 * 1000,
    type: "mux-video",
    isAutoplay: false,
    overlayColor: "#434458"
  },
  {
    playbackId: "KzQwJ4SJDpw01gRqM46dOkXtEIfHsjjyx42Bxirm01aGo", // groundbreak is short form video
    type: "mux-video",
    duration: 10.8 * 1000,
    isAutoplay: true,
    overlayColor: "#CBFD55"
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
