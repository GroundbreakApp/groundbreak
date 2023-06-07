
import { useState, useEffect, useRef } from "react"
import useMobileDetect from "@/hooks/useMobileDetect";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import Progress from "./Progress";
import { timestamp } from "../util/time";
import { nextSlide } from "../slices/story.slice";
export default function ProgressArray() {
  const [isMobile, setIsMobile] = useState(false)
  const [count, setCount] = useState<number>(0);
  const lastTime = useRef<number>();
  const pause = useAppSelector(state => state.newStory.pause);
  const loading = useAppSelector(state => state.newStory.loading)
  const currentId = useAppSelector(state => state.newStory.currentId);
  let mobileDetect = useMobileDetect();
  const stories = useAppSelector(state => state.newStory.stories)
  let animationFrameId = useRef<number>();
  const defaultInterval = 8000;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMobile(mobileDetect.isMobile())
  }, [])

  useEffect(() => {
    setCount(0);
  }, [currentId, stories]);

  useEffect(() => {
    if (!pause && !loading) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
      lastTime.current = timestamp();
    }
    return () => {
      cancelAnimationFrame(animationFrameId.current ?? 0);
    };
  }, [currentId, pause, loading]);

  let countCopy = count;

  const incrementCount = () => {
    if (lastTime.current == undefined) lastTime.current = timestamp();
    const t = timestamp();
    const dt = t - lastTime.current;
    lastTime.current = t;
    setCount((count: number) => {
      const interval = getCurrentInterval();
      countCopy = count + (dt * 100) / (interval ?? 1000);
      // return countCopy;
      if (currentId === stories.length - 1) {
        return countCopy;
      }
      return countCopy > 100 ? 0 : countCopy;
    });
    if (countCopy < 100) {
      animationFrameId.current = requestAnimationFrame(incrementCount);
    } else {
      cancelAnimationFrame(animationFrameId.current ?? 0);
      dispatch(nextSlide());
    }
  };

  const getCurrentInterval = () => {
    if (typeof stories[currentId].duration === "number")
      return stories[currentId].duration;
    return defaultInterval;
  };

  return <div
    className={clsx({
      'absolute top-5 w-3/4 z-[10000]': isMobile,
      'w-[400px]': !isMobile
    },
      "flex justify-center flex-nowrap p-1 pt-5"
    )}
    style={{
      transition: "opacity 400ms ease-in -out"
    }}
  >
    {stories.map((_, i) => (
      <Progress
        key={i}
        count={count}
        width={1 / stories.length}
        active={i === currentId ? 1 : i < currentId ? 2 : 0}
      />
    ))}
  </div>

}