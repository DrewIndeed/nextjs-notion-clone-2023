"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Spinner from "@/components/manual/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl lg:max-w-5xl space-y-4">
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold">
        Capture brilliance, organize chaos, and spark creativity – all in one
        place. Welcome to <span className="underline">Jotivate</span>.
      </h1>
      <h3 className="text-base sm:text-lg md:text-2xl font-medium">
        Transforming ideas into achievements, <br />
        one note at a time.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            My Jotivation <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Start Jotivate Now! <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
