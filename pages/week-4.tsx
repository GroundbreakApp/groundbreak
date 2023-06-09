import { NewStory } from "@/components/new-story";
import { setFormSubmitted, setShowForm } from "@/components/new-story/slices/week4.slice";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import axios from "axios";
import { useState } from "react";
import { AiOutlineArrowUp, AiOutlineCheck } from "react-icons/ai";

const SendFeedbackForm = () => {
  const [feedbackText, setFeedbackText] = useState(''); // Add state for feedback text
  const isShowForm = useAppSelector(state => state.week4.isShowForm);
  const isFormSubmitted = useAppSelector(state => state.week4.isFormSubmitted);
  const dispatch = useAppDispatch();
  const handleIconClick = async () => {

    console.log("Submit clicked")
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_RENDER_ADDRESS}/metrics/feedback`, {
        text: feedbackText,
      });

      setFeedbackText('');
      dispatch(setFormSubmitted(true));
      setTimeout(() => {
        dispatch(setShowForm(false));
      }, 5000)

      // continue video play
      const video: any = document.querySelector('mux-player');
      if (!video) return;
      video.media.play();

    } catch (error) {
      console.error('Error sending feedback call:', error);
    }
  };
  if (!isShowForm) {
    return <></>
  }

  if (isShowForm) {
    if (isFormSubmitted) {
      return <>
        <div className="relative bg-opacity-70 bg-white rounded-md flex flex-col gap-2 p-2 items-center w-[235px] m-auto"
        >
          <h3 className="flex items-center justify-center font-serif text-[#2C2C2C] font-medium text-sm"> <AiOutlineCheck className="rounded-full w-6 h-6 p-1  bg-[#CBFD55] mr-4 text-black" />
            Your response was sent </h3>
        </div>
      </>
    }
    return <>
      <div className="relative bg-opacity-70 bg-white rounded-md flex flex-col gap-2 p-2 items-center w-[235px] m-auto"
        onFocus={() => {
          const video: any = document.querySelector('mux-player');
          if (!video) return;

          video.media.pause();
        }}
      >
        <h3 className="font-serif text-[#2C2C2C] font-medium text-sm"> Send Feedback </h3>
        <div className="flex items-center w-full">
          <input
            onChange={(e) => setFeedbackText(e.target.value)}
            value={feedbackText}
            type="text" className="font-serif text-black w-full text-sm rounded-md bg-white py-1 px-2 border-#[#B5B5B5] border-solid border"
            placeholder="Type Here" />
          <button className="rounded-full bg-[#CBFD55] absolute right-4 text-black"
            onClick={handleIconClick}
          ><AiOutlineArrowUp /></button>
        </div>
      </div>
    </>
  }
  return <></>

}

const stories = [
  {
    overlayColor: "#C06E47",
    startTime: 0,
    duration: 7.2 * 1000,
  },
  {
    overlayColor: "#C5978C",
    startTime: 7.066667 * 1000,
    duration: 11.3 * 1000,
  },
  {
    overlayColor: "#F5FF54",
    startTime: 18.333334 * 1000,
    duration: 15 * 1000,
  },
  {
    overlayColor: "#E0D8D0",
    startTime: 33.291334 * 1000,
    duration: 8.8 * 1000,
  },
  {
    overlayColor: "#193C59",
    startTime: 42.058001 * 1000,
    duration: 13.5 * 1000,
  },
  {
    overlayColor: "#C06E47",
    startTime: 55.535001 * 1000,
    duration: 16.6 * 1000,
  },
  {
    overlayColor: "#C5D8E6",
    startTime: 72.101668 * 1000,
    duration: 12.7 * 1000,
  },
  {
    overlayColor: "#5D6166",
    startTime: 84.735001 * 1000,
    duration: 10.3 * 1000,
  },
  {
    overlayColor: "#D8E5EA",
    startTime: 94.935001 * 1000,
    duration: 15.8 * 1000,
    widgets: [
      {
        spawnTime: 97 * 1000,
        duration: 20000,
        render: () => <>
          <SendFeedbackForm />
        </>
      }
    ]
  },
  {
    overlayColor: "#000000",
    startTime: 110.635001 * 1000,
    duration: 5.1 * 1000,
  },
];

function NewDemoPage() {

  return (
    <div>
      <NewStory
        stories={stories}
        playbackId="993fZeHs00PBkIuDXhxC9IaAbWG4bELIPM1LLwUHyrv00"
      />
    </div>
  );
}

export default NewDemoPage;
