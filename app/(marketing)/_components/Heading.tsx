"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, Documents & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotivate</span>.
      </h1>
      <h3 className="text-base sm:text-lg md:text-2xl font-medium">
        Jotivate is the connected workspace where <br />
        better, fster work happens.
      </h3>
      <Button>
        Start Jotivate <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default Heading;
