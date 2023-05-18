import * as React from "react";
import { Renderer as IRenderer, Tester } from "./../interfaces";

export const Renderer: IRenderer = ({ story, action }) => {
  React.useEffect(() => {
    action("play");
  }, [story]);

  return (
    <div style={styles.storyContent}>
      <p style={styles.text}>This story could not be loaded.</p>
    </div>
  );
};

const styles = {
  storyContent: {
    width: "100%",
    maxHeight: "100%",
    margin: "auto",
  },
  text: {
    textAlign: "center" as "center",
    color: "white",
    width: "90%",
    margin: "auto",
  },
};

export const tester: Tester = () => {
  return {
    condition: true,
    priority: 1,
  };
};

export default {
  renderer: Renderer,
  tester,
};
