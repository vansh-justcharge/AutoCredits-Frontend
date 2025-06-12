import React, { useState } from 'react';
import { DownloadIcon, ChevronDownIcon } from '../components/icons';

const PaymentTracking: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedLoanId, setSelectedLoanId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const loanApplications = [
    {
      customerId: 'C12345',
      loanId: 'L98765',
      amount: '₹1,12,500',
      dueDate: '10/15/2023',
      status: 'Paid',
      paymentMode: 'In Progress',
      action: 'Adjust',
    },
    {
      customerId: 'C23456',
      loanId: 'L87654',
      amount: '₹90,000',
      dueDate: '10/20/2023',
      status: 'Overdue',
      paymentMode: 'Paid',
      action: 'Adjust',
    },
    {
      customerId: 'C34567',
      loanId: 'L76543',
      amount: '₹75,000',
      dueDate: '10/25/2023',
      status: 'Pending',
      paymentMode: 'Overdue',
      action: 'Remind',
    },
    {
      customerId: 'C45678',
      loanId: 'L65432',
      amount: '₹67,500',
      dueDate: '11/01/2023',
      status: 'Completed',
      paymentMode: 'Pending',
      action: 'Adjust',
    },
    {
      customerId: 'C56789',
      loanId: 'L54321',
      amount: '₹82,500',
      dueDate: '11/05/2023',
      status: 'In Progress',
      paymentMode: 'Completed',
      action: 'Remind',
    },
    {
      customerId: 'C67890',
      loanId: 'L43210',
      amount: '₹71,250',
      dueDate: '11/10/2023',
      status: 'Cancelled',
      paymentMode: 'Cancelled',
      action: 'Adjust',
    },
  ];

  const overduePayments = [
    {
      customerId: 'C12345',
      loanId: 'L98765',
      amount: '₹1,12,500',
      dueDate: '10/15/2023',
      action: 'Send reminder',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
      case 'Completed':
        return 'text-green-600';
      case 'Overdue':
      case 'In Progress':
        return 'text-red-600';
      case 'Cancelled':
      case 'Pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Paid':
      case 'Completed':
        return 'bg-green-500';
      case 'Overdue':
      case 'In Progress':
        return 'bg-red-500';
      case 'Cancelled':
      case 'Pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleExportReport = () => {
    console.log('Exporting report...');
  };

  const handleViewOverduePayments = () => {
    console.log('Viewing overdue payments...');
  };

  const handleGenerateDefaultersReport = () => {
    console.log('Generating defaulters report...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Recent Loan Applications */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Loan Applications</h2>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Customer Id"
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            />
            <select
              value={selectedLoanId}
              onChange={(e) => setSelectedLoanId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            >
              <option value="">Loan Id</option>
              {loanApplications.map((app) => (
                <option key={app.loanId} value={app.loanId}>{app.loanId}</option>
              ))}
            </select>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            >
              <option value="">mm/dd/yyyy</option>
              <option value="10/15/2023">10/15/2023</option>
              <option value="10/20/2023">10/20/2023</option>
              <option value="10/25/2023">10/25/2023</option>
            </select>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase flex items-center">
                    Customer ID <ChevronDownIcon size={14} className="ml-1" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Loan ID <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Amount <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Due Date <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Status <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Payment mode <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Action <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {loanApplications.map((app, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.customerId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.loanId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.dueDate}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusDot(app.status)}`}></div>
                        <span className={getStatusColor(app.status)}>{app.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusDot(app.paymentMode)}`}></div>
                        <span className={getStatusColor(app.paymentMode)}>{app.paymentMode}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Generate Report */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Generate Report</h2>
              <p className="text-gray-500">Generate Reports...</p>
            </div>
            <button
              onClick={handleExportReport}
              className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <DownloadIcon size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Overdue Payments Alerts */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Overdue Payments Alerts</h2>
          <div className="mb-4">
            <button
              onClick={handleViewOverduePayments}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              View Overdue Payments
            </button>
          </div>
        </div>

        {/* Overdue Payments */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overdue Payments</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase flex items-center">
                    Customer ID <ChevronDownIcon size={14} className="ml-1" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Loan ID <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Amount <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Due Date <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    Action <ChevronDownIcon size={14} className="ml-1 inline" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {overduePayments.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.customerId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{payment.loanId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{payment.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{payment.dueDate}</td>
                    <td className="px-6 py-4 text-sm text-blue-600">{payment.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Generate Defaulters Report */}
        <div className="mb-6">
          <button
            onClick={handleGenerateDefaultersReport}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Generate Defaulters Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;