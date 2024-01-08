import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Trash2 } from "lucide-react";

export default function NotificationCard({ item }) {
  return (
    <Card
      key={item.id}
      className="flex flex-row items-center justify-between rounded-lg border p-4"
    >
      <>
        <div className="space-y-0.5">
          <Label className="text-base">{item.title}</Label>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Check className="cursor-pointer  text-[#009ED9] hover:text-blue-300" />
          <Trash2 className="cursor-pointer text-red-500 hover:text-red-400" />
        </div>
      </>
    </Card>
  );
}
