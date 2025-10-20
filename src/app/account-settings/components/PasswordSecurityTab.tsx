"use client";

import React, { useState } from "react";
//@ts-ignore
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";

interface PasswordSecurityTabProps {
  passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onPasswordChange: (field: string, value: string) => void;
  onUpdatePassword: () => Promise<void>;
  pwdStatus:
    | { type: "idle" }
    | { type: "success"; message: string }
    | { type: "error"; message: string };
  deleteAccountChecked: boolean;
  setDeleteAccountChecked: (checked: boolean) => void;
}

const PasswordSecurityTab: React.FC<PasswordSecurityTabProps> = ({
  passwordData,
  onPasswordChange,
  onUpdatePassword,
  pwdStatus,
  deleteAccountChecked,
  setDeleteAccountChecked,
}) => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <>
      {/* Password Settings */}
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
                onChange={(e) =>
                  onPasswordChange("currentPassword", e.target.value)
                }
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
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
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
                onChange={(e) =>
                  onPasswordChange("newPassword", e.target.value)
                }
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
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
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
                onChange={(e) =>
                  onPasswordChange("confirmPassword", e.target.value)
                }
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
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="text-sm text-gray-500 -mt-2">
          Use at least 8 characters, including letters and numbers.
        </div>

        {/* Password Update Buttons */}
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

      {/* Delete Account */}
      <div className="space-y-6">
        <h2
          className="text-2xl font-semibold text-gray-900"
          style={{ fontFamily: "Inter", fontWeight: 600 }}
        >
          Delete account
        </h2>

        <p
          className="text-gray-600"
          style={{ fontFamily: "Inter", fontWeight: 400 }}
        >
          When you delete your account, your public profile will be deactivated
          immediately. If you change your mind before the 14 days are up, sign
          in with your email and password, and we'll send a link to reactivate
          account.
        </p>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="deleteAccount"
            checked={deleteAccountChecked}
            onChange={(e) => setDeleteAccountChecked(e.target.checked)}
            className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label
            htmlFor="deleteAccount"
            className="text-gray-600"
            style={{ fontFamily: "Inter", fontWeight: 400 }}
          >
            Yes, I want to delete my account
          </label>
        </div>

        <button
          disabled={!deleteAccountChecked}
          className={`px-6 py-3 border rounded-lg font-medium transition-colors ${
            deleteAccountChecked
              ? "border-red-500 text-red-500 hover:bg-red-50"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
          style={{ fontFamily: "Inter", fontWeight: 500 }}
        >
          Delete account
        </button>
      </div>
    </>
  );
};

export default PasswordSecurityTab;
