import { GetLeaderboardResponse } from "@/types/leaderboard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetLeaderboard = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getLeaderboard"],
    queryFn: async () => {
      const response = await axios.get<GetLeaderboardResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/highscore?id_subject=${id}`,
      );

      return response.data.userData;
    },
  });

  return { data, isLoading };
};
