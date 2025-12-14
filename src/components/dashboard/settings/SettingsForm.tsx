"use client";

import React from "react";
import { User, Lock, Bell, CreditCard, Shield } from "lucide-react";

export const SettingsForm = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 border-r border-gray-100 bg-gray-50/50 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-[#F03D3D] font-medium shadow-sm border border-gray-100">
            <User className="w-4 h-4" />
            Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-white hover:text-gray-900 transition-colors">
            <Lock className="w-4 h-4" />
            Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-white hover:text-gray-900 transition-colors">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-white hover:text-gray-900 transition-colors">
            <CreditCard className="w-4 h-4" />
            Billing
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h3>
          
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-[#F03D3D] flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-md">
                I
              </div>
              <div>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 mb-2">
                  Change Photo
                </button>
                <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input type="text" defaultValue="Instructor" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" defaultValue="Name" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" defaultValue="instructor@example.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea rows={4} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 outline-none" defaultValue="Professional driving instructor with 5+ years of experience..." />
            </div>

            <div className="pt-4 flex gap-3">
              <button className="px-6 py-2.5 bg-[#F03D3D] text-white rounded-xl font-medium hover:bg-red-600 transition shadow-lg shadow-red-200">
                Save Changes
              </button>
              <button className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
