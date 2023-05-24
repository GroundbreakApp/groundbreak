import image from "./Image";
import video from "./Video";
import defaultRenderer from "./Default";
import autoplayContent from "./AutoPlayContent";
import MuxVideo from "./MuxVideo";

export const renderers = [
  image,
  video,
  MuxVideo,
  autoplayContent,
  defaultRenderer,
];
