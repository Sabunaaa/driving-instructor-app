"use client";

import React from "react";
//@ts-ignore
import { RefreshCcw, Plus, CheckCircle, AlertCircle } from "lucide-react";
import SettingsField from "@/components/ui/SettingsField";
import type { User } from "@/contexts/AuthContext";

interface PersonalInfoTabProps {
  user: User | null;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    languages: string;
    dateOfBirth: string;
    address: string;
    bio: string;
    city: string;
    transmission: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onAvatarChange: (file: File) => void;
  isSaving: boolean;
  saveStatus: "idle" | "success" | "error";
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
  user,
  formData,
  onInputChange,
  onSave,
  onCancel,
  onAvatarChange,
  isSaving,
  saveStatus,
}) => {
  const profileTasks = [
    "Add the languages ​​you speak",
    "Verified your email",
    "Add date of birth",
  ];

  return (
    <>
      {/* Profile Completion Section */}
      <div className="bg-orange-50 rounded-lg p-6 flex items-center gap-6">
        {/* Progress Circle */}
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FC9231"
              strokeWidth="2"
              strokeDasharray="65, 100"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-900 font-inter">
              65%
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold text-base mb-3 font-inter">
            Complete your profile
          </h3>
          <div className="flex gap-8">
            {profileTasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2">
                <Plus size={16} className="text-gray-500" />
                <span className="text-gray-500 text-sm font-inter">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 rounded-full border border-gray-200 overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user?.avatarUrl || "/images/404/profile.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 max-w-lg">
          <p className="text-gray-500 text-sm mb-4 font-inter">
            Your profile photo will appear on your profile and directory
            listing. PNG or JPG recommended. Max ~1MB.
          </p>
          <input
            id="avatar-file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                onAvatarChange(file);
              }
            }}
          />
          <button
            type="button"
            onClick={() =>
              document.getElementById("avatar-file-input")?.click()
            }
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RefreshCcw size={14} />
            <span className="font-medium text-sm font-inter">Update photo</span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SettingsField
            as="input"
            label="First name"
            required
            name="firstName"
            value={formData.firstName}
            onChange={(v) => onInputChange("firstName", v)}
          />
          <SettingsField
            as="input"
            label="Last name"
            required
            name="lastName"
            value={formData.lastName}
            onChange={(v) => onInputChange("lastName", v)}
          />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SettingsField
            as="input"
            type="email"
            label="Email address"
            required
            name="email"
            value={formData.email}
            onChange={(v) => onInputChange("email", v)}
            labelRight={
              <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium font-inter">
                Verify email
              </span>
            }
          />
          <SettingsField
            as="input"
            type="tel"
            label="Phone number"
            required
            name="phone"
            value={formData.phone}
            onChange={(v) => onInputChange("phone", v)}
            labelRight={
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium font-inter">
                Verified
              </span>
            }
          />
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SettingsField
            as="select"
            label="Languages you speak"
            name="languages"
            value={formData.languages}
            onChange={(v) => onInputChange("languages", v)}
            options={[
              { value: "", label: "Select languages" },
              { value: "english", label: "English" },
              { value: "spanish", label: "Spanish" },
              { value: "french", label: "French" },
              { value: "german", label: "German" },
            ]}
            rightIcon="chevron"
          />
          <SettingsField
            as="input"
            type="date"
            label="Date of birth"
            name="dateOfBirth"
            placeholder="Choose date"
            value={formData.dateOfBirth}
            onChange={(v) => onInputChange("dateOfBirth", v)}
            rightIcon="calendar"
            inputClassName="text-gray-500"
          />
        </div>

        {/* Fourth Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SettingsField
            as="input"
            label="City"
            name="city"
            value={formData.city}
            onChange={(v) => onInputChange("city", v)}
          />
          <SettingsField
            as="select"
            label="Transmission"
            name="transmission"
            value={formData.transmission}
            onChange={(v) => onInputChange("transmission", v)}
            options={[
              { value: "", label: "Select transmission" },
              { value: "automatic", label: "Automatic" },
              { value: "manual", label: "Manual" },
            ]}
            rightIcon="chevron"
          />
        </div>

        {/* Fifth Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SettingsField
            as="input"
            label="Address"
            required
            name="address"
            value={formData.address}
            onChange={(v) => onInputChange("address", v)}
          />
          <div />
        </div>

        {/* Bio */}
        <SettingsField
          as="textarea"
          label="Information about you"
          name="bio"
          value={formData.bio}
          onChange={(v) => onInputChange("bio", v)}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg font-medium font-inter hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className={`px-6 py-3 border rounded-lg font-medium font-inter transition-colors ${
            isSaving
              ? "bg-[#F03D3D]/70 border-[#F03D3D]/70 cursor-not-allowed"
              : "bg-[#F03D3D] border-[#F03D3D] hover:opacity-90"
          } text-white`}
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
        {saveStatus === "success" && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Changes saved</span>
          </div>
        )}
        {saveStatus === "error" && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle size={18} />
            <span className="text-sm font-medium">Failed to save</span>
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalInfoTab;
