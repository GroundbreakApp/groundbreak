import axios from "axios";
import { useMutation, useQuery } from "react-query";

type WaitListDTO = {
  firstName: string;
  lastName: string;
  email: string;
};

const joinWaitList = (data: WaitListDTO): Promise<any> => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_RENDER_ADDRESS}/metrics/waitlist`,
    data
  );
};

export const useJoinWaitList = () => {
  return useMutation({
    mutationFn: joinWaitList,
  });
};

const getStoryInfo = (id: string): Promise<any> => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_RENDER_ADDRESS}/stories?storyId=${id}`
  );
};

export const useGetStoryInfo = (id: string) => {
  return useQuery({
    queryKey: ["getStoryInfo", id],
    queryFn: () => getStoryInfo(id),
  });
};
