"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
//@ts-ignore
import { FileText, File } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import PersonalInfoTab from "./components/PersonalInfoTab";
import PasswordSecurityTab from "./components/PasswordSecurityTab";

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

  const tabs = [
    { icon: FileText, label: "Personal info", active: true },
    { icon: File, label: "Password and security", active: false },
  ];

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

  const onCancel = () => {
    // Reset unsaved edits back to current user state
    setFormData({
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
  };

  const onAvatarChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      updateUser({ avatarUrl: dataUrl });
    };
    reader.readAsDataURL(file);
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
                    <PersonalInfoTab
                      user={user}
                      formData={formData}
                      onInputChange={handleInputChange}
                      onSave={onSave}
                      onCancel={onCancel}
                      onAvatarChange={onAvatarChange}
                      isSaving={isSaving}
                      saveStatus={saveStatus}
                    />
                  )}

                  {/* Password and Security Tab */}
                  {activeTab === "Password and security" && (
                    <PasswordSecurityTab
                      passwordData={passwordData}
                      onPasswordChange={handlePasswordChange}
                      onUpdatePassword={onUpdatePassword}
                      pwdStatus={pwdStatus}
                      deleteAccountChecked={deleteAccountChecked}
                      setDeleteAccountChecked={setDeleteAccountChecked}
                    />
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
