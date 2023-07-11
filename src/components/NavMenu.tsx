import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { VscThreeBars } from "react-icons/vsc";

export default function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <VscThreeBars className="h-10 w-10 p-1 text-gray-700" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 text-gray-200">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Home</DropdownMenuItem>
        <DropdownMenuItem>Recent Posts</DropdownMenuItem>
        <DropdownMenuItem>Projects</DropdownMenuItem>
        <DropdownMenuItem>Contact</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
