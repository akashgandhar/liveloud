"use client";

import { Separator } from "@/components/ui/separator";
import NotificationCard from "./NotificationCard";

export default function ListView() {
  const dataList = [
    { id: 1, title: "Communication emails" },
    { id: 2, title: "Notification emails" },
    { id: 2, title: "Notification emails" },
    { id: 2, title: "Notification emails" },
  ];

  return (
    <>
      <h3 className="text-xl font-bold">Notifications</h3>
      <Separator className="my-2" />
      <div className="space-y-4 pb-20 p-4 h-screen overflow-y-scroll">
        {dataList.map((item, index) => (
          <NotificationCard item={item} key={index} />
        ))}
      </div>
    </>
  );
}
