"use client";

import React from "react";
// @ts-ignore
import { RefreshCcw } from "lucide-react";

interface AvatarUploadProps {
  avatarUrl?: string;
  onAvatarChange: (dataUrl: string) => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  onAvatarChange,
}) => {
  return (
    <div className="flex items-center gap-6">
      <div className="w-32 h-32 rounded-full border border-gray-200 overflow-hidden bg-gray-100">
        <img
          src={avatarUrl || "/images/404/profile.jpg"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 max-w-lg">
        <p className="text-gray-500 text-sm mb-4 font-inter">
          Your profile photo will appear on your profile and directory listing.
          PNG or JPG recommended. Max ~1MB.
        </p>
        <input
          id="avatar-file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result as string;
              onAvatarChange(dataUrl);
            };
            reader.readAsDataURL(file);
          }}
        />
        <button
          type="button"
          onClick={() => document.getElementById("avatar-file-input")?.click()}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RefreshCcw size={14} />
          <span className="font-medium text-sm font-inter">Update photo</span>
        </button>
      </div>
    </div>
  );
};
