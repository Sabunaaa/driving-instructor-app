"use client";

import React from "react";

interface DeleteAccountSectionProps {
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}

export const DeleteAccountSection: React.FC<DeleteAccountSectionProps> = ({
  isChecked,
  onCheckChange,
}) => {
  return (
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
        immediately. If you change your mind before the 14 days are up, sign in
        with your email and password, and we'll send a link to reactivate
        account.
      </p>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="deleteAccount"
          checked={isChecked}
          onChange={(e) => onCheckChange(e.target.checked)}
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
        disabled={!isChecked}
        className={`px-6 py-3 border rounded-lg font-medium transition-colors ${
          isChecked
            ? "border-red-500 text-red-500 hover:bg-red-50"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
        }`}
        style={{ fontFamily: "Inter", fontWeight: 500 }}
      >
        Delete account
      </button>
    </div>
  );
};
