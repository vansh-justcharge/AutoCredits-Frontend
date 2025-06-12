// import { useState } from "react";
// import { Search, Bell, User } from "lucide-react";

// export default function UserManagementPage() {
//   const [activeTab, setActiveTab] = useState("Overview");
  
//   // Sample user data
//   const users = [
//     { name: "Evelyn Harper", email: "evelyn@harper.com", role: "Viewer", view: true, approve: false, reject: true },
//     { name: "Jasper Lin", email: "jasper@lin.com", role: "Approver", view: false, approve: true, reject: true },
//     { name: "Lydia Quinn", email: "lydia@quinn.com", role: "Admin", view: true, approve: true, reject: false },
//     { name: "Arjun Patel", email: "arjun@patel.com", role: "Viewer", view: true, approve: false, reject: false },
//     { name: "Maya Chen", email: "maya@chen.com", role: "Approver", view: true, approve: true, reject: true },
//     { name: "Noah Kim", email: "noah@kim.com", role: "Admin", view: true, approve: false, reject: false },
//     { name: "Olivia Zhang", email: "olivia@zhang.com", role: "Viewer", view: true, approve: true, reject: true },
//     { name: "Lucas Nguyen", email: "lucas@nguyen.com", role: "Approver", view: true, approve: true, reject: true },
//     { name: "Sophia Garcia", email: "sophia@garcia.com", role: "Admin", view: true, approve: true, reject: true },
//   ];
  
//   // Sample activity data
//   const activities = [
//     { name: "Evelyn Harper", action: "Approval 8978", timestamp: "2023-07-01 10:00 AM" },
//     { name: "Jasper Lin", action: "Viewed loan 0977", timestamp: "2023-07-01 10:00 AM" },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen font-sans">
//       {/* Header */}
//       <header className="bg-white shadow p-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-medium text-gray-800">User Management</h1>
//             <span className="ml-2 text-gray-500">▼</span>
//           </div>
//           <div className="flex space-x-4">
//             <button className="p-2 rounded-full bg-gray-100">
//               <Search size={20} />
//             </button>
//             <button className="p-2 rounded-full bg-gray-100">
//               <Bell size={20} />
//             </button>
//             <button className="p-2 rounded-full bg-gray-100">
//               <User size={20} />
//             </button>
//           </div>
//         </div>
//         <div className="flex items-center mt-2 text-gray-500">
//           <div className="flex">
//             {/* User avatars placeholders */}
//             <div className="w-6 h-6 rounded-full bg-gray-300"></div>
//             <div className="w-6 h-6 rounded-full bg-gray-400 -ml-2"></div>
//             <div className="w-6 h-6 rounded-full bg-gray-500 -ml-2"></div>
//             <div className="w-6 h-6 rounded-full bg-gray-600 -ml-2"></div>
//           </div>
//           <span className="ml-2">Inshra, Jai +12000 others</span>
//         </div>
        
//         <nav className="mt-4 border-b border-gray-200">
//           <div className="flex space-x-6">
//             <button 
//               className={`pb-4 ${activeTab === "Overview" ? "border-b-2 border-gray-800 font-medium" : ""}`}
//               onClick={() => setActiveTab("Overview")}
//             >
//               Overview
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto py-6 px-4">
//         {/* Add New User */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-medium mb-6">Add New User</h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Full Name</label>
//               <input 
//                 type="text" 
//                 placeholder="Enter full name" 
//                 className="w-full p-3 border border-gray-300 rounded bg-gray-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input 
//                 type="email" 
//                 placeholder="Enter email address" 
//                 className="w-full p-3 border border-gray-300 rounded bg-gray-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Password</label>
//               <input 
//                 type="password" 
//                 placeholder="Enter email address" 
//                 className="w-full p-3 border border-gray-300 rounded bg-gray-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Select Role</label>
//               <input 
//                 type="text" 
//                 placeholder="Enter role" 
//                 className="w-full p-3 border border-gray-300 rounded bg-gray-50"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button 
//                 type="button"
//                 className="px-4 py-2 bg-gray-600 text-white rounded"
//               >
//                 Add User
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* User List and Permissions */}
//         <section className="mb-10">
//           <h2 className="text-2xl font-medium mb-6">User List and Permissions</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left border-b border-gray-200">
//                   <th className="pb-3 font-medium">
//                     Name <span className="text-gray-500">▼</span>
//                   </th>
//                   <th className="pb-3 font-medium">
//                     Email <span className="text-gray-500">▼</span>
//                   </th>
//                   <th className="pb-3 font-medium">
//                     Role <span className="text-gray-500">▼</span>
//                   </th>
//                   <th className="pb-3 font-medium">
//                     View <span className="text-gray-500">▼</span>
//                   </th>
//                   <th className="pb-3 font-medium">
//                     Approve <span className="text-gray-500">▼</span>
//                   </th>
//                   <th className="pb-3 font-medium">
//                     Reject <span className="text-gray-500">▼</span>
//                   </th>
//                   <th className="pb-3 font-medium">
//                     Action <span className="text-gray-500">▼</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user, index) => (
//                   <tr key={index} className="border-b border-gray-200">
//                     <td className="py-4">{user.name}</td>
//                     <td className="py-4">{user.email}</td>
//                     <td className="py-4">{user.role}</td>
//                     <td className="py-4">
//                       <div className={`w-10 h-6 rounded-full ${user.view ? "bg-green-500" : "bg-gray-300"} relative`}>
//                         <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 ${user.view ? "right-0.5" : "left-0.5"}`}></div>
//                       </div>
//                     </td>
//                     <td className="py-4">
//                       <div className={`w-10 h-6 rounded-full ${user.approve ? "bg-green-500" : "bg-gray-300"} relative`}>
//                         <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 ${user.approve ? "right-0.5" : "left-0.5"}`}></div>
//                       </div>
//                     </td>
//                     <td className="py-4">
//                       <div className={`w-10 h-6 rounded-full ${user.reject ? "bg-green-500" : "bg-gray-300"} relative`}>
//                         <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 ${user.reject ? "right-0.5" : "left-0.5"}`}></div>
//                       </div>
//                     </td>
//                     <td className="py-4">
//                       <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">
//                         Revoke access
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* User Activity */}
//         <section>
//           <h2 className="text-2xl font-medium mb-6">User Activity</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left border-b border-gray-200">
//                   <th className="pb-3 font-medium">
//                     Name <span className="text-gray-500">▼</span>
//                   </th>
//                   <th className="pb-3 font-medium text-right">
//                     Action <span className="text-gray-500">▼</span>
//                   </th>
//                   <th className="pb-3 font-medium text-right">
//                     Timestamp <span className="text-gray-500">▼</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {activities.map((activity, index) => (
//                   <tr key={index} className="border-b border-gray-200">
//                     <td className="py-4">{activity.name}</td>
//                     <td className="py-4 text-right">{activity.action}</td>
//                     <td className="py-4 text-right">{activity.timestamp}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }



import { useState } from "react";
import Navbar from './Navbar';

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  
  const users = [
    { name: "Evelyn Harper", email: "evelyn@harper.com", role: "Viewer", view: true, approve: false, reject: true },
    { name: "Jasper Lin", email: "jasper@lin.com", role: "Approver", view: false, approve: true, reject: true },
    { name: "Lydia Quinn", email: "lydia@quinn.com", role: "Admin", view: true, approve: true, reject: false },
    { name: "Arjun Patel", email: "arjun@patel.com", role: "Viewer", view: true, approve: false, reject: false },
    { name: "Maya Chen", email: "maya@chen.com", role: "Approver", view: true, approve: true, reject: true },
    { name: "Noah Kim", email: "noah@kim.com", role: "Admin", view: true, approve: false, reject: false },
    { name: "Olivia Zhang", email: "olivia@zhang.com", role: "Viewer", view: true, approve: true, reject: true },
    { name: "Lucas Nguyen", email: "lucas@nguyen.com", role: "Approver", view: true, approve: true, reject: true },
    { name: "Sophia Garcia", email: "sophia@garcia.com", role: "Admin", view: true, approve: true, reject: true },
  ];
  
  const activities = [
    { name: "Evelyn Harper", action: "Approval 8978", timestamp: "2023-07-01 10:00 AM" },
    { name: "Jasper Lin", action: "Viewed loan 0977", timestamp: "2023-07-01 10:00 AM" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar
        title="User Management"
        tabs={['Overview']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="container mx-auto py-6 px-4">
        <section className="mb-10">
          <h2 className="text-2xl font-medium mb-6">Add New User</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter full name" 
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                placeholder="Enter email address" 
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Role</label>
              <input 
                type="text" 
                placeholder="Enter role" 
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Add User
              </button>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-medium mb-6">User List and Permissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 font-medium">
                    Name <span className="text-gray-500">▼</span>
                  </th>
                  <th className="pb-3 font-medium">
                    Email <span className="text-gray-500">▼</span>
                  </th>
                  <th className="pb-3 font-medium">
                    Role <span className="text-gray-500">▼</span>
                  </th>
                  <th className="pb-3 font-medium">
                    View <span className="text-gray-500">▼</span>
                  </th>
                  <th className="pb-3 font-medium">
                    Approve <span className="text-gray-500">▼</span>
                  </th>
                  <th className="pb-3 font-medium">
                    Reject <span className="text-gray-500">▼</span>
                  </th>
                  <th className="pb-3 font-medium">
                    Action <span className="text-gray-500">▼</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4">{user.name}</td>
                    <td className="py-4">{user.email}</td>
                    <td className="py-4">{user.role}</td>
                    <td className="py-4">
                      <div className={`w-10 h-6 rounded-full ${user.view ? "bg-green-500" : "bg-gray-300"} relative`}>
                        <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 ${user.view ? "right-0.5" : "left-0.5"}`}></div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className={`w-10 h-6 rounded-full ${user.approve ? "bg-green-500" : "bg-gray-300"} relative`}>
                        <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 ${user.approve ? "right-0.5" : "left-0.5"}`}></div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className={`w-10 h-6 rounded-full ${user.reject ? "bg-green-500" : "bg-gray-300"} relative`}>
                        <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 ${user.reject ? "right-0.5" : "left-0.5"}`}></div>
                      </div>
                    </td>
                    <td className="py-4">
                      <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">
                        Revoke access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-6">User Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 font-medium">
                    Name <span className="text-gray-500">▼</span>
                  </th>
                  <th className="pb-3 font-medium text-right">
                    Action <span className="text-gray-500">▼</span>
                  </th>
                  <th className="pb-3 font-medium text-right">
                    Timestamp <span className="text-gray-500">▼</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4">{activity.name}</td>
                    <td className="py-4 text-right">{activity.action}</td>
                    <td className="py-4 text-right">{activity.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}