import React from 'react';
import { ChevronDownIcon } from '../components/icons';
import { useState } from 'react';
import Navbar from './Navbar';

const Sales = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Car sales', 'loan', 'Insurance'];

  const transactions = [
    { date: 'March 15, 2020.', customer: 'Arjun', paymentId: '1234-567', type: 'Car sale', status: 'Approved', amount: '₹8,00,000' },
    { date: 'June 22, 2019.', customer: 'Priya', paymentId: '2345-678', type: 'Loan', status: 'Approved', amount: '₹7,50,000' },
    { date: 'January 10, 2023.', customer: 'Rahul', paymentId: '3456-789', type: 'Insurance', status: 'Approved', amount: '₹9,00,000' },
    { date: 'December 31, 2024.', customer: 'Sneha', paymentId: '4567-890', type: 'Loan', status: 'Approved', amount: '₹6,50,000' },
    { date: 'August 5, 2022.', customer: 'Vikram', paymentId: '5678-901', type: 'Insurance', status: 'Approved', amount: '₹8,00,000' },
    { date: 'April 1, 2020.', customer: 'Anjali', paymentId: '6789-012', type: 'Insurance', status: 'Approved', amount: '₹9,00,000' },
    { date: 'February 14, 2023.', customer: 'Karan', paymentId: '7890-123', type: 'Loan', status: 'Approved', amount: '₹7,50,000' },
    { date: 'September 30, 2021.', customer: 'Neha', paymentId: '8901-234', type: 'Insurance', status: 'Approved', amount: '₹8,00,000' },
    { date: 'November 11, 2020.', customer: 'Ravi', paymentId: '9012-345', type: 'Insurance', status: 'Approved', amount: '₹6,50,000' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <Navbar
        title="Sales and Finance"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="mb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Sale Transaction</h2>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-medium">
            Add Transactions
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-left text-gray-500 font-medium text-sm flex items-center">
                  Date <ChevronDownIcon className="ml-1 h-4 w-4" />
                </th>
                <th className="py-3 text-left text-gray-500 font-medium text-sm">
                  <div className="flex items-center">
                    Customer name <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 text-left text-gray-500 font-medium text-sm">
                  <div className="flex items-center">
                    Payment ID <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 text-left text-gray-500 font-medium text-sm">
                  <div className="flex items-center">
                    Type <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 text-left text-gray-500 font-medium text-sm">
                  <div className="flex items-center">
                    Status <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-3 text-left text-gray-500 font-medium text-sm">
                  <div className="flex items-center">
                    Amount <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 text-gray-800">{transaction.date}</td>
                  <td className="py-4 text-gray-800">{transaction.customer}</td>
                  <td className="py-4 text-gray-800">{transaction.paymentId}</td>
                  <td className="py-4 text-gray-800">{transaction.type}</td>
                  <td className="py-4 text-gray-800">{transaction.status}</td>
                  <td className="py-4 text-gray-800">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;