import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { memo } from "react";
import type { UserRole } from "../types";
import { ROUTES } from "../constants/routes";

interface NavBarProps {
  isLoggedIn: boolean;
  userRole?: UserRole;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export const NavBar = memo(function NavBar({
  isLoggedIn,
  userRole,
  onNavigate,
  onLogout,
}: NavBarProps) {
  // Hide navbar on admin page
  if (userRole === "admin") {
    return null;
  }

  return (
    <nav className="bg-[#2C3E50] text-white py-4 px-4 md:px-8 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onNavigate(ROUTES.LANDING)}
          title="Return to Home"
        >
          <Heart
            className="w-8 h-8 text-[#F39C12]"
            fill="#F39C12"
          />
          <div className="flex flex-col">
            <span className="text-xl leading-tight">
              Parents Luxuria
            </span>
            <span className="text-xs text-[#F39C12] hidden md:block">
              Premium Senior Wellness Care
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Button
                className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                onClick={() => onNavigate(ROUTES.LOGIN)}
              >
                Login
              </Button>
              <Button
                className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                onClick={() => onNavigate(ROUTES.REGISTER)}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <button
                className="hidden sm:block hover:text-[#F39C12] transition-colors"
                onClick={() => onNavigate(ROUTES.LANDING)}
              >
                Home
              </button>
              <button
                className="hover:text-[#F39C12] transition-colors"
                onClick={() => onNavigate(ROUTES.DASHBOARD)}
              >
                Dashboard
              </button>
              {/* Only show Appointments link for parent users */}
              {userRole === "parent" && (
                <button
                  className="hidden md:block hover:text-[#F39C12] transition-colors"
                  onClick={() =>
                    onNavigate(ROUTES.APPOINTMENTS)
                  }
                >
                  My Appointments
                </button>
              )}
              {/* Show Profile for parents and partners, not admins */}
              {userRole !== "admin" && (
                <button
                  className="hidden lg:block hover:text-[#F39C12] transition-colors"
                  onClick={() => onNavigate(ROUTES.PROFILE)}
                >
                  Profile
                </button>
              )}
              <Button
                className="bg-[#F39C12] hover:bg-[#F39C12]/90"
                onClick={onLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
});