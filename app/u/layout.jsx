"use client";
import React from "react";
import Sidebar, { SidebarItem } from "./components/SideBar";
import {
  Home,
  TrendingUp,
  Siren,
  Sparkles,
  Flame,
  Bell,
  Crown,
  Mail,
  Bookmark,
  User,
  Wallet,
  Gem,
  BadgePercent,
} from "lucide-react";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth/context";

export default function Layout({ children }) {
  const path = usePathname();
  const router = useRouter();

  function extractValue(inputString) {
    // Using regular expression to find the value after "/u/" and before the next "/"
    const match = inputString.match(/\/u\/([^\/]+)/);

    // Check if there is a match
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  const activeComponent = extractValue(path);

  if (activeComponent === null) {
    router.push("/u/home");
  }

  const { navBar, setNavOpen } = useAuth();

  return (
    <div
      className={`flex flex-row overflow-y-hidden relative ${navBar ? "backdrop:blur-sm" : ""}`}
    >
      <Sidebar>
        <SidebarItem
          icon={<Home color="#000000" />}
          text="Home"
          active={activeComponent === "home"}
          link="#"
        />
        <SidebarItem
          icon={<TrendingUp color="#8B0000" />}
          text="Trending"
          active={activeComponent === "trending"}
          link="#"
        />
        <SidebarItem
          icon={<Siren color="#00008B" />}
          text="Latest"
          active={activeComponent === "latest"}
          link="#"
        />
        <SidebarItem
          icon={<Sparkles color="rgb(31 41 55)"/>}
          text="Popular"
          active={activeComponent === "popular"}
          link="#"
        />
        <SidebarItem
          icon={<Flame color="rgb(255, 69, 0)" />}
          text="Hot"
          active={activeComponent === "hot"}
          link="#"
        />
        <SidebarItem
          icon={<Bell color="#000000"/>}
          text="Notification"
          active={activeComponent === "notification"}
          link="#"
        />
        <SidebarItem
          icon={<Crown color="#FFD700"/>}
          text="Subscription"
          active={activeComponent === "subscription"}
          link="#"
        />
        <SidebarItem
          icon={<Mail color="#000000" />}
          text="Message"
          active={activeComponent === "message"}
          link="#"
        />
        <SidebarItem
          icon={<Bookmark color="#000000"/>}
          text="Bookmark"
          active={activeComponent === "bookmark"}
          link="#"
        />
        <SidebarItem
          icon={<User color="#000000" />}
          text="My Profile"
          active={activeComponent === "user"}
          link="#"
        />
        <SidebarItem
          icon={<Wallet color="#8b4513" />}
          text="Wallet"
          active={activeComponent === "wallet"}
          link="#"
        />
        <SidebarItem
          icon={<Gem color="#0f14a3" />}
          text="Premium account"
          active={activeComponent === "gem"}
          link="#"
        />
        <SidebarItem
          icon={<BadgePercent color="#228B22" />}
          text="Referals"
          active={activeComponent === "referals"}
          link="#"
        />
      </Sidebar>

      <section>{children}</section>

      {/* <div className="w-72 lg:block hidden  border-l-2 ">fff</div> */}
    </div>
  );
}
