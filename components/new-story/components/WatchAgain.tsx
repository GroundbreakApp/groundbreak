import { CgRedo } from "react-icons/cg";
type WatchAgainProps = {
  onClick: () => void
}

export const WatchAgain = (props: WatchAgainProps) => {
  return <>
    <a
      className="bg-[#CBFD55] text-white p-2 text-sm font-serif flex items-center justify-center flex-row cursor-pointer rounded-full"
      onClick={props.onClick}

    >
      <CgRedo className="w-6 h-6 text-black fill-current " />
    </a>
  </>
}