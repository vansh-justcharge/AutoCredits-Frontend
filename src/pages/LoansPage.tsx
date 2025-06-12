import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '../components/icons';
import Navbar from './Navbar';
import LoanApproval from './LoanApproval';
import PaymentTracking from './PaymentTracking';

type TabType = 'Overview' | 'Loan Approval' | 'Payment Tracking';

interface NavbarProps {
  title: string;
  tabs: TabType[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const LoanCaseTab = () => {
  const loanCases = [
    {
      id: 1,
      clientInfo: {
        name: 'Inshra Fatma',
        phone: '9970654356',
        email: 'inshrafatma@gmail.com',
        address: 'lajpat nagar, New Delhi',
        date: '10 Aug 2024'
      },
      vehicleInfo: {
        brand: 'Maruti Suzuki',
        model: 'HR87654678kj - 201 model',
        type: 'Used Car'
      },
      loanDetails: {
        bank: 'ICICI Bank',
        interestRate: '10%',
        tenure: 'year'
      },
      caseDetails: {
        source: 'Dealer',
        showroom: 'Balaji Motors',
        assignedTo: 'Riya'
      },
      caseUpdate: {
        status: 'New',
        addedOn: '12 09 2024',
        documents: '3 Document Pending'
      }
    },
    {
      id: 2,
      clientInfo: {
        name: 'Aisha Khan',
        phone: '123456789',
        email: 'aishakhan@example.com',
        address: 'Greenwood Avenue, Mumbai',
        date: '15 Sep 2024'
      },
      vehicleInfo: {
        brand: 'Honda Civic',
        model: 'XYZ123456783 - 2020 model',
        type: 'Used car'
      },
      loanDetails: {
        bank: 'ICICI Bank',
        interestRate: '10%',
        tenure: 'year'
      },
      caseDetails: {
        source: 'Retailer',
        showroom: 'Star Motors',
        assignedTo: 'Maya'
      },
      caseUpdate: {
        status: 'New',
        addedOn: '15 09 2024',
        inactive: true
      }
    },
    {
      id: 3,
      clientInfo: {
        name: 'Aisha Khan',
        phone: '123456789',
        email: 'aishakhan@example.com',
        address: 'Greenwood Avenue, Mumbai',
        date: '15 Sep 2024'
      },
      vehicleInfo: {
        brand: 'Honda Civic',
        model: 'XYZ123456783 - 2020 model',
        type: 'Used car'
      },
      loanDetails: {
        bank: 'ICICI Bank',
        interestRate: '10%',
        tenure: 'year'
      },
      caseDetails: {
        source: 'Retailer',
        showroom: 'Star Motors',
        assignedTo: 'Maya'
      },
      caseUpdate: {
        status: 'New',
        addedOn: '15 09 2024',
        inactive: true
      }
    },
    {
      id: 4,
      clientInfo: {
        name: 'Aisha Khan',
        phone: '123456789',
        email: 'aishakhan@example.com',
        address: 'Greenwood Avenue, Mumbai',
        date: '15 Sep 2024'
      },
      vehicleInfo: {
        brand: 'Honda Civic',
        model: 'XYZ123456783 - 2020 model',
        type: 'Used car'
      },
      loanDetails: {
        bank: 'ICICI Bank',
        interestRate: '10%',
        tenure: 'year'
      },
      caseDetails: {
        source: 'Retailer',
        showroom: 'Star Motors',
        assignedTo: 'Maya'
      },
      caseUpdate: {
        status: 'New',
        addedOn: '15 09 2024'
      }
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Search by Loan id</option>
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Source</option>
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Status</option>
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="text-sm text-gray-600">Log in Date</div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>From</option>
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>To</option>
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Case Type</option>
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-50">
            Search
          </button>

          <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-50">
            Reset
          </button>

          <div className="ml-auto">
            <button className="bg-gray-700 hover:bg-gray-800 text-white rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500">
              Add New Car
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loan Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loanCases.map((loanCase) => (
                <tr key={loanCase.id} className={loanCase.caseUpdate.inactive ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{loanCase.clientInfo.name}</div>
                      <div className="text-gray-500">{loanCase.clientInfo.phone}</div>
                      <div className="text-gray-500">{loanCase.clientInfo.email}</div>
                      <div className="text-gray-500">{loanCase.clientInfo.address}</div>
                      <div className="text-gray-500">{loanCase.clientInfo.date}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{loanCase.vehicleInfo.brand}</div>
                      <div className="text-gray-500">{loanCase.vehicleInfo.model}</div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {loanCase.vehicleInfo.type}
                        </span>
                      </div>
                      {loanCase.caseUpdate.inactive && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                            Inactive
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-900">{loanCase.loanDetails.bank}</div>
                      <div className="text-gray-500">Interest Rate - {loanCase.loanDetails.interestRate}</div>
                      <div className="text-gray-500">Loan tenure - {loanCase.loanDetails.tenure}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-500">Source - {loanCase.caseDetails.source}</div>
                      <div className="text-gray-500">Showroom - {loanCase.caseDetails.showroom}</div>
                      <div className="text-gray-500">Assigned to {loanCase.caseDetails.assignedTo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-500">Status - {loanCase.caseUpdate.status}</div>
                      <div className="text-gray-500">Added on {loanCase.caseUpdate.addedOn}</div>
                      {loanCase.caseUpdate.documents && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {loanCase.caseUpdate.documents}
                          </span>
                        </div>
                      )}
                      {loanCase.caseUpdate.inactive && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                            Inactive
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-2">
                      <button className="bg-white border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        View Details
                      </button>
                      <button className="bg-white border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Timeline
                      </button>
                    </div>
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

const LoanCasePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs: TabType[] = ['Overview', 'Loan Approval', 'Payment Tracking'];

  const [activeTab, setActiveTab] = useState<TabType>(
    location.pathname.endsWith('/approval') ? 'Loan Approval' :
      location.pathname.endsWith('/tracking') ? 'Payment Tracking' : 'Overview'
  );

  useEffect(() => {
    if (location.pathname.endsWith('/approval')) {
      setActiveTab('Loan Approval');
    } else if (location.pathname.endsWith('/tracking')) {
      setActiveTab('Payment Tracking');
    } else {
      setActiveTab('Overview');
    }
  }, [location.pathname]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'Overview') {
      navigate('/dashboard/loans');
    } else if (tab === 'Loan Approval') {
      navigate('/dashboard/loans/approval');
    } else if (tab === 'Payment Tracking') {
      navigate('/dashboard/loans/tracking');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        title="Loan Management System"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      <Routes>
        <Route index element={<LoanCaseTab />} />
        <Route path="approval" element={<LoanApproval />} />
        <Route path="tracking" element={<PaymentTracking />} />
      </Routes>
    </div>
  );
};

export default LoanCasePage;