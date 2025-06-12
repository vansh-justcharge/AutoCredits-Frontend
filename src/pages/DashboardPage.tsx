// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import OverviewTab from '../components/dashboard/tabs/OverviewTab';
// import SettingsTab from '../components/dashboard/tabs/SettingsTab';

// const DashboardPage: React.FC = () => {
//   return (
//     <Routes>
//       <Route index element={<OverviewTab />} />
//       <Route path="overview" element={<OverviewTab />} />
//       <Route path="settings" element={<SettingsTab />} />
//     </Routes>
//   );
// };

// export default DashboardPage;


import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import OverviewTab from '../components/dashboard/tabs/OverviewTab';
import SettingsTab from '../components/dashboard/tabs/SettingsTab';

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set initial active tab based on route
  const [activeTab, setActiveTab] = useState(
    location.pathname.endsWith('/settings') ? 'Settings' : 'Overview'
  );

  // Update activeTab when route changes
  useEffect(() => {
    if (location.pathname.endsWith('/settings')) {
      setActiveTab('Settings');
    } else {
      setActiveTab('Overview');
    }
  }, [location.pathname]);

  // Handle tab clicks to navigate to corresponding routes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Overview') {
      navigate('/dashboard/overview');
    } else if (tab === 'Settings') {
      navigate('/dashboard/settings');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        title="Super Admin Dashboard"
        tabs={['Overview']}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      <Routes>
        <Route index element={<OverviewTab />} />
        <Route path="overview" element={<OverviewTab />} />
        {/* <Route path="settings" element={<SettingsTab />} /> */}
      </Routes>
    </div>
  );
};

export default DashboardPage;