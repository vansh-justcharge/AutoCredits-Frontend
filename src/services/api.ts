import axios from "axios"

const API_URL = (import.meta.env.VITE_BACKEND_API_URL || "https://autocredits-backend.onrender.com").replace(/\/$/, "")

interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    isActive: boolean
    emailVerified: boolean
    lastLogin?: Date
}

interface Lead {
    _id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "closed" | "lost"
    source: "website" | "referral" | "walk-in" | "phone" | "email" | "social" | "other"
    service: string
    interest?: {
        car?: string
        make?: string
        model?: string
        year?: number
        budget?: {
            min?: number
            max?: number
        }
    }
    notes?: Array<{
        content: string
        createdBy: string
        createdAt: string
    }>
    assignedTo?: string
    lastContact?: string
    nextFollowUp?: string
    tags?: string[]
    additionalDetails?: string
    createdAt: string
    updatedAt: string
}

interface AuthResponse {
    status: string
    data: {
        token: string
        user: User
    }
}

interface LeadsResponse {
    status: string
    data: {
        leads: {
            data: Lead[]
            total: number
            page: number
            totalPages: number
            hasNextPage: boolean
            hasPrevPage: boolean
        }
    }
}

interface LeadResponse {
    status: string
    data: {
        lead: Lead
    }
}

interface Car {
    _id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    vin: string;
    condition: 'new' | 'used' | 'certified';
    status: 'available' | 'sold' | 'reserved' | 'maintenance';
    features?: string[];
    images?: { url: string; alt: string }[];
    customerName?: string;
    customerContact?: string;
    email?: string;
    purchaseDate?: string;
    paymentStatus?: 'Completed' | 'Pending' | 'Failed';
    color?: string;
    carNumber?: string;
    brand?: string;
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response?.status === 401) {
            // Only redirect if we're not already on the login page
            if (!window.location.pathname.includes('/login')) {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
        }
        return Promise.reject(error)
    },
)

// Auth API calls
export const authAPI = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/api/auth/login", { email, password })
        return response.data
    },
    register: async (userData: {
        email: string
        password: string
        firstName: string
        lastName: string
        role?: string
    }): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/api/auth/register", userData)
        return response.data
    },
    logout: () => {
        localStorage.removeItem("token")
        return api.post("/api/auth/logout")
    },
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<{ status: string; data: { user: User } }>("/api/auth/me")
        return response.data.data.user
    },
}

// Leads API calls
export const leadsAPI = {
    getLeads: async (params?: {
        status?: string
        source?: string
        service?: string
        assignedTo?: string
        page?: number
        limit?: number
    }): Promise<LeadsResponse> => {
        const response = await api.get("/api/leads", { params })
        return response.data
    },

    getLead: async (id: string): Promise<LeadResponse> => {
        const response = await api.get(`/api/leads/${id}`)
        return response.data
    },

    createLead: async (leadData: Omit<Lead, "_id" | "createdAt" | "updatedAt">): Promise<LeadResponse> => {
        const response = await api.post("/api/leads", leadData)
        return response.data
    },

    updateLead: async (id: string, leadData: Partial<Lead>): Promise<LeadResponse> => {
        const response = await api.patch(`/api/leads/${id}`, leadData)
        return response.data
    },

    deleteLead: async (id: string): Promise<void> => {
        await api.delete(`/api/leads/${id}`)
    },

    addNote: async (id: string, content: string): Promise<LeadResponse> => {
        const response = await api.post(`/api/leads/${id}/notes`, { content })
        return response.data
    },

    updateStatus: async (id: string, status: Lead["status"]): Promise<LeadResponse> => {
        const response = await api.patch(`/api/leads/${id}/status`, { status })
        return response.data
    },

    exportLeads: async (format: "csv" = "csv"): Promise<Blob> => {
        const response = await api.get("/api/leads/export", {
            params: { format },
            responseType: "blob",
        })
        return response.data
    },
}

// Cars API calls
export const carsAPI = {
    getCars: async (): Promise<any> => {
        const response = await api.get("/api/cars")
        return response.data
    },

    getCar: async (id: string): Promise<any> => {
        const response = await api.get(`/api/cars/${id}`)
        return response.data
    },

    createCar: async (carData: any): Promise<any> => {
        const response = await api.post("/api/cars", carData)
        return response.data
    },

    updateCar: async (id: string, carData: any): Promise<any> => {
        const response = await api.patch(`/api/cars/${id}`, carData)
        return response.data
    },

    deleteCar: async (id: string): Promise<void> => {
        await api.delete(`/api/cars/${id}`)
    },

    searchCars: async (query: string): Promise<any[]> => {
        const response = await api.get(`/api/cars/search?q=${query}`)
        return response.data
    },
}

// Sales API calls
export const salesAPI = {
    getSales: async (): Promise<any[]> => {
        const response = await api.get("/sales")
        return response.data
    },

    createSale: async (saleData: any): Promise<any> => {
        const response = await api.post("/sales", saleData)
        return response.data
    },

    updateSale: async (id: string, saleData: any): Promise<any> => {
        const response = await api.put(`/sales/${id}`, saleData)
        return response.data
    },

    deleteSale: async (id: string): Promise<void> => {
        await api.delete(`/sales/${id}`)
    },
}

// Users API calls
export const usersAPI = {
    getUsers: async (): Promise<any[]> => {
        const response = await api.get("/users")
        return response.data
    },

    createUser: async (userData: any): Promise<any> => {
        const response = await api.post("/users", userData)
        return response.data
    },

    updateUser: async (id: string, userData: any): Promise<any> => {
        const response = await api.put(`/users/${id}`, userData)
        return response.data
    },

    deleteUser: async (id: string): Promise<void> => {
        await api.delete(`/users/${id}`)
    },
}

export type { User, Lead, AuthResponse, LeadsResponse, LeadResponse, Car }
export default api
