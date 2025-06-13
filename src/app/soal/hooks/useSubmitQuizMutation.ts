import { getToken } from "@/lib/cookies";
import { SubmitQuizRequest, SubmitQuizResponse } from "@/types/quiz";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSubmitQuizMutation = () => {
  //   const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SubmitQuizRequest) => {
      const response = await axios.post<SubmitQuizResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/submitQuiz`,
        {
          id_subject: data.id_subject,
          score: data.score,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Quiz Berhasil Disubmit!");
      //   router.push("/login");
    },
    onError: () => {
      toast.error("Gagal melakulan Submit, silahkan coba lagi");
    },
  });

  return { mutate, isPending };
};
