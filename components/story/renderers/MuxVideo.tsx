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
  disabled,
  messageHandler,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [showOverlay, setShowOverlay] = React.useState(story.isFirstSlide);
  const { width, height, loader, storyStyles } = config;

  const initWidgetState = story.widgets ?
    story.widgets.map((widget) => ({
      ...widget,
      isVisible: false
    }))
    : []

  const [widgets, setWidgets] = React.useState(initWidgetState);

  let computedStyles = {
    ...styles.storyContent,
    ...(storyStyles || {}),
  };

  let vid = React.useRef<any>(null);

  React.useEffect(() => {
    if (vid.current) {
      if (isPaused || disabled) {
        vid.current.pause();

        if (isPaused && !disabled) {
          vid.current.play();
        }
      } else {
        vid.current.play().catch(() => { });
      }
    }
  }, [isPaused, disabled]);

  const onWaiting = () => {
    action("pause", true);
  };

  const onPlaying = () => {
    action("play", true);
  };

  const onEnded = () => {
    action("next", true);
    console.log('onEnded called')

    // hide widgets
    const newWidgets: any = story?.widgets?.map(widget => (
      {
        ...widget,
        isVisible: false
      }
    ))
    setWidgets(newWidgets ?? []);
  }

  const onPause = () => {
    console.log("Video is paused")
    action("pause", true);
  }

  const playVideo = () => {
    console.log(disabled);
    if (disabled) return;

    const vid: any = document.querySelector("mux-player");
    vid?.play()
      .then(() => {
        action("play");
        console.log("Video started successfully")
      })
      .catch((e: any) => {
        console.error(e)

        setMuted(true);
        vid?.play().finally(() => {
          action("play");
        });
      });
  }

  const videoLoaded = () => {
    messageHandler("UPDATE_VIDEO_DURATION", { duration: story.duration });
    setLoaded(true);

    // this story slide is disabled
    if (disabled) return;

    if (!story.isAutoplay) return;


    /// if autoplay 
    playVideo()
  };

  function unMute() {
    setMuted(false);
  }


  const onTimeUpdate = () => {
    const vid = document.querySelector("mux-player");
    const media: any = vid?.shadowRoot?.querySelector("mux-video");
    const currentTime = media?.currentTime ?? 0;

    const newWidgets = story?.widgets?.map(widget => {
      const isVisible = widget.spawnTime <= currentTime * 1000 &&
        widget.spawnTime + widget.duration >= currentTime * 1000 ? true : false;
      return {
        ...widget,
        isVisible
      }
    })
    setWidgets(newWidgets ?? []);
  }


  const UnMute = () => <div
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
          story.isAutoplay = true;
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
        <div style={{
          ...styles.videoContainer,
          visibility: disabled ? 'hidden' : 'visible'
        }
        }>
          {story.overlay && <story.overlay></story.overlay>}
          {muted && <UnMute />}
          {widgets.map((widget, index) => {
            const Render: React.ElementType = widget.render
            return (<React.Fragment key={index}>
              {widget.isVisible && <Render />}
            </React.Fragment>
            )
          }
          )}
          {showOverlay && !disabled && <FirstSlideOverlay />}
          <MuxPlayer
            ref={vid}
            playbackId={story.playbackId}
            style={{
              height: "100%"
            }}
            // widgets={widgetsJSON}
            aspectRatio={9 / 16}
            muted={muted}
            onPlaying={() => {
              if (disabled) return;
              onPlaying();
            }}
            onWaiting={() => {
              if (disabled) return;

              onWaiting()
            }}
            onPause={() => {
              if (disabled) return;

              onPause()
            }}
            onEnded={() => {
              if (disabled) return;

              onEnded()
            }}
            onLoadedData={() => {
              if (disabled) return;

              videoLoaded();
            }}
            onError={(e: any) => { console.log("ERROR", e) }}
            autoPlay={story.isAutoplay && !disabled}
            onTimeUpdate={onTimeUpdate}
            preload="auto"
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
