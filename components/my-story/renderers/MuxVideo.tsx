import * as React from "react";
import { useEffect } from "react"

import MuxPlayer from '@mux/mux-player-react';
import Spinner from "../components/Spinner";
import { Renderer as IRenderer, Tester } from "./../interfaces";
import WithHeader from "./wrappers/withHeader";
import WithSeeMore from "./wrappers/withSeeMore";
import MuteSVG from "@/components/story/assets/mute.svg";
import { BsFillPlayFill } from "react-icons/bs"
import { useAppSelector } from "@/stores/hook";

export const Renderer: IRenderer = ({
  story,
  action,
  config,
  disabled,
  messageHandler,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const { width, height, loader, storyStyles } = config;
  const [innerStatus, setInnerStatus] = React.useState<"playing" | "paused" | "disabled" | "ended">("paused")
  const currentBlurColor = useAppSelector(state => state.story.currentBlurColor);
  const isPaused = useAppSelector(state => state.story.pause);

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
  useEffect(() => {

    if (disabled === true) {
      setInnerStatus("disabled");
      return;
    }

    if (isPaused) {
      setInnerStatus("paused");
      return;
    }

    if (innerStatus !== "ended") {
      setInnerStatus("playing")
    }


  }, [isPaused, disabled])

  useEffect(() => {
    switch (innerStatus) {
      case "playing":
        playVideo();
        break;
      case "paused":
        stopVideo();
        break;
      case "disabled":
        stopVideo();
        vid.current.currentTime = 0;
        break;
    }

  }, [innerStatus])

  // React.useEffect(() => {
  //   if (disabled) return;
  //   if (vid.current) {
  //     if (isPaused) {
  //       vid.current.pause();
  //     } else {
  //       vid.current.play();
  //     }
  //   }
  // }, [isPaused])
  // React.useEffect(() => {
  //   if (vid.current) {
  //     if (isPaused || disabled) {
  //       vid.current.currentTime = 0;

  //       vid.current.pause();

  //       if (isPaused && !disabled) {
  //         vid.current.play();
  //         vid.current.currentTime = 0;
  //       }
  //     } else {
  //       vid.current.play().catch(() => { });
  //     }
  //   }
  // }, [isPaused, disabled]);

  const onPlaying = () => {
    action("play");
  };

  const onEnded = () => {
    action("next", true);
    setInnerStatus("ended")

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
    action("pause", true);
  }

  const playVideo = () => {
    if (!vid.current) return;

    vid?.current.play()
      .then(() => {
        action("play");
      })
      .catch((e: any) => {
        console.error(e)

        setMuted(true);
        vid?.current.play().finally(() => {
          action("play");
        });
      });
  }
  const stopVideo = () => {
    if (!vid.current) return;

    vid?.current.pause();
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
    const media: any = vid.current.shadowRoot.querySelector("mux-video");
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

  const Blur = () => {
    return (
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5,
        background: currentBlurColor,
        zIndex: 9999,
      }}
      >
      </div>
    )
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
  const Play = () => <button
    className="absolute w-full h-full flex items-center justify-center pointer-events-none z-[99999]
    "
  >
    <BsFillPlayFill className="text-white fill-current w-8 h-8 pointer-events-auto" onClick={playVideo} />
  </button>

  return (
    <WithHeader {...{ story, globalHeader: config.header }}>
      <WithSeeMore {...{ story, action }}>
        <div style={{
          ...styles.videoContainer,
        }
        }>
          {story.overlay && <story.overlay></story.overlay>}
          {muted && <UnMute />}
          {innerStatus !== "disabled" && innerStatus === "paused" && <Play />}
          {widgets.map((widget, index) => {
            const Render: React.ElementType = widget.render
            return (<React.Fragment key={index}>
              {widget.isVisible && <Render />}
            </React.Fragment>
            )
          }
          )}
          {disabled && <Blur />}
          <MuxPlayer
            ref={vid}
            playbackId={story.playbackId}
            style={{
              height: "100%"
            }}
            // widgets={widgetsJSON}
            muted={muted}
            onPlaying={() => {
              onPlaying();
            }}
            onPause={() => {
              console.log("on pause called");
              if (disabled) return;
              onPause()
            }}
            onEnded={() => {
              console.log("on ended called");
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
                width: "100%",
                height: "95%",
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
    width: "100%"
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
