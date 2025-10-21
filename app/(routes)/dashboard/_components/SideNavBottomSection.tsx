import React from "react";
import { Archive, FilePlus2, Flag, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const SideNavBottomSection = () => {
  const menuList = [
    { id: 0, name: "Getting Started", icon: Flag, path: "" },
    { id: 1, name: "Github", icon: Github, path: "" },
    { id: 2, name: "Archive", icon: Archive, path: "" },
  ];

  return (
    <div>
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className="flex gap-2 p-2 text-xs  cursor-pointer rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 font-semibold trans"
        >
          {typeof menu.icon === "string" ? (
            <img src={menu.icon} alt={menu.name} className="w-5 h-5" />
          ) : (
            <menu.icon className="w-5 h-5" />
          )}
          {menu.name}
        </h2>
      ))}
      {/* Add file */}
      <Button className="mt-3 flex w-full justify-start bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/80 dark:text-foreground/90 cursor-pointer trans">
        <FilePlus2 strokeWidth={2} />
        New file
      </Button>
      {/* progress bar */}

      <div className="h-3 w-full bg-foreground/20 dark:bg-foreground/50 rounded-full mt-4">
        <div className="h-3 w-2/5 rounded-full bg-accent"></div>
      </div>

      <div className="text-xs mt-3">
        <h2>
          <strong>1</strong> Out of <strong>5</strong> files used
        </h2>
        <h2>Upgrade your plan for unlimited access.</h2>
      </div>
    </div>
  );
};

export default SideNavBottomSection;
