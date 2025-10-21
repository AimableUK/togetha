import React from "react";
import SideNavTopSection from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";

const SideNav = () => {
  const { user } = useKindeBrowserClient();

  return (
    <div className="flex flex-col bg-sidebar border h-screen fixed w-72 border-r p-6">
      <div className="flex-1">
        <SideNavTopSection user={user} />
      </div>

      <div>
        <SideNavBottomSection />
      </div>
    </div>
  );
};

export default SideNav;
