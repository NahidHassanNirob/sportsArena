"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Search } from "lucide-react"
import { Button } from "@heroui/react"


export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#041527] text-white flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.1),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,197,94,0.08),_transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
         
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button className="gradient-cyan bg-gradient-to-r from-cyan-500 to-green-500 text-[#041527] font-bold px-8 py-6 hover:opacity-90 transition-opacity">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="px-8 py-6 border-slate-800 bg-transparent text-white hover:bg-white/5"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
        </motion.div>

        {/* Floating Sports Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { emoji: "⚽", delay: 0, x: "10%", y: "20%" },
            { emoji: "🏀", delay: 0.5, x: "85%", y: "15%" },
            { emoji: "🎾", delay: 1, x: "15%", y: "75%" },
            { emoji: "🏊", delay: 1.5, x: "80%", y: "70%" },
            { emoji: "🏸", delay: 2, x: "50%", y: "10%" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 0.3, 0], y: [0, -30, 0] }}
              transition={{
                duration: 4,
                delay: item.delay,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute text-4xl"
              style={{ left: item.x, top: item.y }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}