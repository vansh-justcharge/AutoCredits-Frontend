import React from 'react';
import { X } from 'lucide-react';
import type { Car } from '../services/api';

interface ViewCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: Car;
}

export default function ViewCarModal({ isOpen, onClose, car }: ViewCarModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold">Car Details</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-8">
                        <h3 className="text-lg font-medium mb-4">Customer Details</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div><p><strong>Customer Name:</strong> {car.customerName}</p></div>
                            <div><p><strong>Contact Number:</strong> {car.customerContact}</p></div>
                            <div><p><strong>Email:</strong> {car.email}</p></div>
                            <div><p><strong>Purchase Date:</strong> {car.purchaseDate ? new Date(car.purchaseDate).toLocaleDateString() : 'N/A'}</p></div>
                            <div><p><strong>Payment Status:</strong> {car.paymentStatus}</p></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Car Images</h3>
                        <div className='flex m-2'>
                                {Array.isArray(car.images) && car.images.length > 0 ? (
                                    car.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img.url}
                                            alt={img.alt || 'Car'}
                                            className="mb-4 max-h-56 mr-6 "
                                        />
                                    ))
                                ) : (
                                    <span>No images available</span>
                                )}
                            </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Car Details</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div><p><strong>Brand:</strong> {car.Brand}</p></div>
                            <div><p><strong>Model:</strong> {car.model}</p></div>
                            <div><p><strong>Year:</strong> {car.year}</p></div>
                            <div><p><strong>Price:</strong> ${car.price.toLocaleString()}</p></div>
                            <div><p><strong>Mileage:</strong> {car.mileage.toLocaleString()} miles</p></div>
                            <div><p><strong>Color:</strong> {car.color}</p></div>
                            <div><p><strong>VIN:</strong> {car.vin}</p></div>
                            <div><p><strong>Car Number:</strong> {car.carNumber}</p></div>
                            <div><p><strong>Condition:</strong> {car.condition}</p></div>
                            <div><p><strong>Status:</strong> {car.status}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 