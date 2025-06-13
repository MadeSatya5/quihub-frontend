import { removeToken } from "@/lib/cookies"
import { useRouter } from "next/navigation";

export const useLogout = () => {
    removeToken();
    const router = useRouter();
    router.push("/login");
}