"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Bell, User, Settings, Download, X, LogOutIcon } from "lucide-react"
import { leadsAPI } from "../services/api"
import type { Lead } from "../services/api"

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSource, setSelectedSource] = useState("All Sources")
  const [selectedService, setSelectedService] = useState("All Services")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [assignedDepartment, setAssignedDepartment] = useState("Sales")
  const [updateStatus, setUpdateStatus] = useState("Follow up")
  const [modalError, setModalError] = useState<string | null>(null)

  // Fetch leads from the backend
  const fetchLeads = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await leadsAPI.getLeads()
      if (response.status === "success" && response.data.leads.data) {
        setLeads(response.data.leads.data)
      } else {
        setError("Invalid response format from server")
        setLeads([])
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch leads")
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const filteredLeads = leads.filter((lead) => {
    const fullName = `${lead.firstName} ${lead.lastName}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)

    const matchesSource =
      selectedSource === "All Sources" || lead.source === selectedSource.toLowerCase().replace(" ", "-")
    const matchesService = selectedService === "All Services" || lead.service === selectedService

    return matchesSearch && matchesSource && matchesService
  })

  const handleViewDetails = async (lead: Lead) => {
    try {
      setModalError(null)
      const response = await leadsAPI.getLead(lead._id)
      if (response.status === "success" && response.data.lead) {
        setSelectedLead(response.data.lead)
        setIsDetailModalOpen(true)
      } else {
        setModalError("Failed to fetch lead details")
      }
    } catch (err: any) {
      setModalError(err.response?.data?.message || "Failed to fetch lead details")
    }
  }

  const handleEdit = async (lead: Lead) => {
    try {
      setModalError(null)
      const response = await leadsAPI.getLead(lead._id)
      if (response.status === "success" && response.data.lead) {
        setEditingLead(response.data.lead)
        setIsEditModalOpen(true)
      } else {
        setModalError("Failed to fetch lead details")
      }
    } catch (err: any) {
      setModalError(err.response?.data?.message || "Failed to fetch lead details")
    }
  }

  const handleDelete = async (leadId: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        setError(null)
        await leadsAPI.deleteLead(leadId)
        setLeads(leads.filter((lead) => lead._id !== leadId))
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to delete lead")
      }
    }
  }

  const handleUpdateLead = async () => {
    if (!editingLead) return

    try {
      const response = await leadsAPI.updateLead(editingLead._id, editingLead)
      if (response.status === "success" && response.data.lead) {
        setLeads(leads.map((lead) => (lead._id === editingLead._id ? response.data.lead : lead)))
        setIsEditModalOpen(false)
        setEditingLead(null)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update lead")
    }
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      // Clear any stored authentication data
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      sessionStorage.clear()

      // Redirect to login page or home page
      window.location.href = "/login" // or wherever your login page is
    }
  }

  const exportToCSV = () => {
    // Define CSV headers
    const headers = ["Name", "Email", "Phone", "Source", "Service", "Status", "Created Date"]

    // Convert filtered leads to CSV format
    const csvData = filteredLeads.map((lead) => [
      `${lead.firstName} ${lead.lastName}`,
      lead.email,
      lead.phone,
      lead.source,
      lead.service,
      lead.status,
      new Date(lead.createdAt || Date.now()).toLocaleDateString(),
    ])

    // Combine headers and data
    const csvContent = [headers, ...csvData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `leads-export-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const closeModal = () => {
    setIsDetailModalOpen(false)
    setSelectedLead(null)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingLead(null)
  }

  const handleInputChange = (field: keyof Lead, value: string) => {
    if (editingLead) {
      setEditingLead({
        ...editingLead,
        [field]: value,
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading leads...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error</p>
          <p>{error}</p>
          <button onClick={fetchLeads} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-semibold text-gray-900">Leads Management</h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              title="Logout"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All Sources">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Walk-in">Walk-in</option>
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
              <option value="Social">Social</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All Services">All Services</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Business Loan">Business Loan</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-2 text-white" />
              Export
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredLeads.length} of {leads.length} leads
          {searchQuery && <span className="ml-2">for "{searchQuery}"</span>}
          {(selectedSource !== "All Sources" || selectedService !== "All Services") && (
            <span className="ml-2">
              with filters: {selectedSource !== "All Sources" && `Source: ${selectedSource}`}
              {selectedSource !== "All Sources" && selectedService !== "All Services" && ", "}
              {selectedService !== "All Services" && `Service: ${selectedService}`}
            </span>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    {searchQuery || selectedSource !== "All Sources" || selectedService !== "All Services"
                      ? "No leads match your search criteria"
                      : "No leads found"}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {lead.firstName[0]}
                              {lead.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {lead.firstName} {lead.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          lead.status === "new"
                            ? "bg-green-100 text-green-800"
                            : lead.status === "contacted"
                              ? "bg-blue-100 text-blue-800"
                              : lead.status === "qualified"
                                ? "bg-purple-100 text-purple-800"
                                : lead.status === "proposal"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : lead.status === "negotiation"
                                    ? "bg-orange-100 text-orange-800"
                                    : lead.status === "closed"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-red-100 text-red-800"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                          onClick={() => handleViewDetails(lead)}
                        >
                          View
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors"
                          onClick={() => handleEdit(lead)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                          onClick={() => handleDelete(lead._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {isDetailModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Lead Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1">
                    {selectedLead.firstName} {selectedLead.lastName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Source</label>
                  <p className="mt-1">{selectedLead.source}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <p className="mt-1">{selectedLead.service}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1">{selectedLead.status}</p>
                </div>
              </div>
              {selectedLead.notes && selectedLead.notes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <div className="space-y-2">
                    {selectedLead.notes.map((note, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <p className="text-sm">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          By {note.createdBy} on {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Lead</h2>
              <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={editingLead.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={editingLead.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editingLead.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={editingLead.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Source</label>
                  <select
                    value={editingLead.source}
                    onChange={(e) => handleInputChange("source", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="walk-in">Walk-in</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="social">Social</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <select
                    value={editingLead.service}
                    onChange={(e) => handleInputChange("service", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Car Loan">Car Loan</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Business Loan">Business Loan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editingLead.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed">Closed</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateLead}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadsPage
