
import MuxPlayer from '@mux/mux-player-react';
import * as React from "react";
const MuxTest = () => {
  let vid = React.useRef<any>(null);

  const playVideo = () => {
    if (!vid.current) return;

    vid?.current.play()
      .then(() => {
      })
      .catch((e: any) => {
        //
        // if e.code === 20 means play() interrupted by pause action
        //
        console.log("e.code", e.code)
        if (e.code !== 20 && e.code !== 0) {
        }
        vid?.current.play().finally(() => {
        });
      });
  }
  return <div className="w-60 flex items-center justify-center flex-col">
    <button onClick={playVideo}>
      Play button
    </button>
    <MuxPlayer
      ref={vid}
      playbackId="Fo4004ggpHhxpLoBmiJ5302VQAUJF7qTZKzFhwuh9Y9Wk"
      style={{
        height: "100vh"
      }}
      playsInline={true}
      preload="auto"
      streamType="on-demand"
    />
  </div>
}

export default MuxTest;