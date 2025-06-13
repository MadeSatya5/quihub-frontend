import { RegisterRequest, RegisterResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useRegisterMutation = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await axios.post<RegisterResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
        {
          email: data.email,
          password: data.password,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Anda berhasil register!!");
      router.push("/login");
    },
    onError: () => {
      toast.error("Gagal melakulan register, silahkan coba lagi");
    },
  });

  return { mutate, isPending };
};
