"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter()
  
  // google socail signIn
  const googleSignIn=async()=>{
    await authClient.signIn.social({
      provider:"google"
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    
    const newData = new FormData(e.currentTarget);
    const userCredentials = Object.fromEntries(newData.entries());
    console.log(userCredentials);
    try{
      await authClient.signIn.email({
          email:userCredentials.email,
          password:userCredentials.password
      },{
        onSuccess:()=>{
          setIsLoading(false)
          alert('login successfully')
          router.push('/')

        },
        onError:(erro)=>{
          setIsLoading(false)
          alert(erro.error.message)
        }
      })
    } catch(err){
        setIsLoading(false)
        console.error("Registration fatal error:",err)
    }
  };

  const inputClasses = "w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-[#0c1d33] transition-all [-webkit-text-fill-color:white] autofill:shadow-[inset_0_0_0_1000px_#0c1d33] autofill:text-white";

  return (
    <main className="min-h-screen bg-[#021225] pt-16 text-white flex flex-col items-center justify-center">
      <div className="flex-1 flex items-center justify-center p-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-white text-center">
            Welcome back
          </h1>
          <p className="text-white/60 text-center text-sm mb-8">
            Sign in to continue booking your favorite sports venues
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/90">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white/90">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${inputClasses} pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-cyan text-slate-950 font-bold py-6 rounded-xl hover:opacity-95 shadow-lg shadow-cyan-500/10 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-[#021225] px-3 text-white/60 font-medium">
                Or sign in with
              </span>
            </div>
          </div>

          <div className="mb-6">
            <Button
              onClick={()=>googleSignIn()}
              variant="bordered"
              className="w-full flex items-center justify-center gap-3 py-6 rounded-xl border border-gray-600 bg-transparent text-white font-medium hover:bg-white/5 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              </svg>
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-white/60">
            {"Don't have an account? "}
            <Link href="/register" className="text-cyan-500 hover:text-cyan-400 font-semibold hover:underline transition-colors">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}