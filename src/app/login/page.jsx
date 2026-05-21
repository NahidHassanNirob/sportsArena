"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Google Social Sign In
  const googleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google sign in failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: async () => {
            setIsLoading(false);
            toast.success("Login successfully");
            
           
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            setIsLoading(false);
            setErrorMessage(ctx.error.message || "Invalid email or password.");
          },
        }
      );
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const inputClasses = "w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all";

  return (
    <main className="min-h-screen bg-[#021225] pt-16 text-white flex flex-col items-center justify-center">
      <div className="flex-1 flex items-center justify-center p-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-center">Welcome back</h1>
          <p className="text-white/60 text-center text-sm mb-8">Sign in to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClasses} pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-center">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 text-white font-bold py-6 rounded-xl hover:opacity-90"
            >
              {isLoading ? "Signing in..." : <>Sign In <ArrowRight className="w-5 h-5 ml-2" /></>}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#021225] px-3 text-white/60">Or sign in with</span></div>
          </div>

          <Button
            onClick={googleSignIn}
            className="w-full bg-transparent border border-gray-600 py-6 rounded-xl hover:bg-white/5"
          >
            Google
          </Button>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <h2>Already have an account?</h2> <h2 className="text-blue-400"><Link href={'/register'}>Register</Link></h2>
          </div>
        </motion.div>
      </div>
    </main>
  );
}