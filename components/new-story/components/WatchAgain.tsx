import { CgRedo } from "react-icons/cg";
type WatchAgainProps = {
  onClick: () => void
}

export const WatchAgain = (props: WatchAgainProps) => {
  return <>
    <a
      className="pointer-events-auto bg-[#CBFD55] text-black p-2 text-sm font-serif flex items-center justify-center flex-row w-[133px] cursor-pointer rounded-lg"
      onClick={props.onClick}

    >
      <CgRedo className="w-5 h-5 text-black fill-current mr-2" /> Watch again
    </a>
  </>
}