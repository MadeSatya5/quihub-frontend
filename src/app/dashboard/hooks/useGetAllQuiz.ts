import { getToken } from "@/lib/cookies";
import { GetQuizResponse } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllQuiz = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllQuiz"],
    queryFn: async () => {
      const response = await axios.get<GetQuizResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/subjects`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data.result;
    },
  });
  return { data, isLoading };
};
