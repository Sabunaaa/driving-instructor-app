'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
// @ts-ignore
import { ChevronDown, Languages, LogIn, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = React.useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
      if (isHelpDropdownOpen) {
        setIsHelpDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isHelpDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen, isHelpDropdownOpen]);

  return (
    <nav className="w-full bg-white text-base">
      <div className="flex justify-between items-center px-8 py-2.5" style={{ width: '1296px', margin: '0 auto' }}>
        {/* Logo */}
        <div className="flex items-center gap-2 h-14">
          <div className="w-8.5 h-8.5 relative">
            {/* Logo icon placeholder - using a simple red circle for now */}
            <div className="w-8.5 h-8.5 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full opacity-20"></div>
            </div>
          </div>
          <span 
            className="text-gray-900 font-semibold" 
            style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 600 }}
          >
            DriveConnect
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center">
          {/* Nav link: Find Instructors */}
          <div className="flex items-center px-4.5 py-2 cursor-pointer" onClick={() => router.push('/find-instructors')}>
            <span 
              className="text-gray-700 font-medium" 
              style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500, color: '#333D4C' }}
            >
              Find Instructors
            </span>
          </div>

          {/* Nav link: How it Works */}
          <div className="flex items-center px-4.5 py-2">
            <span 
              className="text-gray-700 font-medium" 
              style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500, color: '#333D4C' }}
            >
              How it Works
            </span>
          </div>

          {/* Nav link: Blog */}
          <div className="flex items-center px-4.5 py-2">
            <span 
              className="text-gray-700 font-medium" 
              style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500, color: '#333D4C' }}
            >
              Blog
            </span>
          </div>

          {/* Dropdown: Help */}
          <div className="flex items-center gap-1.5 px-4.5 py-2 relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsHelpDropdownOpen(!isHelpDropdownOpen);
              }}
              className="flex items-center gap-1.5"
            >
              <span 
                className="text-gray-700 font-medium" 
                style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500, color: '#333D4C' }}
              >
                Help
              </span>
              <div className="flex items-center pt-0.75">
                <ChevronDown size={16} color="#333D4C" />
              </div>
            </button>
            
            {/* Help Dropdown Menu */}
            {isHelpDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setIsHelpDropdownOpen(false);
                    router.push('/help');
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Help Center
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsHelpDropdownOpen(false);
                    router.push('/for-instructors');
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  For Instructors
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsHelpDropdownOpen(false);
                    router.push('/contact');
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1">
          {/* Languages button */}
          <div className="flex items-center p-2.75">
            <Languages size={18} color="#333D4C" />
          </div>

          {/* Conditional Button group */}
          {user ? (
            /* Authenticated user - show user dropdown */
            <div className="flex items-center gap-3 pl-2 relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={16} className="text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.userType}</p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push('/dashboard');
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LayoutDashboard size={16} className="text-gray-400" />
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Add settings route when available
                      console.log('Settings clicked');
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} className="text-gray-400" />
                    Settings
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                      router.push('/');
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} className="text-red-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Non-authenticated user - show login/signup buttons */
            <div className="flex items-center gap-3 pl-2">
              {/* Log in button - Secondary/Outline */}
              <button 
                type="button"
                onClick={() => router.push('/login')}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg font-medium border border-gray-200 text-gray-700 bg-transparent hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200"
                style={{ 
                  fontSize: '14px', 
                  lineHeight: '20px', 
                  fontWeight: 500,
                  color: '#333D4C',
                  borderColor: '#E0E5EB'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                  e.currentTarget.style.borderColor = '#D1D5DB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#E0E5EB';
                }}
              >
                <LogIn size={16} color="#333D4C" />
                <span>Log in</span>
              </button>
              
              {/* Sign up button - Primary/Solid */}
              <button 
                type="button"
                onClick={() => router.push('/signup')}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200"
                style={{ 
                  backgroundColor: '#D85151', 
                  fontSize: '14px', 
                  lineHeight: '20px', 
                  fontWeight: 500 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#C44545';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#D85151';
                }}
              >
                <User size={16} color="white" />
                <span>Sign up</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

