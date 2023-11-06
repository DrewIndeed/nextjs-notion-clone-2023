"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

import ModeToggle from "@/components/manual/ModeToggle";
import Spinner from "@/components/manual/Spinner";
import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end  w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Joviate Free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mr-auto md:mr-0"
            >
              <Link href="/documents"> Let&lsquo;s Jotivate ✨</Link>
            </Button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "w-[38px] h-[38px] select-none pointer-events-none",
                  userPreviewAvatarBox: "select-none pointer-events-none",
                },
              }}
            />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
