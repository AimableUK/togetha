import { TeamContext } from "@/app/FilesListContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  ListCollapse,
  Search,
  SendHorizontal,
  TextAlignJustify,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const Header = () => {
  const { user }: any = useKindeBrowserClient();
  const { collapseSidebar_, setCollapseSidebar_, isMobile } =
    useContext(TeamContext);
  const pathname = usePathname();

  return (
    <div className="flex justify-between w-full items-center gap-2 mt-3 px-3">
      <div
        onClick={() => setCollapseSidebar_(!collapseSidebar_)}
        className="flex gap-3 items-center"
      >
        {collapseSidebar_ ? (
          <TextAlignJustify className="trans cursor-pointer active:scale-75" />
        ) : (
          <ListCollapse className="trans cursor-pointer active:scale-75" />
        )}
        {pathname === "/dashboard" ? (
          <h2 className="hidden md:block font-semibold text-2xl">Overview</h2>
        ) : pathname === "/dashboard/files" ? (
          <h2 className="hidden md:block font-semibold text-2xl">Files</h2>
        ) : pathname === "/dashboard/archieved" ? (
          <h2 className="hidden md:block font-semibold text-2xl">Archieved</h2>
        ) : (
          <h2 className="hidden md:block font-semibold text-2xl">
            Get Started
          </h2>
        )}
      </div>
      <div className="flex items-center gap-2">
        {(pathname === "/dashboard/files" ||
          pathname === "/dashboard/archieved") && (
          <div className="flex gap-2 items-center px-2">
            <Search className="h-4 w-4 absolute ml-2 " />
            <Input
              placeholder="Search files..."
              className="relative border rounded-md pl-7"
            />
          </div>
        )}

        <div>
          <Image
            src={user?.picture ?? "/user.webp"}
            alt="user profile"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
          />
        </div>
        {isMobile ? (
          <SendHorizontal className="hover:text-accent active:scale-90 cursor-pointer" />
        ) : (
          <Button className="bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/65 dark:text-foreground/90 cursor-pointer trans">
            <SendHorizontal />
            {!isMobile && "Invite"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
