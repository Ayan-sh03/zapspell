"use client";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useAuthStore from "@/context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, isLoading, logout, checkAuth } = useAuthStore() as {
    isLoggedIn: boolean;
    isLoading: boolean;
    logout: () => void;
    checkAuth: () => void;
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <header className="px-4 lg:px-6 h-14  flex items-center bg-background">
        <Link
          href="/"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <PencilIcon className="h-6 w-6 text-primary" />
          <span className="ml-1 text-lg dark:text-white text-zinc-100">
            ZapSpell
          </span>
        </Link>
        <nav className="ml-auto  items-center flex gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
            prefetch={true}
          >
            Profile
          </Link>
          <Link
            href="/leader"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
            prefetch={true}
          >
            Learderboard
          </Link>
          <Link
            href="/test"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
            prefetch={true}
          >
            Play
          </Link>

          <Button onClick={isLoggedIn ? logout : undefined}>
            <Link
              href={isLoggedIn ? "#" : "/login"}
              className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground scroll-smooth"
              prefetch={false}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Link>
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
