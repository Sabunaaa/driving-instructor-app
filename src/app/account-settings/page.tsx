"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import { FileText, File } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "@/hooks";
import { personalInfoValidation, passwordChangeValidation } from "@/utils/validation/schemas";
import AccountSidebar from "@/components/dashboard/AccountSidebar";
import { ProfileCompletion } from "@/components/account/ProfileCompletion";
import { AvatarUpload } from "@/components/account/AvatarUpload";
import { SettingsTabs } from "@/components/account/SettingsTabs";
import { PersonalInfoForm } from "@/components/account/PersonalInfoForm";
import { PasswordForm } from "@/components/account/PasswordForm";
import { DeleteAccountSection } from "@/components/account/DeleteAccountSection";

const AccountSettings = () => {
  const { user, updateUser, updatePassword } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Personal info");
  const [deleteAccountChecked, setDeleteAccountChecked] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Personal Info Form
  const personalInfoForm = useForm(
    {
      firstName: user?.firstName || (user?.name?.split(" ")[0] ?? ""),
      lastName: user?.lastName || (user?.name?.split(" ").slice(1).join(" ") ?? ""),
      email: user?.email || "",
      phone: user?.phone || "",
      languages: user?.languages || "",
      dateOfBirth: user?.dateOfBirth || "",
      address: user?.address || "",
      bio: user?.bio || "I'm selling my house through a real estate agent...",
      city: user?.city || "",
      transmission: user?.transmission || "",
    },
    async (values) => {
      try {
        updateUser({
          firstName: values.firstName,
          lastName: values.lastName,
          name: `${values.firstName} ${values.lastName}`.trim(),
          email: values.email,
          phone: values.phone,
          languages: values.languages,
          dateOfBirth: values.dateOfBirth,
          address: values.address,
          bio: values.bio,
          city: values.city,
          transmission: values.transmission as any,
        });
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2500);
      } catch (e) {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 2500);
      }
    },
    personalInfoValidation
  );

  // Password Form
  const passwordForm = useForm(
    {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    async (values) => {
      const ok = await updatePassword(values.currentPassword, values.newPassword);
      if (!ok) {
        throw new Error("Current password is incorrect");
      }
    },
    passwordChangeValidation
  );

  const handlePersonalInfoChange = (field: string, value: string) => {
    personalInfoForm.handleChange({
      target: { name: field, value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handlePasswordChange = (field: string, value: string) => {
    passwordForm.handleChange({
      target: { name: field, value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onCancel = () => {
    personalInfoForm.resetForm();
  };

  // Tab Configuration
  const tabs = [
    { icon: FileText, label: "Personal info" },
    { icon: File, label: "Password and security" },
  ];

  const profileTasks = [
    "Add the languages ​​you speak",
    "Verified your email",
    "Add date of birth",
  ];

  if (!user) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="mx-auto w-full px-12 md:px-16 lg:px-24 2xl:px-[220px] 3xl:px-[260px] py-8 max-w-[1296px] 2xl:max-w-none 3xl:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar activeItem="Account settings" />

          <main className="flex-1">
            <div className="flex flex-col gap-8">
              <h1 className="text-gray-900 font-semibold text-3xl font-inter">
                Account settings
              </h1>

              <SettingsTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={tabs}
              />

              {/* Personal Info Tab */}
              {activeTab === "Personal info" && (
                <>
                  <ProfileCompletion completionPercentage={65} tasks={profileTasks} />

                  <AvatarUpload
                    avatarUrl={user?.avatarUrl}
                    onAvatarChange={(dataUrl) => updateUser({ avatarUrl: dataUrl })}
                  />

                  <PersonalInfoForm
                    formData={personalInfoForm.values}
                    onInputChange={handlePersonalInfoChange}
                    onSave={personalInfoForm.handleSubmit}
                    onCancel={onCancel}
                    isSaving={personalInfoForm.isSubmitting}
                    saveStatus={saveStatus}
                  />
                </>
              )}

              {/* Password and Security Tab */}
              {activeTab === "Password and security" && (
                <>
                  <PasswordForm
                    passwordData={passwordForm.values}
                    onPasswordChange={handlePasswordChange}
                    showPassword={showPassword}
                    onToggleVisibility={togglePasswordVisibility}
                    onUpdatePassword={passwordForm.handleSubmit}
                    pwdStatus={{
                      type: Object.keys(passwordForm.errors).length > 0 ? "error" : "idle",
                      message: Object.values(passwordForm.errors)[0] || ""
                    }}
                  />

                  <DeleteAccountSection
                    isChecked={deleteAccountChecked}
                    onCheckChange={setDeleteAccountChecked}
                  />
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
