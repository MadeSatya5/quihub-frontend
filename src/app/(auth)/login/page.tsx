"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { LogIn, Loader2, Eye, EyeOff } from "lucide-react";
import RotatingText from "@/components/ui/RotatingText";
import Typography from "@/components/ui/Typography";
import { LoginRequest } from "@/types/auth";
import { useLoginMutation } from "./hooks/useLoginMutation";
import Link from "next/link";
import toast from "react-hot-toast";

function Login() {
  const methods = useForm<LoginRequest>();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const { mutate, isPending } = useLoginMutation();

  const [activeInput, setActiveInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginRequest) => {
    if (!data.email || !data.password) {
      toast.error("Email dan password tidak boleh kosong");
      return;
    }
    mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-black items-center pt-[25%] lg:pt-0">
      {/* Left Side - Logo */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center">
        <div className="flex items-center justify-center">
          <Typography variant="h2" weight="bold" className="text-5xl">
            Qui
          </Typography>
          <RotatingText
            texts={["Hub", "Smart", "Learn"]}
            mainClassName="px-4 bg-main-black font-bold text-white overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg text-4xl md:text-6xl"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
        <Typography variant="p" weight="regular">
          Belajar Menyenangkan Bersama QuiHub!
        </Typography>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md mx-auto md:ml-15 lg:ml-25">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl p-6 sm:p-8 space-y-4 sm:space-y-6 border border-gray-100">
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-main-black">
                Login
              </h1>
              <p className="text-muted-foreground text-sm">
                Gunakan Akun Kamu!
              </p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <div
                    className={`border rounded-lg px-3 py-2 transition-all duration-300 ${
                      activeInput === "email"
                        ? "border-[#000a2a]"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="Masukkan Email"
                      onBlur={() => setActiveInput(null)}
                      className="text-base sm:text-sm w-full outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password">Password</label>
                  <div
                    className={`border rounded-lg px-3 py-2 transition-all duration-300 relative ${
                      activeInput === "password"
                        ? "border-[#000a2a]"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      {...register("password")}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan Password"
                      onBlur={() => setActiveInput(null)}
                      className="text-base sm:text-sm pr-10 w-full outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-main-black hover:bg-[#000a2a]/90 transition-all px-5 py-2 rounded-lg"
                    disabled={!isValid || isPending}
                  >
                    {isPending ? (
                      <div className="flex items-center justify-center text-white">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <p>Memproses...</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-white">
                        <LogIn className="mr-2 h-4 w-4" />
                        <p>Login</p>
                      </div>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-1">
                  <p className="text-sm text-muted-foreground">
                    Belum Punya Akun?
                  </p>
                  <Link
                    href="/register"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
