import React, { useContext, useState, useRef, useEffect } from "react";
import clsx from "clsx"
import GlobalContext from "./../context/Global";
import StoriesContext from "./../context/Stories";
import ProgressContext from "./../context/Progress";
import Story from "./Story";
import ProgressArray from "./ProgressArray";
import {
  GlobalCtx,
  StoriesContext as StoriesContextInterface,
} from "./../interfaces";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useIsMounted from "./../util/use-is-mounted";
import { register } from 'swiper/element/bundle';
import { BsVolumeMute, BsFillPlayFill, BsFillPauseFill, BsFillVolumeUpFill } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { setCurrentBlur, setCurrentIndex, setPause, togglePause as togglePauseAction, nextSlide, prevSlide, setMuted } from "../slices/story.slice";
import useMobileDetect from "@/hooks/useMobileDetect";

register();

export default function Container() {

  const swiperElRef = useRef<any>(null);

  const currentId = useAppSelector((state) => state.story.currentIndex);
  const isPause = useAppSelector(state => state.story.pause);

  const [videoDuration, setVideoDuration] = useState<number>(0);
  const isMounted = useIsMounted();

  let mousedownId = useRef<any>();

  const {
    width,
    height,
    loop,
    keyboardNavigation,
    preventDefault,
    storyContainerStyles = {},
    onAllStoriesEnd,
  } = useContext<GlobalCtx>(GlobalContext);
  const { stories } = useContext<StoriesContextInterface>(StoriesContext);
  const { pause } = useAppSelector(state => state.story);
  const currentIndex = useAppSelector(state => state.story.currentIndex);
  const [isMobile, setIsMobile] = useState(false)
  const muted = useAppSelector(state => state.story.muted);
  const activeVideoRef = useAppSelector(state => state.story.activeVideoRef);
  const isLoading = useAppSelector(state => state.story.loading);
  // const isLoading = false;

  const dispatch = useAppDispatch();

  let mobileDetect = useMobileDetect();

  useEffect(() => {
    setIsMobile(mobileDetect.isMobile())
  }, [])

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef?.current?.addEventListener('progress', (e: any) => {
      const [swiper, progress] = e.detail;
    });

    swiperElRef?.current?.addEventListener('slidechange', (e: any) => {
      dispatch(setCurrentIndex(e.detail[0].activeIndex));
    });
  }, []);

  useEffect(() => {
    swiperElRef?.current?.swiper.slideTo(currentIndex);
    dispatch(setCurrentBlur(stories[currentIndex].overlayColor))
  }, [currentIndex])

  useEffect(() => {
    window.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
  }, [])


  const toggleState = (action: string) => {
    dispatch(setPause(action === "pause"))
  };


  const getVideoDuration = (duration: number) => {
    setVideoDuration(duration * 1000);
  };

  const togglePause = () => {

    // current state is paused and start playing video
    if (pause === true) {
      if (activeVideoRef) {
        activeVideoRef.play();
      }
    }
    else {
      dispatch(setPause(true));
    }

  }
  // const Play = () => <button
  //   className={clsx(
  //     "absolute w-full h-full flex items-center justify-center pointer-events-none z-[99999]",
  //   )}
  //   disabled={isLoading}
  // >
  //   {isLoading ?
  //     <AiOutlineLoading3Quarters className="text-[#CBFD55] fill-current w-8 h-8 pointer-events-auto animate-spin" />
  //     : <a className="rounded-2xl font-sans text-xl font-semibold flex items-center justify-center text-black pointer-events-auto bg-[#CBFD55] py-2 px-4 font" onClick={() => {
  //       dispatch(setPause(false))
  //     }}>
  //       <BsFillPlayFill className="fill-current w-8 h-8 mr-2" />
  //       Play
  //     </a>
  //   }

  // </button>

  const mouseUp =
    (type: string) => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      mousedownId.current && clearTimeout(mousedownId.current);
      // if (pause) {
      //   toggleState("play");
      // } else {
      type === "next" ? dispatch(nextSlide()) : dispatch(prevSlide());
      // }
    };


  //
  // for iphone
  //
  if (global.window) {
    global.window.document.body.style.background = stories[currentId].overlayColor ?? "transparent"
    global.window.document.body.style.backgroundColor = stories[currentId].overlayColor ?? "transparent"
  }

  return (
    <div
      className={clsx({
        "pt-14": !isMobile
      })}
      style={{
        ...styles.container,
        ...storyContainerStyles,
        ...{ width, height },
      }}
    >
      <ProgressContext.Provider
        value={{
          videoDuration: videoDuration,
          onNext: () => { }
        }}
      >
        <ProgressArray />
      </ProgressContext.Provider>
      <div
        className="absolute left-0 top-0 pointer-events-none w-full h-full bg-opacity-30 "
        style={{
          background: stories[currentId].overlayColor ?? "transparent"
        }}
      >
      </div>
      <div className={clsx("relative w-full h-full p-3 sm:p-0 rounded-xl overflow-hidden ")}>
        <div className={
          clsx(
            "pointer-events-none w-full justify-between items-center absolute z-[9999] h-full flex",
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
        <swiper-container
          ref={swiperElRef}
          slides-per-view={isMobile ? 1 : "auto"}
          centered-slides={true}
          space-between={isMobile ? 0 : "30"}
          speed={isMobile ? 1 : 400}
        >
          {
            stories.map((story, index) => {

              return (
                <React.Fragment
                  key={index}
                >
                  <swiper-slide
                  >
                    <div style={{
                      transform: "scale(1)",
                      position: "relative"
                    }}>
                      <div
                        className={
                          clsx(
                            {
                              "hidden": !isMobile,
                              "flex": isMobile,
                              "pointer-events-none": true
                            }
                          )
                        }
                        style={styles.overlay}>
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
                          style={{ width: "40%", zIndex: 999, height: "45%", alignSelf: "center" }}
                          // onTouchStart={debouncePause}
                          onTouchEnd={mouseUp("next")}
                          // onMouseDown={debouncePause}
                          onMouseUp={mouseUp("next")}
                        />
                      </div>
                      <Story
                        action={toggleState}
                        disabled={index !== currentId}
                        story={story}
                        getVideoDuration={getVideoDuration}
                        isLastSlide={index === stories.length - 1}
                      />
                    </div>
                  </swiper-slide>
                </React.Fragment>
              )
            })
          }
        </swiper-container>
      </div>
      <div className={
        clsx(
          "relative flex w-full items-center justify-center pb-12",
          (isMobile || isLoading) && "hidden",
          !isMobile && "flex",
        )
      }>
        <div className="self-center">
          <button
            className="bg-[#CBFD55] mr-5 px-4 rounded-xl"
            onClick={togglePause}
            disabled={isLoading}
          >

            {pause ? <BsFillPlayFill className="text-black fill-current w-8 h-8" /> :
              <BsFillPauseFill className="text-black fill-current w-8 h-8" />
            }
          </button>
          <button className="bg-[#CBFD55]  px-4 rounded-xl"
            onClick={() => {
              dispatch(setMuted(!muted))
            }}
          >
            {muted && <BsVolumeMute className="text-black fill-current w-8 h-8" />}
            {!muted && <BsFillVolumeUpFill className="text-black fill-current w-8 h-8" />}
          </button>
        </div>
      </div>
    </div >
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    background: "#434458",
    position: "relative" as const,
    WebkitUserSelect: 'none' as const,
  },
  overlay: {
    position: "absolute" as const,
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1006,
  },
};
