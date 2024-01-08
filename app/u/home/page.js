import React from "react";
import TopTabs from "./components/TopTabs";
import SearchBar from "./components/rightComponents/searchbar";
import Subscribe from "./components/rightComponents/subscribe";
import Trends from "./components/rightComponents/trends";
import RecommendedProfiles from "./components/leftComponents/RecommendedProfiles";
import Advertisement from "./components/leftComponents/Advertisement";
import Add from "./components/rightComponents/add";
export default function Page() {
  return (
    <div className="flex pl-20 pr-2 w-screen min-h-screen justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full justify-center">
        <div className="w-1/4 p-4 hidden  h-screen md:flex flex-col gap-4">
          {/* Left Section */}
          <div className="h-3/4">
            <RecommendedProfiles />
          </div>
          <Advertisement />
        </div>
        <div className="md:w-1/2 w-full overflow-hidden h-full ">
          {/* Center Section */}
          <TopTabs />
          
        </div>
        <div className="w-1/4 hidden h-full  md:flex gap-4 flex-col p-4">
          {/*right section*/}
          <SearchBar />
          <Subscribe />
          <Trends />
          <Add/>
        </div>
      </div>
    </div>
  );
}
