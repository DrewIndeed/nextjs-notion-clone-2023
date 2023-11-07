"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import Spinner from "@/components/manual/Spinner";
import { useConvexAuth } from "convex/react";
import Navigation from "../_components/Navigation";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) return router.replace("/");
  }, [isLoading, isAuthenticated, router]);

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
