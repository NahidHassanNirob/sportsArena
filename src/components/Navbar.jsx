"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import logo from "@/assest/logo.png";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ProfileDropdown } from "./ProfileDropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data:session}=authClient.useSession()
 
  const user=session?.user

  const navLinks = (
    <>
      <li>
        <Link href={"/"} className="hover:text-green-500 transition-colors">Home</Link>
      </li>
      <li>
        <Link href={"/facilities"} className="hover:text-green-500 transition-colors">All Facilities</Link>
      </li>
      {
        user &&<><li>
        <Link href={"/bookings"} className="hover:text-green-500 transition-colors">My Bookings</Link>
      </li>
      <li>
        <Link href={"/add-facilities"} className="hover:text-green-500 transition-colors">Add Facility</Link>
      </li>
      <li>
        <Link href={"/manage-facilities"} className="hover:text-green-500 transition-colors">Manage My Facilities</Link>
      </li></>
      }
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full bg-[#111627] backdrop-blur-md shadow-lg py-2 border-b border-white/5"
    >
     
      <header className=" h-14 grid grid-cols-3 items-center px-6">
        
        {/* Left Column: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4 justify-start">
          <button
            className="lg:hidden text-slate-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="bg-white rounded-md h-8 w-8 object-contain"
              src={logo}
              alt="logo"
              height={40}
              width={40}
            />
            <p className="font-bold text-xl tracking-tight whitespace-nowrap">
              <span className="text-white">Sports</span>
              <span className="text-blue-400">Arena</span>
            </p>
          </Link>
        </div>

        <ul className="hidden items-center justify-center font-semibold text-[#8B8B8B] gap-6 lg:flex whitespace-nowrap">
          {navLinks}
        </ul>

   
        <div className="hidden items-center justify-end gap-4 lg:flex">
         {
          user? <ProfileDropdown user={user}></ProfileDropdown> : <Link href={"/login"}>
            <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold rounded-xl px-5">
              Login
            </Button>
          </Link>
         }
          
          
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 lg:hidden bg-[#111627]">
          <ul className="flex flex-col font-semibold text-[#8B8B8B] gap-2 p-4">
            {navLinks}
           {
          user? <ProfileDropdown user={user}></ProfileDropdown> : <Link href={"/login"}>
            <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold rounded-xl px-5">
              Login
            </Button>
          </Link>
         }
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;