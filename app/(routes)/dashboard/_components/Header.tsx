import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, SendHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { user }: any = useKindeBrowserClient();
  return (
    <div className="flex justify-end w-full items-center gap-2 mt-3">
      <div className="flex gap-2 items-center px-2">
        <Search className="h-4 w-4 absolute ml-2 " />
        <Input
          placeholder="Search..."
          className="relative border rounded-md pl-7"
        />
      </div>
      <div>
        <Image
          src={user?.picture}
          alt="user profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <Button className="bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/65 dark:text-foreground/90 cursor-pointer trans">
        <SendHorizontal />
        Invite
      </Button>
    </div>
  );
};

export default Header;
