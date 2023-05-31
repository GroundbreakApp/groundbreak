import { useJoinWaitList } from "@/services/api";
import { useAppDispatch } from "@/stores/hook";
import { useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";
import { setPause } from "../my-story/slices/story.slice";

export const RegisterForm = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState({ firstName: '', lastName: '', email: '' })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const jointWaitlist = useJoinWaitList();

  const handleChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const SubmitButton = () => {
    if (jointWaitlist.isLoading) {
      return (
        <button className="bg-[#CBFD55] rounded-lg font-semibold py-2 flex items-center justify-center" disabled={jointWaitlist.isLoading}>
          <AiOutlineLoading3Quarters className="mr-2 animate-spin w-4 h-4" /> Wait a moment
        </button>
      )
    }

    if (jointWaitlist.isSuccess) {
      return (
        <button className="bg-[#CBFD55] rounded-lg font-semibold py-2 flex items-center justify-center">
          <AiOutlineCheck className="mr-2 w-4 h-4" /> Sent
        </button>
      )
    }

    return (
      <a className="cursor-pointer bg-[#CBFD55] rounded-lg font-semibold py-2 pointer-events-auto" onClick={() => {
        jointWaitlist.mutate(data);
      }}>
        Join Waitlist
      </a>
    )


  }
  return (
    <div className="flex justify-center h-full w-full absolute left-0 top-0 z-[99999]"
      style={{
        zoom: 0.7
      }}
      onFocus={() => dispatch(setPause(true))}
    >
      <div className="flex flex-col items-stretch absolute top-80 bg-white w-[80%] mb-2 gap-4 p-2 mt-2">
        <p className="font-semibold text-base">Fill out the form to join the waitlist</p>
        <input
          type="text"
          className="text-gray-800 bg-transparent border border-gray-400 rounded-lg px-2 py-1"
          placeholder="First name"
          name="firstName"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          className="text-gray-800 bg-transparent border border-gray-400 rounded-lg px-2 py-1"
          placeholder="Last name"
          name="lastName"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          className="text-gray-800 bg-transparent border border-gray-400 rounded-lg px-2 py-1"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <SubmitButton />
      </div>
    </div>
  )
}