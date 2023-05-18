import * as React from "react";
import MuxPlayer from '@groundbreak/groundbreak-player-react';
// import MuxPlayer from '../../node_modules/@groundbreak/groundbreak-player-react/src/index'
import Spinner from "../components/Spinner";
import { Renderer as IRenderer, Tester } from "./../interfaces";
import WithHeader from "./wrappers/withHeader";
import WithSeeMore from "./wrappers/withSeeMore";


export const Renderer: IRenderer = ({
  story,
  action,
  isPaused,
  config,
  messageHandler,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const { width, height, loader, storyStyles } = config;

  const widgetsJSON = JSON.stringify(
    [
      {
        type: 'TEXT',
        label: `Hey, Michael, We're so excited to have`,
        spawnTime: 1000,
        duration: 4000,
        style: {
          position: 'absolute',
          left: '10%',
          top: '30%',
          PointerEvents: 'auto'
        }
      },
      {
        type: 'LINK',
        label: `Tap to move to google.com`,
        href: "https://www.google.com",
        spawnTime: 2000,
        duration: 4000,
        style: {
          position: 'absolute',
          left: '40%',
          top: '60%',
          color: '#FF00FF',
          PointerEvents: 'auto'
        }
      }
    ]
  );

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

  const videoLoaded = () => {
    messageHandler("UPDATE_VIDEO_DURATION", { duration: story.duration });
    setLoaded(true);
    vid.current
      .play()
      .then(() => {
        action("play");
      })
      .catch(() => {
        setMuted(true);
        vid.current.play().finally(() => {
          action("play");
        });
      });
  };

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
          <MuxPlayer
            ref={vid}
            playbackId={story.playbackId}
            style={{
              height: "100%"
            }}
            widgets={widgetsJSON}
            aspectRatio={9 / 16}
            autoPlay={true}
            onPlaying={onPlaying}
            onWaiting={onWaiting}
            onLoadedData={videoLoaded}
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
