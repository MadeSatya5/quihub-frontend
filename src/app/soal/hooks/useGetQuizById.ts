import { getToken } from "@/lib/cookies";
import { GetQuizByIdResponse } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetQuizById = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getQuizById", id],
    queryFn: async () => {
      const response = await axios.get<GetQuizByIdResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/?id_mata_kuliah=${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data.shuffledQuiz;
    },
  });
  return { data, isLoading };
};
