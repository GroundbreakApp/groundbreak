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
import useIsMounted from "./../util/use-is-mounted";
import { register } from 'swiper/element/bundle';
import { BsVolumeMute, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { setCurrentBlur, setCurrentIndex, setPause, togglePause as togglePauseAction, nextSlide, prevSlide } from "../slices/story.slice";
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

  const toggleState = (action: string) => {
    dispatch(setPause(action === "pause"))
  };


  const getVideoDuration = (duration: number) => {
    setVideoDuration(duration * 1000);
  };

  const togglePause = () => {
    dispatch(togglePauseAction())
  }
  const Play = () => <button
    className="absolute w-full h-full flex items-center justify-center pointer-events-none z-[99999]
    "
  >
    <BsFillPlayFill className="text-white fill-current w-8 h-8 pointer-events-auto" onClick={() => {
      dispatch(setPause(false))
    }} />
  </button>

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
        <swiper-container
          ref={swiperElRef}
          slides-per-view={isMobile ? 1 : "auto"}
          centered-slides={true}
          space-between={isMobile ? 0 : "30"}
        >
          {
            stories.map((story, index) => {

              return (
                <React.Fragment
                  key={index}
                >
                  <swiper-slide
                  >
                    <div>
                      <Story
                        action={toggleState}
                        disabled={index !== currentId}
                        story={story}
                        getVideoDuration={getVideoDuration}
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
          isMobile && "hidden",
          !isMobile && "flex",
        )
      }>
        <div className="self-center">
          <button
            className="bg-black bg-opacity-30  mr-5 px-4 rounded-xl"
            onClick={togglePause}
          >

            {pause ? <BsFillPlayFill className="text-white fill-current w-8 h-8" /> :
              <BsFillPauseFill className="text-white fill-current w-8 h-8" />
            }
          </button>
          <button className="bg-black bg-opacity-30 px-4 rounded-xl">
            <BsVolumeMute className="text-white fill-current w-8 h-8" />
          </button>
        </div>
      </div>

      <div
        className={
          clsx(
            {
              "hidden": !isMobile,
              "pointer-events-none": true
            }
          )
        }
        style={styles.overlay}>
        {isPause && <Play />}
        <div
          className="pointer-events-auto"
          style={{ width: "50%", zIndex: 999 }}
          // onTouchStart={debouncePause}
          onTouchEnd={mouseUp("previous")}
          // onMouseDown={debouncePause}
          onMouseUp={mouseUp("previous")}
        />
        <div
          className="pointer-events-auto"
          style={{ width: "50%", zIndex: 999 }}
          // onTouchStart={debouncePause}
          onTouchEnd={mouseUp("next")}
          // onMouseDown={debouncePause}
          onMouseUp={mouseUp("next")}
        />
      </div>

    </div>
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
    height: "inherit",
    width: "inherit",
  },
};
