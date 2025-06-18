import React, { useState, useEffect, ChangeEvent } from 'react';
import { X, Edit2 } from 'lucide-react';
import { carsAPI } from '../services/api';

interface Car {
  _id: string;
  Brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  vin: string;
  condition: 'new' | 'used';
  status: 'available' | 'sold';
  customerName?: string;
  customerContact?: string;
  email?: string;
  purchaseDate?: string;
  paymentStatus?: 'Completed' | 'Pending';
  color?: string;
  carNumber?: string;
}

interface EditCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
  onUpdate: (updatedCar: Car) => void;
}

export default function EditCarModal({ isOpen, onClose, car, onUpdate }: EditCarModalProps) {
  const [formData, setFormData] = useState<Partial<Car>>(car);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(car);
  }, [car]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload: Car = {
        ...car,
        ...formData,
        year: parseInt(formData.year as unknown as string, 10),
        price: parseFloat(formData.price as unknown as string),
        mileage: parseFloat(formData.mileage as unknown as string),
      };
      await carsAPI.updateCar(car._id, payload);
      onUpdate(payload);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update car');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Car</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Customer Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <InputField label="Customer Name" name="customerName" value={formData.customerName} onChange={handleInputChange} />
              <InputField label="Contact Number" name="customerContact" value={formData.customerContact} onChange={handleInputChange} />
              <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} />
              <InputField label="Purchase date" name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleInputChange} />
              <SelectField label="Payment status" name="paymentStatus" value={formData.paymentStatus} onChange={handleInputChange} options={['Completed', 'Pending']} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Car Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <InputField label="Brand" name="Brand" value={formData.Brand} onChange={handleInputChange} />
              <InputField label="Model" name="model" value={formData.model} onChange={handleInputChange} />
              <InputField label="Year" name="year" type="number" value={formData.year} onChange={handleInputChange} />
              <InputField label="Price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
              <InputField label="Mileage" name="mileage" type="number" value={formData.mileage} onChange={handleInputChange} />
              <InputField label="Color" name="color" value={formData.color} onChange={handleInputChange} />
              <InputField label="Car Number" name="carNumber" value={formData.carNumber} onChange={handleInputChange} />
              <SelectField label="Condition" name="condition" value={formData.condition} onChange={handleInputChange} options={['new', 'used']} />
              <SelectField label="Status" name="status" value={formData.status} onChange={handleInputChange} options={['available', 'sold']} />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, ...props }: { label: string, [key: string]: any }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 pr-10" />
      <Edit2 size={16} className="absolute right-3 top-3 text-gray-400" />
    </div>
  </div>
);

const SelectField = ({ label, options, ...props }: { label: string, options: string[], [key: string]: any }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <select {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 pr-10 appearance-none">
        {options.map(option => <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>)}
      </select>
      <Edit2 size={16} className="absolute right-3 top-3 text-gray-400" />
    </div>
  </div>
);