import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

const ProfilePage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phoneNumber: '', // Remove phoneNumber since it's not in the User interface
            }));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.put('/users/profile', {
                name: formData.name,
            });

            // Refresh the page to get updated user data
            window.location.reload();
            setSuccess('Profile updated successfully');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await api.put('/users/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });

            setSuccess('Password changed successfully');
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            }));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
                                disabled
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                    <form onSubmit={handlePasswordChange}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        >
                            {loading ? 'Changing...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 