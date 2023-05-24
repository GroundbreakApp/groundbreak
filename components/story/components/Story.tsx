import React, { useContext } from "react";
import { StoryProps, GlobalCtx } from "./../interfaces";
import GlobalContext from "./../context/Global";

const Story = (props: StoryProps) => {
  const globalContext = useContext<GlobalCtx>(GlobalContext);

  const {
    width,
    height,
    loader,
    header,
    storyStyles,
    storyInnerContainerStyles = {},
  } = globalContext;

  const rendererMessageHandler = (type: string, data: any) => {
    switch (type) {
      case "UPDATE_VIDEO_DURATION":
        props.getVideoDuration(data.duration);
        return { ack: "OK" as "OK" };
    }
  };

  const getStoryContent = () => {
    let InnerContent = props.story.content as React.ElementType;
    let config = { width, height, loader, header, storyStyles };
    return (
      <InnerContent
        action={props.action}
        isPaused={props.playState}
        story={props.story}
        config={config}
        disabled={props.disabled}
        messageHandler={rendererMessageHandler}
      />
    );
  };

  return (
    <div
      style={{
        ...styles.story,
        ...storyInnerContainerStyles,
        width: width,
        height: height,
      }}
    >
      {getStoryContent()}
    </div>
  );
};

const styles = {
  story: {
    display: "flex",
    position: "absolute" as "absolute",
    overflow: "hidden",
    alignItems: "center",
    left: 0,
    top: 0,
  },
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
};

export default Story;
