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
        story={props.story}
        config={config}
        disabled={props.disabled}
        messageHandler={rendererMessageHandler}
        isLastSlide={props.isLastSlide}
      />
    );
  };

  return (
    <div
      style={{
        ...styles.story,
        ...storyInnerContainerStyles,
      }}
    >
      {getStoryContent()}
    </div>
  );
};

const styles = {
  story: {
    display: "flex",
    position: "relative" as "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: "30px",
    boxShadow: "rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0"
  },
  storyContent: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
};

export default Story;
