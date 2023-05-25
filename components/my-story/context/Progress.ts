import React from "react";
import { ProgressContext } from "./../interfaces";

export default React.createContext<ProgressContext>({
  videoDuration: 0,
  onNext: () => {},
});
