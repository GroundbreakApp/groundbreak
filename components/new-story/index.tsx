import { Provider } from "react-redux";
import { Story } from "./types";
import store from "@/stores/store";
import Container from "./components/Container";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { setPlaybackId, setStories } from "./slices/story.slice";
import useMobileDetect from "@/hooks/useMobileDetect";
import ContainerMobile from "./components/ContainerMobile";

export type INewStoryProps = {
  stories: Array<Story>;
  playbackId: string;
  width?: NumberOrString;
  height?: NumberOrString;
};

type NumberOrString = number | string;

export const NewStory = (props: INewStoryProps) => {
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState(false)
  let mobileDetect = useMobileDetect();
  const currentBlurColor = useAppSelector(state => state.newStory.currentBlurColor);

  useEffect(() => {
    setIsMobile(mobileDetect.isMobile())
  }, [])

  useEffect(() => {
    dispatch(setStories(props.stories));
  }, [props.stories])

  useEffect(() => {
    console.log("playbackId 123", props.playbackId)
    dispatch(setPlaybackId(props.playbackId));
  }, [props.playbackId])

  console.log("currentBlurCOlor", currentBlurColor);
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
        zIndex: 100,
      }}
      >
      </div>
    )
  }

  return <Provider store={store}>
    <Blur />
    {isMobile ? <ContainerMobile /> : <Container />}
  </Provider>
}