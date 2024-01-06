import React from "react";
import TopTabs from "./components/TopTabs";

export default function Page() {
  return (
    <div className="flex pl-20 pr-2 w-screen min-h-screen justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full justify-center">
        <div className="w-1/4 hidden bg-red-400 h-full md:block">
          {/* Left Section */}
          Left Section
        </div>
        <div className="md:w-1/2 w-full overflow-hidden h-full bg-green-400">
          {/* Center Section */}
          <TopTabs />
          Center Section
        </div>
        <div className="w-1/4 hidden h-full bg-blue-400 md:block">
          {/* Right Section */}
          Right Section
        </div>
      </div>
    </div>
  );
}
