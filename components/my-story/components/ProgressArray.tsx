import React, { useContext, useState, useEffect, useRef } from "react";
import Progress from "./Progress";
import {
  ProgressContext,
  GlobalCtx,
  StoriesContext as StoriesContextInterface,
} from "./../interfaces";
import ProgressCtx from "./../context/Progress";
import GlobalContext from "./../context/Global";
import StoriesContext from "./../context/Stories";
import { timestamp } from "../util/time";
import { useAppDispatch, useAppSelector } from "@/stores/hook";

import { nextSlide } from "../slices/story.slice";
import useMobileDetect from "@/hooks/useMobileDetect";
import clsx from "clsx";

export default function ProgressArray() {
  const [count, setCount] = useState<number>(0);
  const lastTime = useRef<number>();

  const dispatch = useAppDispatch();

  const pause = useAppSelector(state => state.story.pause);
  const currentId = useAppSelector(state => state.story.currentIndex)

  const { videoDuration, onNext } =
    useContext<ProgressContext>(ProgressCtx);
  const {
    defaultInterval,
    onStoryEnd,
    onStoryStart,
    progressContainerStyles,
  } = useContext<GlobalCtx>(GlobalContext);
  const { stories } = useContext<StoriesContextInterface>(StoriesContext);

  const [isMobile, setIsMobile] = useState(false)


  let mobileDetect = useMobileDetect();

  useEffect(() => {
    setIsMobile(mobileDetect.isMobile())
  }, [])

  useEffect(() => {
    setCount(0);
  }, [currentId, stories]);

  useEffect(() => {
    if (!pause) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
      lastTime.current = timestamp();
    }
    return () => {
      cancelAnimationFrame(animationFrameId.current ?? 0);
    };
  }, [currentId, pause]);

  let animationFrameId = useRef<number>();

  let countCopy = count;
  const incrementCount = () => {
    if (countCopy === 0) storyStartCallback();
    if (lastTime.current == undefined) lastTime.current = timestamp();
    const t = timestamp();
    const dt = t - lastTime.current;
    lastTime.current = t;
    setCount((count: number) => {
      const interval = getCurrentInterval();
      countCopy = count + (dt * 100) / (interval ?? 1000);
      return countCopy > 100 ? 0 : countCopy;
    });
    if (countCopy < 100) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
    } else {
      cancelAnimationFrame(animationFrameId.current ?? 0);
      setCount(0);
      storyEndCallback();
      dispatch(nextSlide());
      onNext();
    }
  };

  const storyStartCallback = () => {
    onStoryStart && onStoryStart(currentId, stories[currentId]);
  };

  const storyEndCallback = () => {
    onStoryEnd && onStoryEnd(currentId, stories[currentId]);
  };

  const getCurrentInterval = () => {
    if (stories[currentId].type === "video") return videoDuration;
    if (typeof stories[currentId].duration === "number")
      return stories[currentId].duration;
    return defaultInterval;
  };

  const opacityStyles = {
    opacity: 1,
  };

  return (
    <div
      className={clsx({ 'absolute': isMobile, 'max-w-[400px]': !isMobile })}
      style={{
        ...styles.progressArr,
        ...progressContainerStyles,
        ...opacityStyles
      }}>
      {stories.map((_, i) => (
        <Progress
          key={i}
          count={count}
          width={1 / stories.length}
          active={i === currentId ? 1 : i < currentId ? 2 : 0}
        />
      ))}
    </div>
  );
};

const styles = {
  progressArr: {
    display: "flex",
    justifyContent: "center",

    flexWrap: "nowrap" as const,
    // position: "absolute" as const,
    width: "90%",
    padding: 5,
    paddingTop: 20,
    alignSelf: "center",
    zIndex: 1001,
    filter: "drop-shadow(0 1px 8px #222)",
    transition: "opacity 400ms ease-in-out",
  },
};
