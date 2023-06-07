import { Provider } from "react-redux";
import { Story } from "./types";
import store from "@/stores/store";
import Container from "./components/Container";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/stores/hook";
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

  return <Provider store={store}>
    {isMobile ? <ContainerMobile /> : <Container />}
  </Provider>
}