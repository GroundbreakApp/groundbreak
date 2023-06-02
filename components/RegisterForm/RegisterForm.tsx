import { useJoinWaitList } from "@/services/api";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";
import { setPause } from "../my-story/slices/story.slice";

export const RegisterForm = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState({ firstName: '', lastName: '', email: '' })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const jointWaitlist = useJoinWaitList();
  const videoRef = useAppSelector(state => state.story.activeVideoRef);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    if (isSubmitted) {
      videoRef.play();
    }
  }, [isSubmitted])

  const SubmitButton = () => {
    if (jointWaitlist.isLoading) {
      return (
        <button className="text-black text-xs font-serif bg-[#CBFD55] rounded-lg font-semibold py-2 flex items-center justify-center" disabled={jointWaitlist.isLoading}>
          <AiOutlineLoading3Quarters className="mr-2 animate-spin w-4 h-4" /> Wait a moment
        </button>
      )
    }

    if (jointWaitlist.isSuccess) {
      setIsSubmitted(true);
      return (
        <button className="text-black text-xs font-serif bg-[#CBFD55] rounded-lg font-semibold py-2 flex items-center justify-center">
          <AiOutlineCheck className="mr-2 w-4 h-4" /> Sent
        </button>
      )
    }

    return (
      <a className="text-black text-xs cursor-pointer font-serif bg-[#CBFD55] rounded-lg font-semibold py-2 pointer-events-auto" onClick={() => {
        jointWaitlist.mutate(data);
      }}>
        Register
      </a>
    )
  }



  return (
    <div className="flex h-full w-full fixed left-0 top-0 z-[99999]"
      style={{
        zoom: 1.0
      }}
      onFocus={() => dispatch(setPause(true))}
    >
      {!isSubmitted && (
        <div className="flex flex-col items-stretch fixed left-0 right-0  m-auto bg-white w-[70%] mb-2 gap-2 p-2 top-[20%] rounded-[12px] overflow-hidden">
          <p className="font-semibold text-xs font-serif text-black">Project Horizon Webinar Registration</p>
          <input
            type="text"
            className="font-serif text-xs text-[#393939] bg-transparent border border-[#E4E4E4] rounded-lg p-2"
            placeholder="First name"
            name="firstName"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="font-serif text-xs text-[#393939] bg-transparent border border-[#E4E4E4] rounded-lg p-2"
            placeholder="Last name"
            name="lastName"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            className="font-serif text-xs text-[#393939] bg-transparent border border-[#E4E4E4] rounded-lg p-2"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <SubmitButton />
        </div>
      )}
    </div>
  )
}