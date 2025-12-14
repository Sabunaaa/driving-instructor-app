"use client";

import React, { useState } from "react";
import { useAuth, User } from "@/contexts/AuthContext";
import { DashboardNav } from "@/components/dashboard/student/DashboardNav";
import { InstructorDashboardNav } from "@/components/dashboard/instructor/InstructorDashboardNav";
import Button from "@/components/ui/Button";
import { Camera, User as UserIcon, Lock, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const isInstructor = user?.userType === "instructor";
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      {isInstructor ? <InstructorDashboardNav /> : <DashboardNav />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all
                    ${activeTab === tab.id 
                      ? "bg-white text-[#F03D3D] shadow-sm ring-1 ring-gray-200" 
                      : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }
                  `}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {activeTab === "profile" && <ProfileSettings user={user} isInstructor={isInstructor} />}
            {activeTab === "security" && <SecuritySettings user={user} />}
            {activeTab === "notifications" && <NotificationSettings isInstructor={isInstructor} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Pick only the fields ProfileSettings actually uses
type ProfileUser = Pick<User, 'photoURL' | 'firstName' | 'lastName' | 'phone' | 'address' | 'bio' | 'city' | 'zipCode'> | null;

const ProfileSettings = ({ user, isInstructor }: { user: ProfileUser; isInstructor: boolean }) => {
  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="relative group cursor-pointer flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400 border-2 border-white shadow-sm overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user?.firstName?.[0] || (isInstructor ? "I" : "U")
            )}
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-lg text-gray-900">Profile Photo</h3>
          <p className="text-sm text-gray-500 mb-3">Upload a clear photo of yourself.</p>
          <div className="flex gap-3 justify-center sm:justify-start">
            <Button size="sm" variant="outline">Change Photo</Button>
            <Button size="sm" variant="subtle" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-transparent">Remove</Button>
          </div>
        </div>
      </div>

      {/* Personal Info Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" defaultValue={user?.firstName} />
          <InputField label="Last Name" defaultValue={user?.lastName} />
          <InputField label="Phone Number" type="tel" defaultValue={user?.phone} />
          <div className="md:col-span-2">
            <InputField label="Address" defaultValue={user?.address} />
          </div>
          {isInstructor && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
              <textarea 
                className="w-full px-4 py-2.5 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#F03D3D]/20 focus:border-[#F03D3D] rounded-xl transition-all outline-none text-sm min-h-[100px]"
                defaultValue={user?.bio || "Professional driving instructor with 5+ years of experience..."}
              />
            </div>
          )}
          {!isInstructor && (
            <>
              <InputField label="City" defaultValue={user?.city} />
              <InputField label="Postal Code" defaultValue={user?.zipCode} />
            </>
          )}
        </div>
        <div className="mt-8 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

// Pick only the fields SecuritySettings actually uses
type SecurityUser = Pick<User, 'email'> | null;

const SecuritySettings = ({ user }: { user: SecurityUser }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-6">Email Address</h3>
        <div className="max-w-md">
          <InputField label="Email" type="email" defaultValue={user?.email} disabled />
          <p className="text-xs text-gray-500 mt-2">Contact support to change your email address.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-6">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <InputField label="Current Password" type="password" />
          <InputField label="New Password" type="password" />
          <InputField label="Confirm New Password" type="password" />
        </div>
        <div className="mt-8 flex justify-end">
          <Button>Update Password</Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-50 rounded-xl">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">Delete Account</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = ({ isInstructor }: { isInstructor: boolean }) => {
  const studentNotifications = [
    { title: "Lesson Reminders", desc: "Get notified 24h before your lesson starts" },
    { title: "New Messages", desc: "Receive emails when you get a new message" },
    { title: "Marketing Updates", desc: "Receive news about features and promotions" },
  ];

  const instructorNotifications = [
    { title: "New Bookings", desc: "Get notified when a student books a lesson" },
    { title: "Cancellations", desc: "Get notified when a lesson is cancelled" },
    { title: "New Messages", desc: "Receive emails when you get a new message" },
    { title: "Marketing Updates", desc: "Receive news about features and promotions" },
  ];

  const notifications = isInstructor ? instructorNotifications : studentNotifications;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-lg text-gray-900 mb-6">Notifications</h3>
      <div className="space-y-6">
        {notifications.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
            <div>
              <h4 className="font-medium text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F03D3D]"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField = ({ label, ...props }: InputFieldProps) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      className="w-full px-4 py-2.5 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#F03D3D]/20 focus:border-[#F03D3D] rounded-xl transition-all outline-none text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      {...props}
    />
  </div>
);
