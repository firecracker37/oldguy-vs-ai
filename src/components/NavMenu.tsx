import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { VscThreeBars } from "react-icons/vsc";
import Link from "next/link";

export default function NavMenu() {
  const { data: sessionData } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <VscThreeBars className="h-10 w-10 p-1 text-gray-700" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 text-gray-200">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/">
          <DropdownMenuItem>Home</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Recent Posts</DropdownMenuItem>
        <DropdownMenuItem>Projects</DropdownMenuItem>
        <DropdownMenuItem>Contact</DropdownMenuItem>
        {sessionData?.user.role === "admin" && (
          <>
            <DropdownMenuSeparator />
            <Link href="/post">
              <DropdownMenuItem>New Post</DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
