import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export default function subscribe() {
 return (
<div className="p-2 flex items-center space-x-2"> 
    <Card className="w-full p-0 flex items-center space-x-2">
    <Input type="text" className="flex-grow px-3 py-2"  />
      
    </Card>
</div>    
 );
}