"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, Link2 } from "lucide-react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // এরর মেসেজের জন্য স্টেট
  const router = useRouter();

  // google social signIn
  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // আগের এরর ক্লিয়ার করা
    
    const newData = new FormData(e.currentTarget);
    const newUser = Object.fromEntries(newData.entries());
    const pass = newUser.password;

    // ১. দৈর্ঘ্য চেক (কমপক্ষে ৬ ক্যারেক্টার)
    const hasMinLength = pass.length >= 6;

    // ২. আপারকেস এবং লোয়ারকেস চেক (সহজ লজিক)
    let hasUppercase = false;
    let hasLowercase = false;

    for (let i = 0; i < pass.length; i++) {
      const char = pass[i];
      if (char.toLowerCase() !== char.toUpperCase()) {
        if (char === char.toUpperCase()) hasUppercase = true;
        if (char === char.toLowerCase()) hasLowercase = true;
      }
    }

    // শর্ত পরীক্ষা
    if (!hasMinLength || !hasUppercase || !hasLowercase) {
      setIsLoading(false);
      setErrorMessage("Password must be at least 6 characters, with 1 uppercase and 1 lowercase letter.");
      return;
    }

    try {
      await authClient.signUp.email({
        name: newUser.name,
        email: newUser.email,
        image: newUser.photoUrl,
        password: newUser.password
      }, {
        onSuccess: async () => {
          await authClient.signOut();
          setIsLoading(false);
          toast.success('Registration successful! Please login.'); 
          router.push('/login');
        },
        onError: (ctx) => {
          setIsLoading(false);
          setErrorMessage(ctx.error?.message || "Something went wrong during registration.");
        }
      });
    } catch (err) {
      setIsLoading(false);
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Registration fatal error:", err);
    }
  };

  const inputClasses = "w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-[#0c1d33] transition-all [-webkit-text-fill-color:white] autofill:shadow-[inset_0_0_0_1000px_#0c1d33] autofill:text-white";

  return (
    <main className="min-h-screen bg-[#021225] pt-16 text-white flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-white text-center">
            Create an account
          </h1>
          <p className="text-white/60 text-center text-sm mb-8">
            Join thousands of athletes booking their perfect venues
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/90">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
                <input
                  type="text"
                  name="name"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your Name"
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white/90">
                Photo URL
              </label>
              <div className="relative">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
                <input
                  type="url"
                  name="photoUrl"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your photo URL"
                  className={inputClasses}
                  required
                />
              </div>
            </div>

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

            {/* ফর্মের ভেতর লাল রঙের এরর মেসেজ */}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-center"
              >
                {errorMessage}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-cyan text-slate-950 font-bold py-6 rounded-xl hover:opacity-95 shadow-lg shadow-cyan-500/10 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Register
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
                Or Register with
              </span>
            </div>
          </div>

          <div className="mb-6">
            <Button
              onClick={() => googleSignIn()}
              variant="bordered"
              className="w-full flex border border-gray-600 items-center justify-center gap-3 py-6 rounded-xl bg-transparent text-white font-medium hover:bg-white/5 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              </svg>
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-white/60">
            {"Already have an account? "}
            <Link
              href="/login"
              className="text-cyan-500 hover:text-cyan-400 font-semibold hover:underline transition-colors"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}