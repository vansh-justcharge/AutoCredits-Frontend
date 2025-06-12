import React, { useState, useEffect } from 'react';
import { SearchIcon, BellIcon, UserIcon, DownloadIcon } from '../components/icons';

interface User {
  email: string;
  name: string;
  role: string;
  status: string;
  lastLogin: string;
}

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleRoleChange = (userEmail: string, newRole: string) => {
    setUsers(users.map(user =>
      user.email === userEmail ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusChange = (userEmail: string, newStatus: string) => {
    setUsers(users.map(user =>
      user.email === userEmail ? { ...user, status: newStatus } : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <SearchIcon />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <BellIcon />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <UserIcon />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <DownloadIcon />
            <span>Export File</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.email}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.email, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.email, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;