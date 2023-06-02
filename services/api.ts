import axios from "axios";
import { useMutation } from "react-query";

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
