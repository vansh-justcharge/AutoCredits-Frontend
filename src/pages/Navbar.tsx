import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchIcon, BellIcon, UserIcon, ChevronDownIcon, SettingsIcon, LogOutIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  title: string;
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

 

const Navbar: React.FC<NavbarProps> = ({ title, tabs, activeTab, setActiveTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      // Clear any stored authentication data
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      sessionStorage.clear()

      // Redirect to login page or home page
      window.location.href = "/login" // or wherever your login page is
    }
  }

  const showSettingsIcon = [
    '/dashboard',
    '/dashboard-overview',
    '/dashboard/settings'
  ].includes(location.pathname);

  // const handleLogout = () => {
  //   logout();
  //   setIsDropdownOpen(false);
  // };

  const handleMyProfile = () => {
    navigate('/dashboard/profile');
    setIsDropdownOpen(false);
  };

  const handleSettings = () => {
    console.log('Navigate to Settings');
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <SearchIcon />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BellIcon />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <UserIcon />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full ml-2 bg-gray-100 hover:bg-gray-200"
              title="Logout"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleMyProfile}
                  className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <UserIcon />
                  </div>
                  <span className="font-medium">My Profile</span>
                </button>

                <button
                  onClick={handleSettings}
                  className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <SettingsIcon />
                  </div>
                  <span className="font-medium">Setting</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <LogOutIcon />
                  </div>
                  <span className="font-medium">Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="border-b border-gray-200 mt-4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-6 py-4 text-sm font-medium ${activeTab === tab
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;