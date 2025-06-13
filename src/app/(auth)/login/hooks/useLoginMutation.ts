import { setToken } from "@/lib/cookies";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLoginMutation = () => {
  // const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      const { token } = response.data;
      setToken(token);

      // return response.data;
    },
    onSuccess: () => {
      toast.success("Anda berhasil login!!");
      window.location.href = "/dashboard";
      // router.push("/dashboard");
    },
    onError: () => {
      toast.error("Email atau kata sandi salah, silahkan coba lagi");
    },
  });

  return { mutate, isPending };
};
