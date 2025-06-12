import React, { useState } from 'react';
import { FileTextIcon, ChevronDownIcon, MoreHorizontalIcon } from '../components/icons';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const LoanApproval: React.FC = () => {
  const [userInfoExpanded, setUserInfoExpanded] = useState(true);
  const [vehicleInfoExpanded, setVehicleInfoExpanded] = useState(true);

  const chartData = [
    { month: 'Oct', value: 200 },
    { month: 'Nov', value: 300 },
    { month: 'Dec', value: 350 },
    { month: 'Jan', value: 320 },
    { month: 'Feb', value: 340 },
    { month: 'Mar', value: 300 },
  ];

  const paymentDates = [
    '01/11/2023',
    '02/11/2023',
    '03/11/2023',
    '04/11/2023',
    '05/11/2023',
    '06/11/2023',
  ];

  const handleLoanApproval = () => {
    console.log('Loan approved');
  };

  const handleLoanRejection = () => {
    console.log('Loan rejected');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Loan Application Details */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Loan application details</h2>
          </div>
          <div className="bg-gray-100">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Phone Number</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Car Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-200">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Aarav Sharma</td>
                  <td className="px-6 py-4 text-sm text-gray-600">aarav.sharma@example.c...</td>
                  <td className="px-6 py-4 text-sm text-gray-600">+91 98765 43210</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Sedan - New</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* User Basic Information */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div
            className="flex items-center justify-between p-6 cursor-pointer"
            onClick={() => setUserInfoExpanded(!userInfoExpanded)}
          >
            <h2 className="text-xl font-semibold text-gray-900">User basic Information</h2>
            <ChevronDownIcon className={`transform transition-transform ${userInfoExpanded ? 'rotate-180' : ''}`} size={20} />
          </div>
          {userInfoExpanded && (
            <div className="px-6 pb-6 grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Case Type - New Car</span>
                <span className="text-gray-600">Net Loan Amount - 50000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance Finance - 25000</span>
                <span className="text-gray-600">Finance Form - NIL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gr Loan Amount - 525000</span>
                <span className="text-gray-600">RiO - 9.5</span>
                <span className="text-gray-600">RiO - Floating</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">EMI - New Car</span>
                <span className="text-gray-600">Tenor - 48</span>
                <span className="text-gray-600">Tenor - Arrear</span>
              </div>
              <div>
                <span className="text-gray-600">EMI Start from - DD-MM-YYYY</span>
              </div>
            </div>
          )}
        </div>

        {/* Vehicle Information */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div
            className="flex items-center justify-between p-6 cursor-pointer"
            onClick={() => setVehicleInfoExpanded(!vehicleInfoExpanded)}
          >
            <h2 className="text-xl font-semibold text-gray-900">Vehicle Information</h2>
            <ChevronDownIcon className={`transform transition-transform ${vehicleInfoExpanded ? 'rotate-180' : ''}`} size={20} />
          </div>
          {vehicleInfoExpanded && (
            <div className="px-6 pb-6 grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Make - A Star</span>
                <span className="text-gray-600">Model - LXI Mx</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ex Showroom Price - 500000</span>
                <span className="text-gray-600">Chassis No. - 43563887HUY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance Amount - 00</span>
                <span className="text-gray-600">Engine No. - Sample text</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Road Tax - 00</span>
                <span className="text-gray-600">Lien Mark - sample text</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Finance From - HDFC</span>
                <span className="text-gray-600">DSA - HDFC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Favouring - HDFC</span>
                <span className="text-gray-600">Mfg Year - YYYY</span>
              </div>
            </div>
          )}
        </div>

        {/* Approval Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleLoanApproval}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FileTextIcon size={16} />
            <span>Loan Approved</span>
          </button>
          <button
            onClick={handleLoanRejection}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FileTextIcon size={16} />
            <span>Loan Reject</span>
          </button>
        </div>

        {/* Justification Text Area */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="write here justification for loan denial"
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* Payment Tracking Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Amount Paid</span>
              <MoreHorizontalIcon size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹3,500</div>
            <div className="text-green-600 text-sm">+5%</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Due Date</span>
              <MoreHorizontalIcon size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">15th Nov</div>
            <div className="text-gray-400 text-sm">N/A</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Payment Mode</span>
              <MoreHorizontalIcon size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">Card</div>
            <div className="text-gray-400 text-sm">N/A</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Pending EMIs</span>
              <MoreHorizontalIcon size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹1,200</div>
            <div className="text-red-600 text-sm">-10%</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Overdue Payments Chart */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Overdue Payments</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-2xl font-bold text-gray-900">₹500</span>
                  <span className="text-green-600 text-sm">-2%</span>
                </div>
              </div>
              <MoreHorizontalIcon size={16} className="text-gray-400" />
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Line type="monotone" dataKey="value" stroke="#6b7280" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Payment Table</h3>
              <MoreHorizontalIcon size={16} className="text-gray-400" />
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-500">Date</span>
              </div>
              <div className="space-y-3">
                {paymentDates.map((date, index) => (
                  <div key={index} className="py-2 px-3 bg-gray-50 rounded text-sm text-gray-700">
                    {date}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApproval;