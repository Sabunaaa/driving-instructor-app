"use client";

import React from "react";
// @ts-ignore
import { CheckCircle, AlertCircle } from "lucide-react";
import SettingsField from "@/components/ui/SettingsField";

interface PersonalInfoFormProps {
  formData: Record<string, any>;
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  saveStatus: "idle" | "success" | "error";
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  onInputChange,
  onSave,
  onCancel,
  isSaving,
  saveStatus,
}) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
