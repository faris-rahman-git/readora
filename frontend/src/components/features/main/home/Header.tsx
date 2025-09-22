import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, LogOut, Search, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "/logo.png";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/userSlice";
import { useEffect } from "react";
import { hideLoader, showLoader } from "@/redux/features/common/LoaderSlice";
import { useLogout } from "@/hooks/auth/useLogout";

function Header({
  searchQuery,
  setSearchQuery,
  isSearchVisible = false,
}: {
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  isSearchVisible?: boolean;
}) {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { isPending, isSuccess, mutate } = useLogout();

  const handleLogout = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout());
    }
  }, [isSuccess]);
  useEffect(() => {
    const pending = isPending;
    dispatch(pending ? showLoader() : hideLoader());
  }, [isPending]);

  return (
    <header className="bg-slate-900 w-full border-b border-slate-800 sticky top-0 z-40">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3">
              <img src={logo} alt="logo" />
            </div>
            <span className="text-xl font-bold text-white">Readora</span>
          </Link>

          {/* Search */}
          {isSearchVisible && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        user.avatar ||
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-geometric-shapes-kZodpXGM31YV1OwpENLkB4vSYvBL4Y.png"
                      }
                    />
                    <AvatarFallback className="bg-slate-800 text-slate-300">
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-slate-800 border-slate-700"
                align="end"
              >
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="w-[200px] truncate text-sm text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-slate-700" />
                <Link to="/my-articles">
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                    <FileText className="mr-2 h-4 w-4" />
                    My Articles
                  </DropdownMenuItem>
                </Link>
                <Link to="/settings">
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-slate-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
