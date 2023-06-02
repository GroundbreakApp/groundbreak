import * as React from "react";
import { useEffect } from "react"

import MuxPlayer from '@mux/mux-player-react';
import Spinner from "../components/Spinner";
import { Renderer as IRenderer, Tester } from "./../interfaces";
import WithHeader from "./wrappers/withHeader";
import WithSeeMore from "./wrappers/withSeeMore";
import MuteSVG from "@/components/story/assets/mute.svg";
import { BsFillPlayFill } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { setActiveVideoRef, setLoading, setMuted } from "../slices/story.slice"
import clsx from "clsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export const Renderer: IRenderer = ({
  story,
  action,
  config,
  disabled,
  messageHandler,
}) => {
  const [loaded, setLoaded] = React.useState(false);

  const { width, height, loader, storyStyles } = config;
  const [innerStatus, setInnerStatus] = React.useState<"playing" | "paused" | "disabled" | "ended">("paused")
  const currentBlurColor = useAppSelector(state => state.story.currentBlurColor);
  const isPaused = useAppSelector(state => state.story.pause);
  const muted = useAppSelector(state => state.story.muted);
  const dispatch = useAppDispatch();

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

    if (disabled !== true) {
      dispatch(setActiveVideoRef(vid.current));
    }

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
      })
      .catch((e: any) => {
        console.error(e)

        dispatch(setMuted(true));
        vid?.current.play().finally(() => {
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
    dispatch(setLoading(false))

    // this story slide is disabled
    if (innerStatus === "disabled") return;

    if (!story.isAutoplay) return;


    /// if autoplay 
    playVideo()
  };

  function unMute() {
    dispatch(setMuted(false));
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
      alignItems: "center",
      justifyContent: "center",
      background: "#CBFD55",
      borderRadius: "15px",
      padding: "10px 25px",
      position: "absolute",
      color: "black",
      zIndex: 99999,
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
  // const Play = () => <button
  //   className="absolute w-full h-full flex items-center justify-center pointer-events-none z-[99999]
  //   "
  // >
  //   <BsFillPlayFill className="text-white fill-current w-8 h-8 pointer-events-auto" onClick={playVideo} />
  // </button>
  const Play = () => <button
    className={clsx(
      "absolute w-full h-full flex items-center justify-center pointer-events-none z-[99999]",
    )}
  >
    <a className="rounded-2xl font-sans text-xl font-semibold flex items-center justify-center text-black pointer-events-auto bg-[#CBFD55] py-2 px-4 font" onClick={playVideo}>
      <BsFillPlayFill className="fill-current w-8 h-8 mr-2" />
      Play
    </a>

  </button>

  return (
    <WithHeader {...{ story, globalHeader: config.header }}>
      <WithSeeMore {...{ story, action }}>
        <div style={{
          ...styles.videoContainer,
        }
        }>
          {story.overlay && <story.overlay></story.overlay>}
          {!disabled && muted && <UnMute />}
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
            onCanPlay={() => {
              console.log("onCanPlay")
              setLoaded(true);
              dispatch(setLoading(false))
            }}
            onLoadStart={() => {
              dispatch(setLoading(true));
            }}
            onPause={() => {
              if (disabled) return;
              console.log("on pause called 1");
              onPause()
              console.log("on pause called 2");
            }}
            onEnded={() => {
              console.log("on ended called");
              if (disabled) return;

              onEnded()
            }}
            onLoadedData={() => {
              console.log("Video loaded called A");

              if (disabled) return;
              console.log("Video loaded called B");
              videoLoaded();
            }}
            onError={(e: any) => { console.log("ERROR", e) }}
            autoPlay={story.isAutoplay && !disabled}
            onTimeUpdate={onTimeUpdate}
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
