import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "./ui/button";

export default function UserAvatar() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <Button onClick={() => void signIn()}>Sign In</Button>;
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={sessionData.user?.image || ""} />
            <AvatarFallback className="bg-gray-700 text-white">
              {sessionData.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-900 text-gray-200">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          {sessionData.user.role === "admin" && (
            <DropdownMenuItem>New Post</DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <span onClick={() => void signOut()}>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    // return <Button onClick={() => void signOut()}>Sign Out</Button>;
  }
}
