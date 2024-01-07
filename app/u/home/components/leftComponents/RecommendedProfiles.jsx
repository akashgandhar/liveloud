import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"

export default function RecommendedProfiles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold">Who To Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
            <CardContent>
                    Profiles
                    <Button variant="outline" className="">Follow</Button>
            </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="text-[#009ED9] text-xl font-semibold cursor-pointer flex justify-center">
        <p>Show More</p>
      </CardFooter>
    </Card>
  );
}
