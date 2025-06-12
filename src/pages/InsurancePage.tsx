// import React from 'react';
// import { Search, Bell, User, ChevronDown } from 'lucide-react';

// const InsurancePage = () => {
//   const customers = [
//     { 
//       name: "Inshra Fatma", 
//       type: "Individual",
//       policyNumber: "86645790",
//       vehicleRegNumber: "8765434567898765"
//     },
//     { 
//       name: "Harsh sharma", 
//       type: "Individual",
//       policyNumber: "86645790",
//       vehicleRegNumber: "8765434567898765"
//     },
//     { 
//       name: "Prachi singh", 
//       type: "Individual",
//       policyNumber: "86645790",
//       vehicleRegNumber: "8765434567898765"
//     },
//     { 
//       name: "Animesh", 
//       type: "Individual",
//       policyNumber: "86645790",
//       vehicleRegNumber: "8765434567898765"
//     }
//   ];

//   return (
//     <div className="max-w-full bg-gray-50 min-h-screen">
//       <div className="p-4 bg-white border-b">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <h1 className="text-3xl font-bold text-gray-800">Insurance</h1>
//             <ChevronDown className="ml-2 text-gray-800" size={20} />
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="p-2 rounded-full bg-gray-100">
//               <Search size={20} className="text-gray-600" />
//             </button>
//             <button className="p-2 rounded-full bg-gray-100">
//               <Bell size={20} className="text-gray-600" />
//             </button>
//             <button className="p-2 rounded-full bg-gray-100">
//               <User size={20} className="text-gray-600" />
//             </button>
//           </div>
//         </div>
        
//         <div className="flex items-center mt-4">
//           <div className="flex -space-x-2">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
//             ))}
//           </div>
//           <span className="ml-2 text-gray-600">Inshra, Jai +12000 others</span>
//         </div>
        
//         <div className="mt-8 border-b pb-2">
//           <button className="font-medium text-gray-800 pb-2 border-b-2 border-gray-800">Overview</button>
//         </div>
//       </div>
      
//       <div className="p-4 space-y-4">
//         {customers.map((customer, index) => (
//           <div key={index} className="p-6 bg-white rounded-lg shadow-sm border">
//             <div className="flex justify-between mb-4">
//               <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
//                 <span className="text-gray-700">Full name - {customer.name}</span>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <span className="text-gray-700">Customer Type - </span>
//                 <div className="flex">
//                   <button className={`px-4 py-1 rounded-l-full ${customer.type === "Individual" ? 'bg-gray-100' : 'bg-white'} border`}>
//                     Individual
//                   </button>
//                   <button className={`px-4 py-1 rounded-r-full ${customer.type === "Organization" ? 'bg-gray-100' : 'bg-white'} border`}>
//                     Organization
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex gap-6">
//               <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
//                 <span className="text-gray-700">Policy Number - {customer.policyNumber}</span>
//               </div>
//               <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
//                 <span className="text-gray-700">Vehicle Registration Number - {customer.vehicleRegNumber}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InsurancePage;



import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Navbar from './Navbar';

const InsurancePage = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [filters, setFilters] = useState({
    dealer: 'Search by - Dealer',
    source: 'Source',
    status: 'Status',
    date: 'Date'
  });

  const tabs = ['Overview'];

  const insuranceCases = [
    {
      clientInfo: {
        name: "Inshra Fatma",
        id: "987654356",
        email: "inshrafatma@gmail.com",
        address: "lajpat nagar, New Delhi",
        date: "10 Aug 2024"
      },
      vehicleInfo: {
        brand: "Maruti Suzuki",
        model: "HR87654678 - 201 model",
        type: "Used Car"
      },
      policyDetails: {
        policyNo: "8765435try",
        company: "Policy Bazar",
        dueDate: "4 aug 26",
        status: "Expired"
      },
      caseDetails: {
        source: "Dealer",
        showroom: "Balaji Motors",
        assignedTo: "Riya"
      },
      caseUpdate: {
        status: "New",
        addedOn: "12 09 2024"
      }
    },
    {
      clientInfo: {
        name: "Aisha Khan",
        id: "123456789",
        email: "aishakhan@example.com",
        address: "Greenwood Avenue, Mumbai",
        date: "15 Sep 2024"
      },
      vehicleInfo: {
        brand: "Honda Civic",
        model: "XYZ12345678 - 2020 model",
        type: "Used car"
      },
      policyDetails: {
        policyNo: "1234567abc",
        company: "Insurance Hub",
        dueDate: "10 Sep 2026",
        status: "Inactive"
      },
      caseDetails: {
        source: "Retailer",
        showroom: "Star Motors",
        assignedTo: "Maya"
      },
      caseUpdate: {
        status: "New",
        addedOn: "15 09 2024"
      }
    },
    {
      clientInfo: {
        name: "Aisha Khan",
        id: "123456789",
        email: "aishakhan@example.com",
        address: "Greenwood Avenue, Mumbai",
        date: "15 Sep 2024"
      },
      vehicleInfo: {
        brand: "Honda Civic",
        model: "XYZ12345678 - 2020 model",
        type: "Used car"
      },
      policyDetails: {
        policyNo: "1234567abc",
        company: "Insurance Hub",
        dueDate: "10 Sep 2026",
        status: "Inactive"
      },
      caseDetails: {
        source: "Retailer",
        showroom: "Star Motors",
        assignedTo: "Maya"
      },
      caseUpdate: {
        status: "New",
        addedOn: "15 09 2024"
      }
    },
    {
      clientInfo: {
        name: "Aisha Khan",
        id: "123456789",
        email: "aishakhan@example.com",
        address: "Greenwood Avenue, Mumbai",
        date: "15 Sep 2024"
      },
      vehicleInfo: {
        brand: "Honda Civic",
        model: "XYZ12345678 - 2020 model",
        type: "Used car"
      },
      policyDetails: {
        policyNo: "1234567abc",
        company: "Insurance Hub",
        dueDate: "10 Sep 2026",
        status: "Inactive"
      },
      caseDetails: {
        source: "Retailer",
        showroom: "Star Motors",
        assignedTo: "Maya"
      },
      caseUpdate: {
        status: "New",
        addedOn: "15 09 2024"
      }
    }
  ];

  const FilterDropdown = ({ label, value, options = [] }) => (
    <div className="relative">
      <button className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 min-w-32">
        <span>{value}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
    </div>
  );

  return (
    <div className="max-w-full bg-gray-50 min-h-screen">
      {Navbar && (
        <Navbar
          title="Insurance Case"
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      
      <div className="p-6">
        {/* Filters and Add New Car Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <FilterDropdown label="Search by - Dealer" value={filters.dealer} />
            <FilterDropdown label="Source" value={filters.source} />
            <FilterDropdown label="Status" value={filters.status} />
            <FilterDropdown label="Date" value={filters.date} />
          </div>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Add New Car
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Information
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle Information
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Previous Policy Details
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
                {insuranceCases.map((caseItem, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{caseItem.clientInfo.name}</div>
                        <div className="text-gray-500">{caseItem.clientInfo.id}</div>
                        <div className="text-gray-500">{caseItem.clientInfo.email}</div>
                        <div className="text-gray-500">{caseItem.clientInfo.address}</div>
                        <div className="text-gray-500">{caseItem.clientInfo.date}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{caseItem.vehicleInfo.brand}</div>
                        <div className="text-gray-500">{caseItem.vehicleInfo.model}</div>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {caseItem.vehicleInfo.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900">Policy no. {caseItem.policyDetails.policyNo}</div>
                        <div className="text-gray-500">{caseItem.policyDetails.company}</div>
                        <div className="text-gray-500">Due date {caseItem.policyDetails.dueDate}</div>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            caseItem.policyDetails.status === 'Expired' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {caseItem.policyDetails.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900">Source - {caseItem.caseDetails.source}</div>
                        <div className="text-gray-500">Showroom - {caseItem.caseDetails.showroom}</div>
                        <div className="text-gray-500">Assigned to {caseItem.caseDetails.assignedTo}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900">Status - {caseItem.caseUpdate.status}</div>
                        <div className="text-gray-500">Added on {caseItem.caseUpdate.addedOn}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-2">
                        <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                        <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors">
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
    </div>
  );
};

export default InsurancePage;