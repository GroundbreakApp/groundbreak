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
  width?: number;
  height?: number;
};


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
    dispatch(setPlaybackId(props.playbackId));
  }, [props.playbackId])

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

  //
  // for iphone
  //
  if (global.window) {
    global.window.document.body.style.background = currentBlurColor ?? "transparent"
    global.window.document.body.style.backgroundColor = currentBlurColor ?? "transparent"
  }

  return <Provider store={store}>
    <Blur />
    {isMobile ? <ContainerMobile /> : <Container />}
  </Provider>
}