import { getToken, setUser } from "@/lib/cookies";
import { GetMeResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetMe = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const token = getToken();
      const response = await axios.get<GetMeResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.payload.email);

      return response.data.payload.email;
    },
  });

  return { data, isLoading };
};
