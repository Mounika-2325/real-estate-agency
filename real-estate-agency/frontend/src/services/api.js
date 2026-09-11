import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const fetchProperties = async (params = {}) => {
  try {
    const response = await api.get('/properties', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error.response?.data?.message || error.message || 'Failed to fetch properties';
  }
};

export const fetchPropertyById = async (id) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    throw error.response?.data?.message || error.message || 'Failed to fetch property details';
  }
};

export const fetchAgents = async () => {
  try {
    const response = await api.get('/agents');
    return response.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error.response?.data?.message || error.message || 'Failed to fetch agents';
  }
};

export const fetchAgentById = async (id) => {
  try {
    const response = await api.get(`/agents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching agent ${id}:`, error);
    throw error.response?.data?.message || error.message || 'Failed to fetch agent details';
  }
};

export const submitInquiry = async (inquiryData) => {
  try {
    const response = await api.post('/inquiries', inquiryData);
    return response.data;
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    throw error.response?.data?.message || error.message || 'Failed to submit inquiry';
  }
};

export const fetchInquiries = async () => {
  try {
    const response = await api.get('/inquiries');
    return response.data;
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    throw error.response?.data?.message || error.message || 'Failed to fetch inquiries';
  }
};

export default api;
