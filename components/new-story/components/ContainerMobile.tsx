import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { useRef, useEffect, Fragment, useState, ReactElement } from "react";
import { nextSlide, prevSlide, setCurrentBlurColor, setCurrentId, setLoading, setMuted, setPause } from "../slices/story.slice";
import { BsFillPlayFill } from "react-icons/bs";
import clsx from "clsx";
import MuxPlayer from "@mux/mux-player-react";
import ProgressArray from "./ProgressArray";
import MuteSVG from "@/components/story/assets/mute.svg";
import { Logo } from "@/components/logo";
import { WatchAgain } from "./WatchAgain";

export default function ContainerMobile() {
  const stories = useAppSelector(state => state.newStory.stories);
  const playbackId = useAppSelector(state => state.newStory.playbackId);
  const currentId = useAppSelector(state => state.newStory.currentId);
  const muted = useAppSelector(state => state.newStory.muted);
  const pause = useAppSelector(state => state.newStory.pause);
  const [isHideVideoPlayer, setHideVideoPlayer] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState<Array<ReactElement>>([]);
  const [isEnd, setEnd] = useState(false);

  // preload images per slide to improve performance
  useEffect(() => {
    const imagesDOM = stories.map((story, index) => <img className="h-full rounded-3xl object-cover" alt="" key={index} src={`https://image.mux.com/${playbackId}/thumbnail.png?time=${story.startTime / 1000}`} />)
    setImagesPreloaded(imagesDOM);

  }, [stories])

  const dispatch = useAppDispatch();
  let vid = useRef<any>(null);

  const initWidgetState = stories[currentId]?.widgetAttributes ?
    stories[currentId]?.widgetAttributes?.map((widget) => ({
      ...widget,
      isVisible: false
    }))
    : []

  const [widgets, setWidgets] = useState(initWidgetState);

  useEffect(() => {

    if (!vid.current) return;
    // reset time
    console.log("reset time called", stories[currentId]?.startTime / 1000);

    vid.current.currentTime = stories[currentId]?.startTime / 1000;
    setCurrentTime(vid.current.currentTime)

    dispatch(setCurrentBlurColor(stories[currentId].overlayColor))
  }, [currentId])

  if (playbackId === null) {
    return <> Loading ...</>
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

  function unMute() {
    dispatch(setMuted(false));
  }

  const stopVideo = () => {
    if (!vid.current) return;

    vid?.current.pause();
  }

  const onTimeUpdate = () => {
    const media: any = vid.current.shadowRoot.querySelector("mux-video");
    const currentTime = media?.currentTime ?? 0;

    const newWidgets = stories[currentId].widgetAttributes?.map(widget => {
      const isVisible = widget.spawnTime <= currentTime * 1000 &&
        widget.spawnTime + widget.duration >= currentTime * 1000 ? true : false;
      return {
        ...widget,
        isVisible
      }
    })
    setWidgets(newWidgets ?? []);
  }

  const mouseUp =
    (type: string) => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      type === "next" ? dispatch(nextSlide()) : dispatch(prevSlide());
    };

  /**
   * Mobile Play button
   */
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
  function watchAgain() {
    // window.location.reload();
    setEnd(false);
    dispatch(setCurrentId(0));

    if (!vid.current) return;

    vid.current.currentTime = 0.1;
    vid.current.media.load();
    vid.current.play();
  }


  /** Mute button */
  const UnMute = () => <button
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
      zIndex: 999999,
      cursor: "pointer",
      left: "10px",
      top: "30px",
    }}>
    <MuteSVG />
  </button>


  return <div className="w-full h-full flex items-center justify-center flex-col relative p-4 overflow-hidden" style={{
    height: "100svh",
    width: '100svw',
    zIndex: 999
  }}>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
    <ProgressArray />
    <div className="relative w-full h-full">
      {/** Swiper slide with post images */}
      {pause && <div className="absolute w-full h-full rounded-3xl overflow-hidden">
        {currentTime === stories[currentId].startTime ? imagesPreloaded[currentId] :
          <img className="h-full rounded-3xl object-cover" alt="" src={`https://image.mux.com/${playbackId}/thumbnail.png?time=${currentTime}`} />}
      </div>}
      {/** Replay button */}
      {isEnd && <>
        <div className="absolute left-0 right-0 top-0 bottom-0 m-auto z-[100000] flex items-center justify-center pointer-events-none">
          <WatchAgain onClick={watchAgain} />
        </div>
      </>
      }
      {/** Widgets Overlay */}
      <div className="absolute w-full h-full top-0 z-[999999] pointer-events-none">
        {
          widgets?.map((widget, index) => {
            const widgetData = widget.widget

            return (<Fragment key={index}>
              {widget.isVisible && <div
                onFocus={() => {
                  if (widget.isPause === true) {
                    console.log("OnFocus on Pause called");
                    stopVideo();
                  }
                }}
                onClick={() => {
                  if (widget.isPause === true) {
                    console.log("onClick on Pause called");
                    stopVideo();
                  }
                }}
                dangerouslySetInnerHTML={{ __html: widgetData }}
              />}
            </Fragment>
            )
          })
        }
      </div>
      {muted && <UnMute />}
      {/** Mux Video player */}
      <div className="absolute left-0 right-0 top-0 bottom-0 m-auto h-full flex rounded-3xl overflow-hidden w-full sm:w-[300px] sm:h-[532px] z-[9999]" style={{
        opacity: pause ? 0 : 1,
      }}>
        <MuxPlayer
          playbackId={playbackId}
          muted={muted}
          ref={vid}
          onPlaying={() => {
            console.log("onPlaying");
            dispatch(setPause(false));
            dispatch(setLoading(false))
          }}
          onEnded={() => {
            console.log("onEnded");
            setEnd(true);
            dispatch(setPause(true))
          }}
          onPause={() => {
            console.log("onPause");
            dispatch(setPause(true))
          }}
          onLoadStart={() => { console.log("loading started"); dispatch(setLoading(true)) }}
          onLoadedData={() => { console.log("loading ended"); dispatch(setLoading(false)) }}
          onStalled={() => { console.log("stalled"); }}
          onWaiting={() => { console.log("onWaiting"); dispatch(setLoading(true)) }}
          onTimeUpdate={onTimeUpdate}
          preload="metadata"
        />
      </div>
    </div>
    {/** Mobile slide navigation area */}
    <div
      className=

      "flex pointer-events-none absolute h-full w-full justify-between items-center z-[9999]"
    >
      <div
        className="pointer-events-auto"
        style={{ width: "40%", zIndex: 999, height: "45%", alignSelf: "center" }}
        // onTouchStart={debouncePause}
        onTouchEnd={mouseUp("previous")}
        // onMouseDown={debouncePause}
        onMouseUp={mouseUp("previous")}
      />
      <div
        className="pointer-events-auto"
        style={{ width: "15%", zIndex: 999, height: "45%", alignSelf: "center" }}
        onClick={() => stopVideo()}
      >
      </div>
      <div
        className="pointer-events-auto"
        style={{ width: "40%", zIndex: 999, height: "45%", alignSelf: "center" }}
        // onTouchStart={debouncePause}
        onTouchEnd={mouseUp("next")}
        // onMouseDown={debouncePause}
        onMouseUp={mouseUp("next")}
      />
    </div>
    {/** Mobile play button */}
    {pause && !isEnd && <Play />}
    <Logo />
  </div>
}