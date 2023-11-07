"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { ChevronsLeftRight } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserItem = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-md p-3 w-full hover:bg-primary/5 mt-10 transition duration-300"
        >
          <div className="gap-x-2 flex items-center w-max">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}&lsquo;s Jotivation
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.fullName}&lsquo;s Jotivation
              </p>
              <p className="text-xs font-medium leading-none text-muted-foreground">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div
          role="button"
          onClick={() => signOut()}
          className="w-full text-sm px-2 py-3 cursor-pointer text-muted-foreground hover:bg-primary/5 hover:font-semibold transition-all duration-300"
        >
          Log Out
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
