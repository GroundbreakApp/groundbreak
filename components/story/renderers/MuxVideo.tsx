import * as React from "react";
import MuxPlayer from '@groundbreak/groundbreak-player-react';
// import MuxPlayer from '../../node_modules/@groundbreak/groundbreak-player-react/src/index'
import Spinner from "../components/Spinner";
import { Renderer as IRenderer, Tester } from "./../interfaces";
import WithHeader from "./wrappers/withHeader";
import WithSeeMore from "./wrappers/withSeeMore";
import MuteSVG from "@/components/story/assets/mute.svg";

export const Renderer: IRenderer = ({
  story,
  action,
  isPaused,
  config,
  messageHandler,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [showOverlay, setShowOverlay] = React.useState(story.isFirstSlide);
  const { width, height, loader, storyStyles } = config;

  // const widgetsJSON = JSON.stringify(
  //   [
  //     {
  //       type: 'TEXT',
  //       label: `Hey, Michael, We're so excited to have`,
  //       spawnTime: 1000,
  //       duration: 4000,
  //       style: {
  //         position: 'absolute',
  //         left: '10%',
  //         top: '30%',
  //         PointerEvents: 'auto'
  //       }
  //     },
  //     {
  //       type: 'LINK',
  //       label: `Tap to move to google.com`,
  //       href: "https://www.google.com",
  //       spawnTime: 2000,
  //       duration: 4000,
  //       style: {
  //         position: 'absolute',
  //         left: '40%',
  //         top: '60%',
  //         color: '#FF00FF',
  //         PointerEvents: 'auto'
  //       }
  //     }
  //   ]
  // );

  let computedStyles = {
    ...styles.storyContent,
    ...(storyStyles || {}),
  };

  let vid = React.useRef<any>(null);

  React.useEffect(() => {
    if (vid.current) {
      if (isPaused) {
        vid.current.pause();
      } else {
        vid.current.play().catch(() => { });
      }
    }
  }, [isPaused]);

  const onWaiting = () => {
    action("pause", true);
  };

  const onPlaying = () => {
    action("play", true);
  };

  const onPause = () => {
    action("pause", true);
  }

  const playVideo = () => {
    console.log("playing video");
    const vid: any = document.querySelector("mux-player");

    vid?.play()
      .then(() => {
        action("play");
      })
      .catch(() => {
        setMuted(true);
        vid?.play().finally(() => {
          action("play");
        });
      });
  }

  const videoLoaded = () => {
    messageHandler("UPDATE_VIDEO_DURATION", { duration: story.duration });
    setLoaded(true);

    // if (!story.isAutoplay) return;

    /// if autoplay 
    playVideo()
  };

  function unMute() {
    setMuted(false);
  }

  const UnMute = () => <>
    <div
      onClick={unMute}
      style={{
        display: "flex",
        background: "white",
        borderRadius: "15px",
        padding: "10px 25px",
        position: "absolute",
        color: "black",
        zIndex: 9999,
        cursor: "pointer",
        left: "10px",
        top: "30px",
      }}>
      <MuteSVG />
      <span style={{
        marginLeft: "5px",
        fontSize: "19px"
      }}>Unmute</span>
    </div>
  </>

  const FirstSlideOverlay = () => <>
    <div
      className="absolute left-0 bottom-0 flex flex-col p-8 z-[9999] bg-black bg-opacity-80 w-full gap-5 items-center"
    >
      <span
        className="text-white "
      >
        You received a Groundbreak from High Alpha
      </span>
      <button
        className="w-full bg-[#c1ff72] text-black p-2"
        onClick={() => {
          playVideo();
          setShowOverlay(false)
        }}
      >
        Play Now
      </button>
      <a href="https://groundbreak.app" target="_blank" className="p-2">
        Learn More
      </a>
    </div>
  </>
  return (
    <WithHeader {...{ story, globalHeader: config.header }}>
      <WithSeeMore {...{ story, action }}>
        <div style={styles.videoContainer}>
          {/* <video
            ref={vid}
            style={computedStyles}
            src={story.url}
            controls={false}
            onLoadedData={videoLoaded}
            playsInline
            onWaiting={onWaiting}
            onPlaying={onPlaying}
            muted={muted}
            autoPlay
            webkit-playsinline="true"
          /> */}
          {story.overlay && <story.overlay></story.overlay>}
          {muted && <UnMute />}
          {showOverlay && <FirstSlideOverlay />}
          <MuxPlayer
            ref={vid}
            playbackId={story.playbackId}
            style={{
              height: "100%"
            }}
            // widgets={widgetsJSON}
            aspectRatio={9 / 16}
            muted={muted}
            onPlaying={onPlaying}
            onWaiting={onWaiting}
            onPause={onPause}
            onLoadedData={videoLoaded}
            autoPlay={story.isAutoplay}

          />
          {!loaded && (
            <div
              style={{
                width: width,
                height: height,
                position: "absolute",
                left: 0,
                top: 0,
                background: "rgba(0, 0, 0, 0.9)",
                zIndex: 9,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ccc",
              }}
            >
              {loader || <Spinner />}
            </div>
          )}
        </div>
      </WithSeeMore>
    </WithHeader>
  );
};

const styles = {
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
  videoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
};

export const tester: Tester = (story) => {
  return {
    condition: story.type === "mux-video",
    priority: 2,
  };
};

export default {
  renderer: Renderer,
  tester,
};
