import React from "react";
import TopTabs from "./components/TopTabs";
import Subscribe from "./components/rightComponents/subscribe";
import Trends from "./components/rightComponents/trends";
import RecommendedProfiles from "./components/leftComponents/RecommendedProfiles";
import Advertisement from "./components/leftComponents/Advertisement";
import Add from "./components/rightComponents/add";
import CardWithSearchBar from "./components/rightComponents/searchbar";
import Message from "./components/main/message/Message";
export default function Page() {
  return (
    <div className="flex pl-20 pr-2 w-screen min-h-screen justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full justify-center">
        <div className="w-1/4 p-4 hidden  h-screen lg:flex flex-col gap-4">
          {/* Left Section */}
          <div className="h-3/4">
            <RecommendedProfiles />
          </div>
          <Advertisement />
        </div>
        <div className="lg:w-1/2 pt-4 w-full overflow-hidden h-full ">
          {/* Center Section */}
          {/* <div className="block">Your Messages</div> */}
          <Message />
        </div>
        <div className="w-1/4 hidden h-full  lg:flex gap-4 flex-col p-4">
          {/*right section*/}
          <CardWithSearchBar />
          <Subscribe />
          {/* <Trends /> */}
          <Add />
        </div>
      </div>
    </div>
  );
}
