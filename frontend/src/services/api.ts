import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Generation API
export const generationAPI = {
    generate: async (prompt: string, negativePrompt?: string, parameters?: any) => {
        const response = await api.post('/generations/generate', {
            prompt,
            negativePrompt,
            parameters
        });
        return response.data;
    },

    getMyGenerations: async (page = 1, limit = 20) => {
        const response = await api.get(`/generations/my?page=${page}&limit=${limit}`);
        return response.data;
    },

    getGeneration: async (id: string) => {
        const response = await api.get(`/generations/${id}`);
        return response.data;
    },

    deleteGeneration: async (id: string) => {
        const response = await api.delete(`/generations/${id}`);
        return response.data;
    },

    togglePublic: async (id: string) => {
        const response = await api.patch(`/generations/${id}/public`);
        return response.data;
    },

    getPublicGenerations: async (limit = 8) => {
        const response = await api.get(`/generations/public?limit=${limit}`);
        return response.data;
    }
};

// User API
export const userAPI = {
    getProfile: async () => {
        const response = await api.get('/users/me');
        return response.data;
    }
};

// Admin API
export const adminAPI = {
    login: async (email: string, password: string) => {
        const response = await api.post('/admin/login', { email, password });
        return response.data;
    },

    getDashboardStats: async () => {
        const response = await api.get('/dashboard/stats');
        return response.data;
    },

    getAllGenerations: async (page = 1, limit = 20, filters?: any) => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined) params.append(key, filters[key]);
            });
        }
        const response = await api.get(`/dashboard/generations?${params}`);
        return response.data;
    },

    approveGeneration: async (id: string, approved: boolean) => {
        const response = await api.patch(`/dashboard/generations/${id}/approve`, { approved });
        return response.data;
    },

    toggleFeatured: async (id: string) => {
        const response = await api.patch(`/dashboard/generations/${id}/featured`);
        return response.data;
    },

    deleteGeneration: async (id: string) => {
        const response = await api.delete(`/dashboard/generations/${id}`);
        return response.data;
    },

    getAllUsers: async (page = 1, limit = 20) => {
        const response = await api.get(`/dashboard/users?page=${page}&limit=${limit}`);
        return response.data;
    }
};

export default api;
