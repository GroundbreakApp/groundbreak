import { useAppDispatch, useAppSelector } from "@/stores/hook"
import { useState, useEffect, Fragment, useRef } from "react";
import useMobileDetect from "@/hooks/useMobileDetect";
import ProgressArray from "./ProgressArray";
import { nextSlide, prevSlide, setCurrentBlurColor, setCurrentId, setLoading, setMuted, setPause } from "../slices/story.slice";
import { BsVolumeMute, BsFillPlayFill, BsFillPauseFill, BsFillVolumeUpFill } from "react-icons/bs"
import clsx from "clsx";
import MuxPlayer from '@mux/mux-player-react';
import MuteSVG from "@/components/story/assets/mute.svg";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Logo } from "@/components/logo";
import { CgRedo } from "react-icons/cg";


export default function Container() {
  const stories = useAppSelector(state => state.newStory.stories);
  const playbackId = useAppSelector(state => state.newStory.playbackId);
  const currentId = useAppSelector(state => state.newStory.currentId);
  const muted = useAppSelector(state => state.newStory.muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [isEnd, setEnd] = useState(false);
  const pause = useAppSelector(state => state.newStory.pause)

  const [isHideVideoPlayer, setHideVideoPlayer] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const swiperElRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  let vid = useRef<any>(null);

  const initWidgetState = stories[currentId]?.widgetAttributes ?
    stories[currentId]?.widgetAttributes?.map((widget) => ({
      ...widget,
      isVisible: false
    }))
    : []

  const [widgets, setWidgets] = useState(initWidgetState);


  let mobileDetect = useMobileDetect();

  useEffect(() => {
    setIsMobile(mobileDetect.isMobile())
  }, [])

  useEffect(() => {

    if (pause) {
      setCurrentTime(vid?.current?.currentTime);
    }
  }, [pause])

  useEffect(() => {
    setTimeout(() => {
      swiperElRef?.current?.addEventListener('progress', (e: any) => {
        const [swiper, progress] = e.detail;
      });

      swiperElRef?.current?.addEventListener('slidechange', (e: any) => {
        console.log("slide change called");

        dispatch(setCurrentId(e.detail[0].activeIndex));
      });

      swiperElRef?.current?.addEventListener('touchstart', (e: any) => {

        // if mobile device, no need to hide video player
        if (isMobile) return;
        setHideVideoPlayer(true)
      });

      swiperElRef?.current?.addEventListener('transitionstart', (e: any) => {
        // if mobile device, no need to hide video player
        if (isMobile) return;

        setHideVideoPlayer(true)
      });

      swiperElRef?.current?.addEventListener('transitionend', (e: any) => {
        // if mobile device, no need to hide video player
        if (isMobile) return;

        setHideVideoPlayer(false)
      });
    }, 100)
    // listen for Swiper events using addEventListener
  }, []);

  useEffect(() => {

    if (swiperElRef?.current?.swiper.activeIndex !== currentId) {
      swiperElRef?.current?.swiper.slideTo(currentId);
    }

    if (!vid.current) return;
    // reset time

    vid.current.currentTime = stories[currentId]?.startTime / 1000;
    setCurrentTime(vid.current.currentTime)

    console.log("setCurrentBlurColor", stories[currentId].overlayColor)
    dispatch(setCurrentBlurColor(stories[currentId].overlayColor))
  }, [currentId, stories])

  useEffect(() => {
    const isClient = typeof window !== "undefined" && window.document;
    if (
      isClient
    ) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  //
  // Events
  //
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      dispatch(prevSlide());
    } else if (e.key === "ArrowRight") {
      dispatch(nextSlide());
    }
  };

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

  const togglePause = () => {

    if (!vid.current) return;

    if (pause === true) {
      vid.current.play()
    } else {
      vid.current.pause()
    }

  }

  function unMute() {
    dispatch(setMuted(false));
  }

  function watchAgain() {
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

  return <div className="w-full h-full flex items-center justify-center flex-col relative">
    <Logo />
    <ProgressArray />
    {/**  Left and Right arrow I con*/}
    <div className={
      clsx(
        "pointer-events-none w-full justify-between items-center absolute z-[99999] h-full flex",
        { "hidden": isMobile }
      )
    }>
      <button className={"px-4 py-2 ml-8 rounded-xl bg-opacity-50 bg-black text-white pointer-events-auto"}
        onClick={() => { dispatch(prevSlide()) }}
      >
        <SlArrowLeft />
      </button>
      <button className="px-4 py-2 mr-8 rounded-xl bg-opacity-50 bg-black text-white pointer-events-auto"
        onClick={() => { dispatch(nextSlide()) }}
      >
        <SlArrowRight />
      </button>
    </div>

    {/** Mux player container */}
    <div className="flex items-center justify-center relative w-full h-full z-[9999]">
      {/** Widgets Overlay */}
      <div className="absolute w-[300px] h-[532px] z-[99999]">
        {
          widgets?.map((widget, index) => {
            const widgetData = widget.widget
            return (<Fragment key={index}>
              {widget.isVisible && <div className="h-full"
                onFocus={() => {
                  if (widget.isPause === true) {
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

      {/** Swiper slide with post images */}
      <swiper-container
        ref={swiperElRef}
        slides-per-view={isMobile ? 1 : "auto"}
        centered-slides={true}
        space-between={isMobile ? 0 : "30"}
        speed={isMobile ? 200 : 400}
        onSwiper={() => { console.log("onSwiper called") }}
      >
        {
          stories.map((story, index) => (
            <Fragment key={index}>
              <swiper-slide>
                <img src={`https://image.mux.com/${playbackId}/thumbnail.png?time=${stories[index].startTime / 1000}`} style={{
                  filter: "drop-shadow(0 0px 2px rgba(0, 0, 0, 0.5))",
                }} />
              </swiper-slide>
            </Fragment>
          ))
        }
      </swiper-container>

      {/** Mux Video player */}
      <div className="rounded-3xl overflow-hidden absolute left-0 right-0 top-0 bottom-0 m-auto w-full h-full sm:w-[300px] sm:h-[532px] z-[9999] overflow-hidden" style={{
        opacity: isHideVideoPlayer || (pause && currentTime * 1000 === stories[currentId].startTime) ? 0 : 1,
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
            dispatch(setPause(true))
            setEnd(true);
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

    {/** Desktop play, mute button */}
    <div className={
      clsx(
        "relative flex w-full items-center justify-center pb-12 z-[999]",
        (isMobile) && "hidden",
        !isMobile && "flex",
      )
    }>
      <div className="self-center">
        <button
          className="bg-[#000] mr-5 px-4 rounded-xl"
          onClick={togglePause}
        >

          {pause ? <BsFillPlayFill className="text-white fill-current w-8 h-8" /> :
            <BsFillPauseFill className="text-white fill-current w-8 h-8" />
          }
        </button>
        <button className="bg-[#000]  mr-5 px-4 rounded-xl"
          onClick={() => {
            dispatch(setMuted(!muted))
          }}
        >
          {muted && <BsVolumeMute className="text-white fill-current w-8 h-8" />}
          {!muted && <BsFillVolumeUpFill className="text-white fill-current w-8 h-8" />}
        </button>
        <button className="bg-[#000]  px-4 rounded-xl" onClick={watchAgain}>
          <CgRedo className="text-white fill-current w-8 h-8" />
        </button>
      </div>
    </div>
  </div >
}