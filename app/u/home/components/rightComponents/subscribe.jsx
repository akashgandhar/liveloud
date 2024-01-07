import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export default function subscribe() {
 return (
<div className=" flex items-center space-x-2 w-full">
      <Card className="w-full flex items-center">
        <div className="p-2">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Premium</h2>
          <p className="text-gray-700 mb-4">
            Enjoy exclusive features and content with our premium subscription.
          </p>
          <button       
           className="px-4 py-2 bg-[#009ED9]  text-white rounded-md hover:bg-white hover:text-black hover:border hover:border-black"
          >
           Subscribe
          </button>
        </div>
      </Card>
    </div>
 );
}