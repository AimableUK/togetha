import { Button } from "@/components/ui/button";
import React from "react";

const AppSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Download App</h1>
        <p className="opacity-60 text-sm">
          Download Togetha App on your device
        </p>
      </div>

      <div className="border rounded-lg p-6 space-y-3">
        <h2 className="text-sm text-primary/80">
          Our App is Compatible with all devices. If you incurr any issues while
          trying to download it or using it, kindly contact us on
          malostechnologies@gmail.com for quick help with [COMPATIBILITY ISSUE] Headline.
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <Button>Download App</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
