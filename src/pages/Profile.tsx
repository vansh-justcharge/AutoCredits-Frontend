import React, { useState, useEffect } from 'react';
import { Edit2Icon, UserIcon, LockIcon, CreditCardIcon, UsersIcon, AlertTriangleIcon, BarChart2Icon } from '../components/icons';
import Navbar from './Navbar';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bio: string;
}

type TabType = 'Personal Info' | 'Security' | 'Payment' | 'Team' | 'Notifications' | 'Analytics';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    language: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', formData);
    // Handle save logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <Edit2Icon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter email id"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <Edit2Icon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <Edit2Icon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder=""
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <Edit2Icon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Designation
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Designation title"
              value={formData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <Edit2Icon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder=""
              value={formData.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
            <Edit2Icon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <div className="relative">
          <textarea
            placeholder="Write description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
          />
          <Edit2Icon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <button
          onClick={handleSaveChanges}
          className="px-6 py-3 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-md text-gray-600 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>
        <div className="pt-4">
          <button className="px-6 py-3 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
  });

  const handleInputChange = (field: keyof ProfileData, value: string): void => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const location = useLocation();
  const navigate = useNavigate();
  const tabs: TabType[] = ['Personal Info', 'Security', 'Payment', 'Team', 'Notifications', 'Analytics'];
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  useEffect(() => {
    if (location.pathname.endsWith('/profile')) {
      setActiveTab(tabs[0]);
    } else if (location.pathname.endsWith('/change-password')) {
      setActiveTab(tabs[1]);
    }
  }, [location.pathname]);

  const handleTabChange = (tab: string): void => {
    if (tabs.includes(tab as TabType)) {
      setActiveTab(tab as TabType);
      if (tab === 'Personal Info') {
        navigate('/dashboard/profile');
      } else if (tab === 'Security') {
        navigate('/dashboard/profile/change-password');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        title="Profile Management"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      <Routes>
        <Route index element={<EditProfile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
};

export default Profile;