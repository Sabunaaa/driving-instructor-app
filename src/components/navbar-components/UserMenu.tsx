"use client";

import React from "react";
import { ChevronDown, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export interface UserMenuProps {
  user: any;
  isDropdownOpen: boolean;
  onDropdownToggle: (open: boolean) => void;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  user,
  isDropdownOpen,
  onDropdownToggle,
  onLogout,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 pl-2 relative">
      <button
        type="button"
        onClick={() => onDropdownToggle(!isDropdownOpen)}
        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer min-w-[192px]"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={`${user.name} avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={16} className="text-gray-600" />
            )}
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.userType}</p>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform flex-shrink-0 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <button
            type="button"
            onClick={() => {
              onDropdownToggle(false);
              router.push("/dashboard");
            }}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <User size={16} className="text-gray-400" />
            Profile
          </button>
          <button
            type="button"
            onClick={() => {
              onDropdownToggle(false);
              router.push("/account-settings");
            }}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings size={16} className="text-gray-400" />
            Settings
          </button>
          <button
            type="button"
            onClick={() => {
              onDropdownToggle(false);
              router.push("/help");
            }}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <HelpCircle size={16} className="text-gray-400" />
            Help
          </button>
          <hr className="my-2 border-gray-200" />
          <button
            type="button"
            onClick={() => {
              onDropdownToggle(false);
              onLogout();
              router.push("/");
            }}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} className="text-red-500" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
