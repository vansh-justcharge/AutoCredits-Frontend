import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HeaderIcons } from '../icons';

const Header: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm z-10">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            AutoCredits Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <HeaderIcons.Search />
                        </button>

                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <HeaderIcons.Notifications />
                        </button>

                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <HeaderIcons.Profile />
                        </button>

                        <button
                            className="p-2 rounded-full hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            <HeaderIcons.Settings />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;