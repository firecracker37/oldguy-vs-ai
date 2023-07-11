import NavMenu from "./NavMenu";
import UserAvatar from "./UserAvatar";

export default function Header() {
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <span className="rocksalt text-2xl font-extrabold text-gray-500">
          Old Guy
        </span>
        <span className="-skew-y-12 text-2xl font-extrabold tracking-widest text-red-700">
          vs
        </span>
        <span className="agdasima text-2xl font-extrabold tracking-[0.3em] text-amber-600">
          AI
        </span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <NavMenu />
        <UserAvatar />
      </div>
    </div>
  );
}
