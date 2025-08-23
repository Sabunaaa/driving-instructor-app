'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
//@ts-ignore
import { FileText, File, Archive, Plus, RefreshCcw, Calendar, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import AccountSidebar from '@/components/dashboard/AccountSidebar';

const AccountSettings = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  const [activeTab, setActiveTab] = useState('Personal info');
  const [formData, setFormData] = useState({
    firstName: 'Michael',
    lastName: 'Williams', 
    email: 'm.williams@example.com',
    phone: '(212) 555-7890',
    languages: '',
    dateOfBirth: '',
    address: 'New York, Brooklyn',
    bio: "I'm selling my house through a real estate agent to reach more buyers and ensure a smooth process. I've staged the home and listed it online, hoping to find a buyer soon."
  });

  const tabs = [
    { icon: FileText, label: 'Personal info', active: true },
    { icon: File, label: 'Password and security', active: false },
    { icon: Archive, label: 'Notification settings', active: false }
  ];

  const profileTasks = [
    'Add the languages ​​you speak',
    'Verified your email', 
    'Add date of birth'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Navbar */}
      <Navbar />
      
      {/* Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
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
                      ? 'bg-gray-100 border-gray-900 text-gray-900' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-gray-900' : 'text-gray-500'} />
                  <span className="font-medium text-sm font-inter">{tab.label}</span>
                </button>
              );
            })}
          </div>

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
                <span className="text-xl font-semibold text-gray-900 font-inter">65%</span>
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
              <img 
                src="/api/placeholder/124/124" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 max-w-lg">
              <p className="text-gray-500 text-sm mb-4 font-inter">
                Your profile photo will appear on your profile and directory listing. 
                PNG or JPG no bigger than 1000px wide and tall.
              </p>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                <RefreshCcw size={14} />
                <span className="font-medium text-sm font-inter">Update photo</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                  First name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  style={{ 
                    fontFamily: 'Inter', 
                    fontWeight: 400,
                    padding: '12px 18px',
                    width: '100%',
                    height: '48px',
                    border: '1px solid #CAD0D9',
                    borderRadius: '8px'
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                  Last name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  style={{ 
                    fontFamily: 'Inter', 
                    fontWeight: 400,
                    padding: '12px 18px',
                    width: '100%',
                    height: '48px',
                    border: '1px solid #CAD0D9',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-gray-900 text-base" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                    Email address*
                  </label>
                  <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-medium font-inter">
                    Verify email
                  </span>
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  style={{ 
                    fontFamily: 'Inter', 
                    fontWeight: 400,
                    padding: '12px 18px',
                    width: '100%',
                    height: '48px',
                    border: '1px solid #CAD0D9',
                    borderRadius: '8px'
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-gray-900 text-base" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                    Phone number *
                  </label>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium font-inter">
                    Verified
                  </span>
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  style={{ 
                    fontFamily: 'Inter', 
                    fontWeight: 400,
                    padding: '12px 18px',
                    width: '100%',
                    height: '48px',
                    border: '1px solid #CAD0D9',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                  Languages ​​you speak
                </label>
                <div className="relative">
                  <select
                    value={formData.languages}
                    onChange={(e) => handleInputChange('languages', e.target.value)}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 appearance-none"
                    style={{ 
                      fontFamily: 'Inter', 
                      fontWeight: 400,
                      padding: '12px 18px',
                      width: '100%',
                      height: '48px',
                      border: '1px solid #CAD0D9',
                      borderRadius: '8px'
                    }}
                  >
                    <option value="">Select languages</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                  Date of birth
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    placeholder="Choose date"
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                    style={{ 
                      fontFamily: 'Inter', 
                      fontWeight: 400,
                      padding: '12px 18px',
                      width: '100%',
                      height: '48px',
                      border: '1px solid #CAD0D9',
                      borderRadius: '8px'
                    }}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>
            </div>

            {/* Fourth Row */}
            <div>
              <label className="block text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                Address *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                style={{ 
                  fontFamily: 'Inter', 
                  fontWeight: 400,
                  padding: '12px 18px',
                  width: '100%',
                  height: '48px',
                  border: '1px solid #CAD0D9',
                  borderRadius: '8px'
                }}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                Information about you
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
                style={{ 
                  fontFamily: 'Inter', 
                  fontWeight: 400,
                  padding: '12px 18px',
                  width: '100%',
                  minHeight: '96px',
                  border: '1px solid #CAD0D9',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg font-medium font-inter hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium font-inter hover:bg-gray-800 transition-colors">
              Save changes
            </button>
          </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
