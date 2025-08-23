'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
//@ts-ignore
import { FileText, File, Archive, Plus, RefreshCcw, Calendar, ChevronDown, Eye, EyeOff, Monitor, Smartphone, MoreVertical, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import AccountSidebar from '@/components/dashboard/AccountSidebar';
import ToggleSwitch from '@/components/ui/ToggleSwitch';

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
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
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
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [deleteAccountChecked, setDeleteAccountChecked] = useState(false);
  const [notifications, setNotifications] = useState({
    newRentalAlerts: { email: true, phone: false },
    rentalStatusUpdates: { email: true, phone: false },
    finderRecommendations: { email: false, phone: false },
    featuredNews: { email: false, phone: true },
    finderExtras: { email: true, phone: true }
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

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleNotificationToggle = (category: keyof typeof notifications, type: 'email' | 'phone') => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type]
      }
    }));
  };



  const devices = [
    {
      type: 'computer',
      name: 'Mac – New York, USA',
      browser: 'Chrome',
      status: 'Active now',
      isActive: true,
      icon: Monitor
    },
    {
      type: 'smartphone',
      name: 'iPhone 15 – New York, USA',
      browser: 'Finder App',
      status: '20 hours ago',
      isActive: false,
      icon: Smartphone
    }
  ];

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

          {/* Tab Content */}
          {activeTab === 'Personal info' && (
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
            </>
          )}

          {/* Password and Security Tab */}
          {activeTab === 'Password and security' && (
            <>
              {/* Password Settings */}
              <div className="space-y-6">
                <p className="text-gray-600" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                  Your current email address is m.williams@example.com
                </p>

                {/* Current Password */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                      Current password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        placeholder="Enter current password"
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-12"
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
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div></div>
                </div>

                {/* New Password Fields */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                      New password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        placeholder="Enter new password"
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-12"
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
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                      Confirm new password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        placeholder="Confirm new password"
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 pr-12"
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
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Update Buttons */}
                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-300 transition-colors" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                    Cancel
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                    Update password
                  </button>
                </div>
              </div>

              {/* Device History */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                  Device history
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {devices.map((device, index) => {
                    const DeviceIcon = device.icon;
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
                        <div className="flex flex-col gap-2">
                          <DeviceIcon size={28} className="text-gray-400" />
                          <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                            {device.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                              {device.browser}
                            </span>
                            {device.isActive && (
                              <>
                                <span className="text-sm text-gray-600">·</span>
                                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                                  {device.status}
                                </span>
                              </>
                            )}
                            {!device.isActive && (
                              <>
                                <span className="text-sm text-gray-600">·</span>
                                <span className="text-sm text-gray-600">{device.status}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <button className="absolute top-4 right-4 p-3 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={16} className="text-gray-600" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Sign out all sessions */}
                <button className="flex items-center gap-2 px-0 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <LogOut size={16} />
                  <span className="font-medium text-sm" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                    Sign out of all sessions
                  </span>
                </button>
              </div>

              {/* Delete Account */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                  Delete account
                </h2>
                
                <p className="text-gray-600" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                  When you delete your account, your public profile will be deactivated immediately. If you change your mind before the 14 days are up, sign in with your email and password, and we'll send a link to reactivate account.
                </p>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="deleteAccount"
                    checked={deleteAccountChecked}
                    onChange={(e) => setDeleteAccountChecked(e.target.checked)}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="deleteAccount" className="text-gray-600" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                    Yes, I want to delete my account
                  </label>
                </div>

                <button 
                  disabled={!deleteAccountChecked}
                  className={`px-6 py-3 border rounded-lg font-medium transition-colors ${
                    deleteAccountChecked 
                      ? 'border-red-500 text-red-500 hover:bg-red-50' 
                      : 'border-gray-300 text-gray-400 cursor-not-allowed'
                  }`}
                  style={{ fontFamily: 'Inter', fontWeight: 500 }}
                >
                  Delete account
                </button>
              </div>
            </>
          )}

          {/* Notification Settings Tab */}
          {activeTab === 'Notification settings' && (
            <div className="space-y-8">
              {/* New rental alerts */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    New rental alerts
                  </h3>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                    New rentals that match your Favorites
                  </p>
                </div>
                <div className="flex items-center justify-center gap-14">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Email</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.newRentalAlerts.email}
                        onChange={() => handleNotificationToggle('newRentalAlerts', 'email')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Phone</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.newRentalAlerts.phone}
                        onChange={() => handleNotificationToggle('newRentalAlerts', 'phone')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Rental status updates */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    Rental status updates
                  </h3>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                    Updates like price changes and off-market status on your Favorites
                  </p>
                </div>
                <div className="flex items-center justify-center gap-14">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Email</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.rentalStatusUpdates.email}
                        onChange={() => handleNotificationToggle('rentalStatusUpdates', 'email')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Phone</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.rentalStatusUpdates.phone}
                        onChange={() => handleNotificationToggle('rentalStatusUpdates', 'phone')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Finder recommendations */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    Finder recommendations
                  </h3>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                    Rentals we think you'll like. These recommendations may be slightly outside your search criteria
                  </p>
                </div>
                <div className="flex items-center justify-center gap-14">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Email</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.finderRecommendations.email}
                        onChange={() => handleNotificationToggle('finderRecommendations', 'email')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Phone</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.finderRecommendations.phone}
                        onChange={() => handleNotificationToggle('finderRecommendations', 'phone')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Featured news */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    Featured news
                  </h3>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                    News and tips you may be interested in
                  </p>
                </div>
                <div className="flex items-center justify-center gap-14">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Email</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.featuredNews.email}
                        onChange={() => handleNotificationToggle('featuredNews', 'email')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Phone</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.featuredNews.phone}
                        onChange={() => handleNotificationToggle('featuredNews', 'phone')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Finder extras */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-base mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    Finder extras
                  </h3>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                    Occasional notifications about new features to make finding the perfect rental easy
                  </p>
                </div>
                <div className="flex items-center justify-center gap-14">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Email</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.finderExtras.email}
                        onChange={() => handleNotificationToggle('finderExtras', 'email')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm" style={{ fontFamily: 'Inter', fontWeight: 400 }}>Phone</span>
                    <div style={{ marginTop: '5px' }}>
                      <ToggleSwitch
                        checked={notifications.finderExtras.phone}
                        onChange={() => handleNotificationToggle('finderExtras', 'phone')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
