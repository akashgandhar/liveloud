import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

export default function CardWithSearchBar() {
 return (
<div className=" flex items-center space-x-2"> 
    <Card className="w-full p-2 flex items-center space-x-2">
    <Input type="text" className="px-3 py-2 w-full" placeholder="Search..." />
    <div title="Search" className="cursor-pointer transform transition duration-300 hover:scale-110 ">
      <Search />
    </div>  
    </Card>
</div>    
 );
}