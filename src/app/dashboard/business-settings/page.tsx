"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { InstructorDashboardNav } from "@/components/dashboard/instructor/InstructorDashboardNav";
import Button from "@/components/ui/Button";
import { DollarSign, Car, MapPin, Plus, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function BusinessSettingsPage() {
  const { user } = useAuth();
  const isInstructor = user?.userType === "instructor";
  const [activeTab, setActiveTab] = useState("rates");

  // Students don't have business settings page, redirect to dashboard
  if (!isInstructor) {
    redirect("/dashboard");
  }

  const tabs = [
    { id: "rates", label: "Rates & Packages", icon: DollarSign },
    { id: "vehicle", label: "Vehicle", icon: Car },
    { id: "area", label: "Service Area", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-20">
      <InstructorDashboardNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Business Settings</h1>
          <p className="text-gray-500 mt-1">Manage your business profile, rates, and vehicle information.</p>
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
            {activeTab === "rates" && <RatesSettings />}
            {activeTab === "vehicle" && <VehicleSettings />}
            {activeTab === "area" && <ServiceAreaSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

const RatesSettings = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-6">Standard Rates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
            <input 
              type="number" 
              defaultValue="60"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 focus:border-[#F03D3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Duration (Hours)</label>
            <select defaultValue="2 Hours" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 focus:border-[#F03D3D]">
              <option>1 Hour</option>
              <option>1.5 Hours</option>
              <option>2 Hours</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-gray-900">Packages</h3>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </Button>
        </div>
        
        <div className="space-y-4">
          {[
            { name: "Beginner Package", hours: 10, price: 550, savings: 50 },
            { name: "Intensive Course", hours: 20, price: 1000, savings: 200 },
          ].map((pkg, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
              <div>
                <h4 className="font-bold text-gray-900">{pkg.name}</h4>
                <p className="text-sm text-gray-500">{pkg.hours} Hours • Save ${pkg.savings}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className="font-bold text-lg">${pkg.price}</span>
                <button className="text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

const VehicleSettings = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-6">Vehicle Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
            <input 
              type="text" 
              defaultValue="Toyota"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 focus:border-[#F03D3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
            <input 
              type="text" 
              defaultValue="Corolla"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 focus:border-[#F03D3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input 
              type="number" 
              defaultValue="2022"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 focus:border-[#F03D3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
            <select defaultValue="Automatic" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 focus:border-[#F03D3D]">
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

const ServiceAreaSettings = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-6">Service Areas</h3>
        <p className="text-gray-500 mb-4">Select the areas where you provide driving lessons.</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {["Downtown", "Vake", "Saburtalo", "Digomi"].map((area, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-[#F03D3D] rounded-full text-sm font-medium">
              {area}
              <button className="hover:text-red-700">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add new area..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F03D3D]/20 focus:border-[#F03D3D]"
          />
          <Button variant="outline">Add</Button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};
