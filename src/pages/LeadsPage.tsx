"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Bell, User, Download, X, LogOutIcon, Plus } from "lucide-react"
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [newLead, setNewLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    source: "reference",
    service: "Car Loan",
    status: "new",
    assignedTo: "",
    lastContact: "",
    additionalDetails: "",
  })
  const [modalError, setModalError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Demo people for assigned to dropdown (using ObjectId format)
  const demoUsers = [
    { id: "507f1f77bcf86cd799439014", name: "Not Assigned" },
  ]

  // Additional details options
  const additionalDetailsOptions = ["", "Follow up needed", "Follow up required"]

  // Fetch leads from the backend
  const fetchLeads = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await leadsAPI.getLeads()
      if (response.status === "success" && response.data.leads.data) {
        console.log("📋 Fetched leads:", response.data.leads.data)
        setLeads(response.data.leads.data)
      } else {
        setError("Invalid response format from server")
        setLeads([])
      }
    } catch (err: any) {
      console.error("❌ Fetch leads error:", err)
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
      console.log("🔍 Viewing lead details for ID:", lead._id)
      const response = await leadsAPI.getLead(lead._id)
      if (response.status === "success" && response.data.lead) {
        console.log("✅ Lead details response:", response.data.lead)
        console.log("🎯 AssignedTo field:", response.data.lead.assignedTo)
        console.log("🎯 AssignedTo type:", typeof response.data.lead.assignedTo)
        setSelectedLead(response.data.lead)
        setIsDetailModalOpen(true)
      } else {
        setModalError("Failed to fetch lead details")
      }
    } catch (err: any) {
      console.error("❌ View details error:", err)
      setModalError(err.response?.data?.message || "Failed to fetch lead details")
    }
  }

  const handleEdit = async (lead: Lead) => {
    try {
      setModalError(null)
      const response = await leadsAPI.getLead(lead._id)
      if (response.status === "success" && response.data.lead) {
        // Convert assignedTo object to ID string for the form
        const leadForEdit = { ...response.data.lead }

        console.log("🔍 EDIT DEBUG - Original lead data:", leadForEdit)
        console.log("🔍 EDIT DEBUG - Original assignedTo:", leadForEdit.assignedTo)
        console.log("🔍 EDIT DEBUG - assignedTo type:", typeof leadForEdit.assignedTo)

        // Handle assignedTo conversion for the form
        if (leadForEdit.assignedTo) {
          if (typeof leadForEdit.assignedTo === "object") {
            // If it's a populated object, extract the ID
            leadForEdit.assignedTo = leadForEdit.assignedTo._id || leadForEdit.assignedTo.id || ""
          } else if (typeof leadForEdit.assignedTo === "string") {
            // If it's already a string ID, keep it as is
            leadForEdit.assignedTo = leadForEdit.assignedTo
          }
        } else {
          // If null or undefined, set to empty string for the form
          leadForEdit.assignedTo = ""
        }

        console.log("🔍 EDIT DEBUG - Processed assignedTo for form:", leadForEdit.assignedTo)
        console.log("✏️ Lead for editing:", leadForEdit)
        setEditingLead(leadForEdit)
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
      setIsSubmitting(true)
      setModalError(null)

      // Debug the assignedTo field specifically
      console.log("🔍 FRONTEND UPDATE DEBUG - editingLead object:", editingLead)
      console.log("🔍 assignedTo field:", editingLead.assignedTo)
      console.log("🔍 assignedTo type:", typeof editingLead.assignedTo)
      console.log("🔍 assignedTo length:", editingLead.assignedTo?.length)

      // Clean up the data before sending
      const leadDataToSend = {
        ...editingLead,
        // Properly handle assignedTo field
        assignedTo: (() => {
          const assignedTo = editingLead.assignedTo
          console.log("🔍 Processing assignedTo:", assignedTo)

          // If it's an empty string or null/undefined, set to null
          if (!assignedTo || assignedTo.toString().trim() === "") {
            console.log("🔍 Setting assignedTo to null (empty)")
            return null
          }

          // If it's a valid string, use it
          const trimmedValue = assignedTo.toString().trim()
          console.log("🔍 Setting assignedTo to:", trimmedValue)
          return trimmedValue
        })(),
      }

      console.log("💾 Sending update data:", leadDataToSend)
      console.log("💾 assignedTo being sent:", leadDataToSend.assignedTo)

      const response = await leadsAPI.updateLead(editingLead._id, leadDataToSend)
      if (response.status === "success" && response.data.lead) {
        console.log("✅ Lead updated successfully:", response.data.lead)
        console.log("✅ Updated assignedTo field:", response.data.lead.assignedTo)
        setLeads(leads.map((lead) => (lead._id === editingLead._id ? response.data.lead : lead)))
        setIsEditModalOpen(false)
        setEditingLead(null)
      }
    } catch (err: any) {
      console.error("❌ Update lead error:", err)
      setModalError(err.response?.data?.message || "Failed to update lead")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddNewLead = async () => {
    try {
      setIsSubmitting(true)
      setModalError(null)

      // Validate required fields
      if (!newLead.firstName || !newLead.lastName || !newLead.email || !newLead.phone) {
        setModalError("Please fill in all required fields")
        return
      }

      // Validate email format
      const emailRegex = /^\S+@\S+\.\S+$/
      if (!emailRegex.test(newLead.email)) {
        setModalError("Please enter a valid email address")
        return
      }

      // Validate phone format (basic validation for 10+ digits)
      const phoneRegex = /^\+?[\d\s-()]{10,}$/
      if (!phoneRegex.test(newLead.phone)) {
        setModalError("Please enter a valid phone number (minimum 10 digits)")
        return
      }

      // Debug the assignedTo field specifically
      console.log("🔍 FRONTEND DEBUG - newLead object:", newLead)
      console.log("🔍 assignedTo field:", newLead.assignedTo)
      console.log("🔍 assignedTo type:", typeof newLead.assignedTo)
      console.log("🔍 assignedTo length:", newLead.assignedTo?.length)
      console.log("🔍 assignedTo trimmed:", newLead.assignedTo?.trim())

      // Clean up the data before sending
      const leadDataToSend = {
        ...newLead,
        // Ensure assignedTo is either a valid ObjectId string or null
        assignedTo: newLead.assignedTo && newLead.assignedTo.trim() !== "" ? newLead.assignedTo.trim() : null,
      }

      console.log("➕ Sending lead data:", leadDataToSend)
      console.log("➕ assignedTo being sent:", leadDataToSend.assignedTo)

      const response = await leadsAPI.createLead(leadDataToSend)
      if (response.status === "success" && response.data.lead) {
        console.log("✅ Lead created successfully:", response.data.lead)
        setLeads([response.data.lead, ...leads])
        setIsAddModalOpen(false)
        resetNewLeadForm()
      }
    } catch (err: any) {
      console.error("❌ Create lead error:", err)
      setModalError(err.response?.data?.message || "Failed to create lead")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetNewLeadForm = () => {
    setNewLead({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      source: "reference",
      service: "Car Loan",
      status: "new",
      assignedTo: "",
      lastContact: "",
      additionalDetails: "",
    })
    setModalError(null)
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      sessionStorage.clear()
      window.location.href = "/login"
    }
  }

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Source", "Service", "Status", "Created Date"]

    const csvData = filteredLeads.map((lead) => [
      `${lead.firstName} ${lead.lastName}`,
      lead.email,
      lead.phone,
      lead.source,
      lead.service,
      lead.status,
      new Date(lead.createdAt || Date.now()).toLocaleDateString(),
    ])

    const csvContent = [headers, ...csvData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

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

  const closeAddModal = () => {
    setIsAddModalOpen(false)
    resetNewLeadForm()
  }

  const handleInputChange = (field: keyof Lead, value: string) => {
    if (editingLead) {
      console.log(`🔍 INPUT CHANGE - Field: ${field}, Value: "${value}", Type: ${typeof value}`)

      setEditingLead({
        ...editingLead,
        [field]: value,
      })

      // Log the updated state for assignedTo specifically
      if (field === "assignedTo") {
        console.log(`🔍 Updated assignedTo in state: "${value}"`)
      }
    }
  }

  const handleNewLeadInputChange = (field: string, value: string) => {
    setNewLead({
      ...newLead,
      [field]: value,
    })
  }

  // Fixed getUserName function with better error handling and fallbacks
  const getUserName = (userId: any): string => {
    console.log("🔍 getUserName called with:", userId, "Type:", typeof userId)

    // Handle null, undefined, or empty values
    if (!userId) {
      console.log("❌ No userId provided")
      return "Not assigned"
    }

    // If userId is an object (populated from backend)
    if (typeof userId === "object" && userId !== null) {
      console.log("📦 UserId is object:", userId)

      // Check for name field first (most common case)
      if (userId.name && typeof userId.name === "string") {
        console.log("✅ Found name field:", userId.name)
        return userId.name
      }

      // Check for firstName and lastName combination
      if (userId.firstName && typeof userId.firstName === "string") {
        const lastName = userId.lastName && typeof userId.lastName === "string" ? ` ${userId.lastName}` : ""
        const fullName = `${userId.firstName}${lastName}`
        console.log("✅ Found firstName/lastName:", fullName)
        return fullName
      }

      // If it's an object but doesn't have expected properties, try to use the _id
      const objectId = userId._id || userId.id
      if (objectId) {
        console.log("🔄 Using _id to lookup:", objectId)
        const user = demoUsers.find((u) => u.id === objectId.toString())
        if (user) {
          console.log("✅ Found user by ID:", user.name)
          return user.name
        }
      }

      // Last resort: stringify the object to see what we have
      console.log("⚠️ Object structure not recognized:", Object.keys(userId))
      return "Unknown User"
    }

    // If userId is a string (ObjectId)
    if (typeof userId === "string" && userId.trim() !== "") {
      console.log("🔤 UserId is string:", userId)
      const user = demoUsers.find((u) => u.id === userId.trim())
      if (user) {
        console.log("🎯 Found user:", user.name)
        return user.name
      } else {
        console.log("❌ No user found for ID:", userId)
        return "Unknown User"
      }
    }

    console.log("❌ Could not resolve user name for:", userId)
    return "Not assigned"
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
            <button onClick={handleLogout} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" title="Logout">
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
              <option value="reference">Reference</option>
              <option value="Walk-in">Walk-in</option>
            </select>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All Services">All Services</option>
              <option value="Car Loan">Loan</option>
              <option value="Insurance">Insurance</option>
              <option value="Car Buy">Car Buy</option>
              <option value="Car Sell">Car Sell</option>
            </select>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2 text-white" />
              Add New Lead
            </button>
          </div>
          <div className="flex items-center">
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

      {/* Add New Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Lead</h2>
              <button onClick={closeAddModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{modalError}</div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newLead.firstName}
                    onChange={(e) => handleNewLeadInputChange("firstName", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-400 bg-slate-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newLead.lastName}
                    onChange={(e) => handleNewLeadInputChange("lastName", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => handleNewLeadInputChange("email", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) => handleNewLeadInputChange("phone", e.target.value)}
                    placeholder="e.g: 8954288547"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Source</label>
                  <select
                    value={newLead.source}
                    onChange={(e) => handleNewLeadInputChange("source", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  >
                    <option value="reference">Reference</option>
                    <option value="walk-in">Walk-in</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <select
                    value={newLead.service}
                    onChange={(e) => handleNewLeadInputChange("service", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  >
                    <option value="Car Loan">Loan</option>
                    <option value="Car Buy">Car Buy</option>
                    <option value="Car Sell">Car Sell</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={newLead.status}
                    onChange={(e) => handleNewLeadInputChange("status", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  >
                    <option value="new">New</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                  <select
                    value={newLead.assignedTo}
                    onChange={(e) => handleNewLeadInputChange("assignedTo", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  >
                    <option value="">Select User</option>
                    {demoUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Contact</label>
                  <input
                    type="date"
                    value={newLead.lastContact}
                    onChange={(e) => handleNewLeadInputChange("lastContact", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                <select
                  value={newLead.additionalDetails}
                  onChange={(e) => handleNewLeadInputChange("additionalDetails", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                >
                  {additionalDetailsOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option || "Select additional details"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeAddModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNewLead}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Adding..." : "Add Lead"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isDetailModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Lead Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                  <p
                    className={`mt-1 ${selectedLead.assignedTo ? "text-gray-900 font-medium" : "text-gray-400 italic"}`}
                  >
                    {getUserName(selectedLead.assignedTo)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Contact</label>
                  <p className="mt-1">
                    {selectedLead.lastContact
                      ? new Date(selectedLead.lastContact).toLocaleDateString()
                      : "No contact recorded"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                  <p className="mt-1">{selectedLead.additionalDetails || "None"}</p>
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
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Lead</h2>
              <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{modalError}</div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={editingLead.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={editingLead.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editingLead.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={editingLead.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Source</label>
                  <select
                    value={editingLead.source}
                    onChange={(e) => handleInputChange("source", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  >
                    <option value="reference">Reference</option>
                    <option value="walk-in">Walk-in</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <select
                    value={editingLead.service}
                    onChange={(e) => handleInputChange("service", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  >
                    <option value="Car Loan">Loan</option>
                    <option value="Car Buy">Car Buy</option>
                    <option value="Car Sell">Car Sell</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editingLead.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  >
                    <option value="new">New</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                  <select
                    value={editingLead.assignedTo || ""}
                    onChange={(e) => handleInputChange("assignedTo", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  >
                    <option value="">Select User</option>
                    {demoUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Contact</label>
                  <input
                    type="date"
                    value={editingLead.lastContact ? new Date(editingLead.lastContact).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange("lastContact", e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                <select
                  value={editingLead.additionalDetails || ""}
                  onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-100 p-2"
                >
                  {additionalDetailsOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option || "Select additional details"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateLead}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
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
