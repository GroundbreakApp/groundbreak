import axios from "axios";
import { useMutation } from "react-query";

type WaitListDTO = {
  firstName: string;
  lastName: string;
  email: string;
};

const joinWaitList = (data: WaitListDTO): Promise<any> => {
  return axios.post("https://groundbreak.onrender.com/metrics/waitlist", data);
};

export const useJoinWaitList = () => {
  return useMutation({
    mutationFn: joinWaitList,
  });
};
