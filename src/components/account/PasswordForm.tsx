"use client";

import React from "react";
// @ts-ignore
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";

interface PasswordFormProps {
  passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onPasswordChange: (field: string, value: string) => void;
  showPassword: {
    current: boolean;
    new: boolean;
    confirm: boolean;
  };
  onToggleVisibility: (field: "current" | "new" | "confirm") => void;
  onUpdatePassword: () => void;
  pwdStatus: any;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  passwordData,
  onPasswordChange,
  showPassword,
  onToggleVisibility,
  onUpdatePassword,
  pwdStatus,
}) => {
  return (
    <div className="space-y-6">
      {/* Alerts */}
      {pwdStatus.type !== "idle" && (
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 ${
            pwdStatus.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {pwdStatus.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span className="text-sm font-medium">{pwdStatus.message}</span>
        </div>
      )}

      {/* Current Password */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-gray-900 text-base mb-2"
            style={{ fontFamily: "Inter", fontWeight: 500 }}
          >
            Current password
          </label>
          <div className="relative">
            <input
              type={showPassword.current ? "text" : "password"}
              value={passwordData.currentPassword}
              onChange={(e) => onPasswordChange("currentPassword", e.target.value)}
              placeholder="Enter current password"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-12"
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                padding: "12px 18px",
                width: "100%",
                height: "48px",
                border: "1px solid #CAD0D9",
                borderRadius: "8px",
              }}
            />
            <button
              type="button"
              onClick={() => onToggleVisibility("current")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword.current ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* New Password Fields */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-gray-900 text-base mb-2"
            style={{ fontFamily: "Inter", fontWeight: 500 }}
          >
            New password
          </label>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              value={passwordData.newPassword}
              onChange={(e) => onPasswordChange("newPassword", e.target.value)}
              placeholder="Enter new password"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-12"
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                padding: "12px 18px",
                width: "100%",
                height: "48px",
                border: "1px solid #CAD0D9",
                borderRadius: "8px",
              }}
            />
            <button
              type="button"
              onClick={() => onToggleVisibility("new")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword.new ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>
        <div>
          <label
            className="block text-gray-900 text-base mb-2"
            style={{ fontFamily: "Inter", fontWeight: 500 }}
          >
            Confirm new password
          </label>
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              value={passwordData.confirmPassword}
              onChange={(e) => onPasswordChange("confirmPassword", e.target.value)}
              placeholder="Confirm new password"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-12"
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                padding: "12px 18px",
                width: "100%",
                height: "48px",
                border: "1px solid #CAD0D9",
                borderRadius: "8px",
              }}
            />
            <button
              type="button"
              onClick={() => onToggleVisibility("confirm")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword.confirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Password Requirements */}
      <div className="text-sm text-gray-500 -mt-2">
        Use at least 8 characters, including letters and numbers.
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          style={{ fontFamily: "Inter", fontWeight: 500 }}
        >
          Cancel
        </button>
        <Button
          size="lg"
          onClick={onUpdatePassword}
          style={{ fontFamily: "Inter", fontWeight: 500 }}
        >
          Update password
        </Button>
      </div>
    </div>
  );
};
