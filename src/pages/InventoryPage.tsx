"use client"

import React, { useState, useEffect } from "react"
import { Search, Bell, User, Settings, LogOut } from 'lucide-react'
import { carsAPI } from "../services/api"
import type { Car } from "../services/api"
import AddCar from "./AddCar"
import EditCarModal from "./EditCarModal"
import ViewCarModal from "./ViewCarModal"


const InventoryPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddCar, setShowAddCar] = useState(false)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBrand, setFilterBrand] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterColor, setFilterColor] = useState("")
  const [priceRange, setPriceRange] = useState("")

  // Fetch cars from the backend
  const fetchCars = async () => {
    try {
      const response = await carsAPI.getCars()
      if (response && Array.isArray(response.data)) {
        setCars(response.data)
      } else {
        console.error("API response for cars is not an array:", response)
        setCars([])
      }
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch cars")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  // Filter and sort cars based on search and filters
  const filteredAndSortedCars = React.useMemo(() => {
    const filtered = cars.filter((car) => {
      // Search by customer name
      const matchesSearch = searchQuery === "" || car.customerName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesBrand = filterBrand === "" || car.Brand.toLowerCase() === filterBrand.toLowerCase()
      const matchesStatus = filterStatus === "" || car.status.toLowerCase() === filterStatus.toLowerCase()
      const matchesColor = filterColor === "" || car.color?.toLowerCase().includes(filterColor.toLowerCase())
      const matchesPrice =
        priceRange === "" ||
        (priceRange === "low" && car.price < 1000000) ||
        (priceRange === "medium" && car.price >= 1000000 && car.price < 5000000) ||
        (priceRange === "high" && car.price >= 5000000)

      return matchesSearch && matchesBrand && matchesStatus && matchesColor && matchesPrice
    })

    // Sort by customer name
    filtered.sort((a, b) => a.customerName.localeCompare(b.customerName))

    return filtered
  }, [cars, searchQuery, filterBrand, filterStatus, filterColor, priceRange])

  const handleSortByName = () => {
    console.log("Sorting by name")
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

  const handleAddCar = async (carData: Omit<Car, "id">) => {
    try {
      const response = await carsAPI.createCar(carData)
      setCars([...cars, response.data])
      setShowAddCar(false)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add car")
    }
  }

  const handleEditCar = async (id: string, carData: Car) => {
    try {
      const response = await carsAPI.updateCar(id, carData)
      setCars(cars.map((car) => (car._id === id ? response : car)))
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update car")
    }
  }

  const handleDeleteCar = async (id: string) => {
    try {
      await carsAPI.deleteCar(id)
      setCars(cars.filter((car) => car._id !== id))
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete car")
    }
  }

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car)
    setIsViewModalOpen(true)
  }

  const handleEdit = (car: Car) => {
    setSelectedCar(car)
    setIsEditModalOpen(true)
  }

  const handleUpdateCar = async (updatedCar: Car) => {
    try {
      await carsAPI.updateCar(updatedCar._id, updatedCar)
      fetchCars()
      setIsEditModalOpen(false)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update car")
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          {/* Header with border bottom */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold">Inventory Management</h1>

            {/* Right side icons */}
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
              <LogOut className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          </div>

          {/* Controls Row */}
          <div className="flex justify-between items-center gap-4">
            {/* Left side - Search and Add Car button */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>

              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
                onClick={() => setShowAddCar(true)}
              >
                Add New Car
              </button>
            </div>

            {/* Right side - Filters */}
            <div className="flex items-center gap-3">
              {/* Sort By Button */}
              <button
                onClick={handleSortByName}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 outline-none"
              >
                Sort by Name
              </button>

              {/* Brand Filter */}
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Brands</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Ford">Ford</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="pending">Pending</option>
                <option value="maintenance">Maintenance</option>
              </select>

              {/* Color Filter */}
              <select
                value={filterColor}
                onChange={(e) => setFilterColor(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Colors</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="silver">Silver</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="gray">Gray</option>
              </select>

              {/* Price Range Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Prices</option>
                <option value="low">Under ₹10L</option>
                <option value="medium">₹10L - ₹50L</option>
                <option value="high">Over ₹50L</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAndSortedCars.length} of {cars.length} cars
            {searchQuery && <span className="ml-2">for "{searchQuery}"</span>}
          </div>
        </div>

        {/* Modals */}
        {showAddCar && <AddCar isOpen={showAddCar} onClose={() => setShowAddCar(false)} onCarAdded={fetchCars} />}

        {isEditModalOpen && selectedCar && (
          <EditCarModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            car={selectedCar}
            onUpdate={handleUpdateCar}
          />
        )}

        {isViewModalOpen && selectedCar && (
          <ViewCarModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} car={selectedCar} />
        )}

        {/* Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
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
              {filteredAndSortedCars.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    {searchQuery || filterBrand || filterStatus || filterColor || priceRange
                      ? "No cars match your search criteria"
                      : "No cars found"}
                  </td>
                </tr>
              ) : (
                filteredAndSortedCars.map((car) => (
                  <tr key={car._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {car.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.Brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.carNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.model}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{car.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.condition || "Good"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          car.status === "available"
                            ? "bg-green-100 text-green-800"
                            : car.status === "sold"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                          onClick={() => handleViewDetails(car)}
                        >
                          View
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors"
                          onClick={() => handleEdit(car)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                          onClick={() => handleDeleteCar(car._id)}
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
    </div>
  )
}

export default InventoryPage