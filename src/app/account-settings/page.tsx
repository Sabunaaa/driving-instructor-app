"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
//@ts-ignore
import {
  FileText,
  File,
  Archive,
  Plus,
  RefreshCcw,
  Calendar,
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import Button from "@/components/ui/Button";
import SettingsField from "@/components/ui/SettingsField";

export type PaymentMethod = {
  id: string;
  type: "card" | "paypal";
  label: string; // e.g., Visa •••• 4242
  last4?: string;
  brand?: string;
  isDefault?: boolean;
};

// Helper function to infer card brand
const inferBrand = (number: string): string => {
  const cleaned = number.replace(/\s+/g, '');
  if (cleaned.startsWith('4')) return 'Visa';
  if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'Mastercard';
  if (cleaned.startsWith('3')) return 'Amex';
  return 'Card';
};

const AccountSettings = () => {
  const { user, updateUser, updatePassword } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const [activeTab, setActiveTab] = useState("Personal info");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    firstName: user?.firstName || (user?.name?.split(" ")[0] ?? ""),
    lastName:
      user?.lastName || (user?.name?.split(" ").slice(1).join(" ") ?? ""),
    email: user?.email || "",
    phone: user?.phone || "",
    languages: user?.languages || "",
    dateOfBirth: user?.dateOfBirth || "",
    address: user?.address || "",
    bio:
      user?.bio ||
      "I'm selling my house through a real estate agent to reach more buyers and ensure a smooth process. I've staged the home and listed it online, hoping to find a buyer soon.",
    city: user?.city || "",
    transmission: user?.transmission || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [pwdStatus, setPwdStatus] = useState<
    | { type: "idle" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });
  const [deleteAccountChecked, setDeleteAccountChecked] = useState(false);
  
  // Payment methods state
  const storageKey = useMemo(
    () => (user ? `payment-methods-${user.id}` : "payment-methods-guest"),
    [user]
  );
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    type: "card" as const,
    name: "",
    number: "",
    exp: "",
    cvc: "",
  });

  const tabs = [
    { icon: FileText, label: "Personal info", active: true },
    { icon: File, label: "Password and security", active: false },
    { icon: CreditCard, label: "Payment settings", active: false },
  ];

  const profileTasks = [
    "Add the languages ​​you speak",
    "Verified your email",
    "Add date of birth",
  ];

  // Load payment methods
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setMethods(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  // Persist payment methods
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(methods));
    } catch {}
  }, [methods, storageKey]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setPwdStatus({ type: "idle" });
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Payment methods functions
  const addMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.number || form.number.length < 4) return;
    const last4 = form.number.replace(/\s+/g, "").slice(-4);
    const brand = inferBrand(form.number);
    const label = `${brand} •••• ${last4}`;
    const newMethod: PaymentMethod = {
      id: `${Date.now()}`,
      type: "card",
      label,
      last4,
      brand,
      isDefault: methods.length === 0, // first becomes default
    };
    setMethods((m) => [newMethod, ...m]);
    setAdding(false);
    setForm({ type: "card", name: "", number: "", exp: "", cvc: "" });
  };

  const setDefault = (id: string) => {
    setMethods((m) => m.map((pm) => ({ ...pm, isDefault: pm.id === id })));
  };

  const removeMethod = (id: string) => {
    setMethods((m) => {
      const filtered = m.filter((pm) => pm.id !== id);
      if (!filtered.some((pm) => pm.isDefault) && filtered[0]) {
        filtered[0].isDefault = true; // ensure someone is default if any left
      }
      return filtered;
    });
  };


  // Keep form in sync if user is updated elsewhere (e.g., avatar change)
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      firstName: user?.firstName || (user?.name?.split(" ")[0] ?? ""),
      lastName:
        user?.lastName || (user?.name?.split(" ").slice(1).join(" ") ?? ""),
      email: user?.email || "",
      phone: user?.phone || "",
      languages: user?.languages || "",
      dateOfBirth: user?.dateOfBirth || "",
      address: user?.address || "",
      bio:
        user?.bio ||
        "I'm selling my house through a real estate agent to reach more buyers and ensure a smooth process. I've staged the home and listed it online, hoping to find a buyer soon.",
      city: user?.city || "",
      transmission: user?.transmission || "",
    }));
  }, [user]);

  const onSave = async () => {
    try {
      setIsSaving(true);
      setSaveStatus("idle");
      updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        languages: formData.languages,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        bio: formData.bio,
        city: formData.city,
        transmission: formData.transmission as any,
      });
      setSaveStatus("success");
    } catch (e) {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
      // Auto-hide success after a short delay
      setTimeout(() => setSaveStatus("idle"), 2500);
    }
  };

  const validateNewPassword = (pwd: string) => {
    // Basic strength rules for demo: min 8 chars, one letter and one number
    const minLen = pwd.length >= 8;
    const hasLetter = /[A-Za-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    return minLen && hasLetter && hasNumber;
  };

  const onUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setPwdStatus({ type: "error", message: "Fill in all required fields." });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPwdStatus({ type: "error", message: "New passwords do not match." });
      return;
    }
    if (!validateNewPassword(passwordData.newPassword)) {
      setPwdStatus({
        type: "error",
        message: "Password must be 8+ chars with letters and numbers.",
      });
      return;
    }

    const ok = await updatePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    );
    if (!ok) {
      setPwdStatus({
        type: "error",
        message: "Current password is incorrect.",
      });
      return;
    }
    setPwdStatus({
      type: "success",
      message: "Password updated successfully.",
    });
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Dashboard Layout */}
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Loading state while redirecting or fetching user */}
          {!user ? (
            <div className="min-h-[60vh] w-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Account Sidebar */}
              <AccountSidebar activeItem="Account settings" />

              {/* Main Content */}
              <main className="flex-1">
                <div className="flex flex-col gap-8">
                  {/* Header */}
                  <h1 className="text-gray-900 font-semibold text-3xl font-inter">
                    Account settings
                  </h1>

                  {/* Tabs */}
                  <div className="flex gap-3">
                    {tabs.map((tab, index) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.label;

                      return (
                        <button
                          key={index}
                          onClick={() => setActiveTab(tab.label)}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-colors ${
                            isActive
                              ? "bg-gray-100 border-gray-900 text-gray-900"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <Icon
                            size={14}
                            className={
                              isActive ? "text-gray-900" : "text-gray-500"
                            }
                          />
                          <span className="font-medium text-sm font-inter">
                            {tab.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Content */}
                  {activeTab === "Personal info" && (
                    <>
                      {/* Profile Completion Section */}
                      <div className="bg-orange-50 rounded-lg p-6 flex items-center gap-6">
                        {/* Progress Circle */}
                        <div className="relative w-24 h-24">
                          <svg
                            className="w-24 h-24 -rotate-90"
                            viewBox="0 0 36 36"
                          >
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
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Plus size={16} className="text-gray-500" />
                                <span className="text-gray-500 text-sm font-inter">
                                  {task}
                                </span>
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
                            Your profile photo will appear on your profile and
                            directory listing. PNG or JPG recommended. Max ~1MB.
                          </p>
                          <input
                            id="avatar-file-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = () => {
                                const dataUrl = reader.result as string;
                                updateUser({ avatarUrl: dataUrl });
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("avatar-file-input")
                                ?.click()
                            }
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <RefreshCcw size={14} />
                            <span className="font-medium text-sm font-inter">
                              Update photo
                            </span>
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
                            onChange={(v) => handleInputChange("firstName", v)}
                          />
                          <SettingsField
                            as="input"
                            label="Last name"
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={(v) => handleInputChange("lastName", v)}
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
                            onChange={(v) => handleInputChange("email", v)}
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
                            onChange={(v) => handleInputChange("phone", v)}
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
                            onChange={(v) => handleInputChange("languages", v)}
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
                            onChange={(v) =>
                              handleInputChange("dateOfBirth", v)
                            }
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
                            onChange={(v) => handleInputChange("city", v)}
                          />
                          <SettingsField
                            as="select"
                            label="Transmission"
                            name="transmission"
                            value={formData.transmission}
                            onChange={(v) =>
                              handleInputChange("transmission", v)
                            }
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
                            onChange={(v) => handleInputChange("address", v)}
                          />
                          <div />
                        </div>

                        {/* Bio */}
                        <SettingsField
                          as="textarea"
                          label="Information about you"
                          name="bio"
                          value={formData.bio}
                          onChange={(v) => handleInputChange("bio", v)}
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            // Reset unsaved edits back to current user state
                            setFormData({
                              firstName:
                                user?.firstName ||
                                (user?.name?.split(" ")[0] ?? ""),
                              lastName:
                                user?.lastName ||
                                (user?.name?.split(" ").slice(1).join(" ") ??
                                  ""),
                              email: user?.email || "",
                              phone: user?.phone || "",
                              languages: user?.languages || "",
                              dateOfBirth: user?.dateOfBirth || "",
                              address: user?.address || "",
                              bio:
                                user?.bio ||
                                "I'm selling my house through a real estate agent to reach more buyers and ensure a smooth process. I've staged the home and listed it online, hoping to find a buyer soon.",
                              city: user?.city || "",
                              transmission: user?.transmission || "",
                            });
                          }}
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
                            <span className="text-sm font-medium">
                              Changes saved
                            </span>
                          </div>
                        )}
                        {saveStatus === "error" && (
                          <div className="flex items-center gap-2 text-red-600">
                            <AlertCircle size={18} />
                            <span className="text-sm font-medium">
                              Failed to save
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Password and Security Tab */}
                  {activeTab === "Password and security" && (
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
                            <span className="text-sm font-medium">
                              {pwdStatus.message}
                            </span>
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
                                type={
                                  showPassword.current ? "text" : "password"
                                }
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                  handlePasswordChange(
                                    "currentPassword",
                                    e.target.value
                                  )
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
                                onClick={() =>
                                  togglePasswordVisibility("current")
                                }
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
                                onChange={(e) =>
                                  handlePasswordChange(
                                    "newPassword",
                                    e.target.value
                                  )
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
                                type={
                                  showPassword.confirm ? "text" : "password"
                                }
                                value={passwordData.confirmPassword}
                                onChange={(e) =>
                                  handlePasswordChange(
                                    "confirmPassword",
                                    e.target.value
                                  )
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
                                onClick={() =>
                                  togglePasswordVisibility("confirm")
                                }
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
                          Use at least 8 characters, including letters and
                          numbers.
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
                          When you delete your account, your public profile will
                          be deactivated immediately. If you change your mind
                          before the 14 days are up, sign in with your email and
                          password, and we'll send a link to reactivate account.
                        </p>

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="deleteAccount"
                            checked={deleteAccountChecked}
                            onChange={(e) =>
                              setDeleteAccountChecked(e.target.checked)
                            }
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
                  )}

                  {/* Payment Settings Tab */}
                  {activeTab === "Payment settings" && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <CreditCard size={20} className="text-red-600" />
                          </div>
                          <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                              Payment methods
                            </h1>
                            <p className="text-sm text-gray-500">
                              Add and manage your payment options
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Methods list */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                        {methods.length === 0 ? (
                          <div className="text-center py-10">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                              <CreditCard size={20} className="text-red-600" />
                            </div>
                            <p className="text-gray-700 mb-4">
                              No payment methods yet. Add one to book lessons instantly.
                            </p>
                            {!adding && (
                              <Button
                                onClick={() => setAdding(true)}
                                aria-label="Add your first payment method"
                              >
                                <div className="flex items-center gap-2">
                                  <Plus size={16} />
                                  <span>Add payment method</span>
                                </div>
                              </Button>
                            )}
                          </div>
                        ) : (
                          <ul className="divide-y divide-gray-100">
                            {methods.map((pm) => (
                              <li
                                key={pm.id}
                                className="py-4 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                                    <CreditCard size={16} className="text-gray-500" />
                                  </div>
                                  <div>
                                    <div className="text-gray-900 font-medium">
                                      {pm.label}
                                    </div>
                                    {pm.isDefault ? (
                                      <div className="text-xs text-green-600 flex items-center gap-1">
                                        <CheckCircle2 size={12} /> Default
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => setDefault(pm.id)}
                                        className="text-xs text-red-600 hover:underline"
                                      >
                                        Make default
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeMethod(pm.id)}
                                  className="text-gray-500 hover:text-red-600"
                                  aria-label={`Remove ${pm.label}`}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Add form */}
                      {adding && (
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Add a new card
                          </h2>
                          <form
                            className="space-y-3"
                            onSubmit={addMethod}
                            aria-label="Add payment method form"
                          >
                            <div>
                              <label className="block text-sm text-gray-700 mb-1">
                                Name on card
                              </label>
                              <input
                                value={form.name}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, name: e.target.value }))
                                }
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="John Student"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-700 mb-1">
                                Card number
                              </label>
                              <input
                                inputMode="numeric"
                                value={form.number}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, number: e.target.value }))
                                }
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="4242 4242 4242 4242"
                                minLength={12}
                                required
                              />
                            </div>
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <label className="block text-sm text-gray-700 mb-1">
                                  Exp
                                </label>
                                <input
                                  value={form.exp}
                                  onChange={(e) =>
                                    setForm((f) => ({ ...f, exp: e.target.value }))
                                  }
                                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                  placeholder="MM/YY"
                                  required
                                />
                              </div>
                              <div className="w-28">
                                <label className="block text-sm text-gray-700 mb-1">
                                  CVC
                                </label>
                                <input
                                  inputMode="numeric"
                                  value={form.cvc}
                                  onChange={(e) =>
                                    setForm((f) => ({ ...f, cvc: e.target.value }))
                                  }
                                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                  placeholder="123"
                                  minLength={3}
                                  required
                                />
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <Button type="submit">Save method</Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setAdding(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}

                      {!adding && methods.length > 0 && (
                        <Button
                          onClick={() => setAdding(true)}
                          className="w-full sm:w-auto"
                          aria-label="Add another payment method"
                        >
                          <div className="flex items-center gap-2">
                            <Plus size={16} />
                            <span>Add another method</span>
                          </div>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </main>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
