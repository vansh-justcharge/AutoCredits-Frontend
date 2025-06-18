import React, { useState, useEffect, ChangeEvent } from 'react';
import { ChevronDownIcon, XIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Lead {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  name?: string;
  services?: string;
  assignedTo?: string;
  department?: string;
  additionalDetails?: string;
  lastContact?: string;
  updateStatus?: string;
}

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead;
  onUpdate: (updatedLead: Lead) => void;
}

interface FormData {
  name: string;
  phone: string;
  services: string;
  source: string;
  status: string;
  assignedTo: string;
  department: string;
  additionalDetails: string;
  lastContact: string;
  updateStatus: string;
}

const EditLeadModal: React.FC<EditLeadModalProps> = ({ isOpen, onClose, lead, onUpdate }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    services: '',
    source: '',
    status: '',
    assignedTo: '',
    department: '',
    additionalDetails: '',
    lastContact: '',
    updateStatus: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || '',
        phone: lead.phone || '',
        services: lead.services || '',
        source: lead.source || '',
        status: lead.status || '',
        assignedTo: lead.assignedTo || '',
        department: lead.department || '',
        additionalDetails: lead.additionalDetails || '',
        lastContact: lead.lastContact || '',
        updateStatus: lead.updateStatus || ''
      });
    }
  }, [lead]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        throw new Error('No authorization token found. Please log in again.');
      }

      const response = await fetch(`${API_URL}/leads/${lead._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          navigate('/login');
          throw new Error('Session expired. Please log in again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update lead');
      }

      const updatedLead = { ...lead, ...formData };
      await onUpdate(updatedLead);
      onClose();
    } catch (err) {
      console.error('Error updating lead:', err);
      setError('Failed to update lead. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl text-gray-700 font-medium">Lead Details</h2>
            <ChevronDownIcon className="ml-2" size={20} />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <XIcon size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">
              Updating lead...
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Services</label>
              <input
                type="text"
                name="services"
                value={formData.services}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="New">New</option>
                <option value="sold">Sold</option>
                {/* <option value="Closed">Closed</option> */}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Additional Details</label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Last Contact</label>
            <input
              type="date"
              name="lastContact"
              value={formData.lastContact}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Support">Support</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Update Status</label>
              <select
                name="updateStatus"
                value={formData.updateStatus}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="Follow up">Follow up</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;