import React from "react";
import TopTabs from "./components/TopTabs";
import SearchBar from "./components/rightComponents/searchbar";
// import subscribe from "./components/rightComponents/subscribeTopremium";
import RecommendedProfiles from "./components/leftComponents/RecommendedProfiles";
import Advertisement from "./components/leftComponents/Advertisement";

export default function Page() {
  return (
    <div className="flex pl-20 pr-2 w-screen min-h-screen justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full justify-center">
        <div className="w-1/4 hidden bg-red-400 h-full md:block">
          {/* Left Section */}
          <div className="p-4">
            <RecommendedProfiles />
          </div>
          <div className="p-4">
            <Advertisement />
          </div>
        </div>
        <div className="md:w-1/2 w-full overflow-hidden h-full ">
          {/* Center Section */}
          <TopTabs />
          Center Section
        </div>
        <div className="w-1/4 hidden h-full bg-blue-400 md:block">
          <div>
            {/*right section*/}
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}
