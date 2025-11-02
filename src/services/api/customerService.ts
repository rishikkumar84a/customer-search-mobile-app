import axios, { AxiosError } from 'axios';
import { Customer, SearchCriteria } from '../../types/customer';
import { API_BASE_URL, ENDPOINTS } from './config';

/**
 * Customer API Service
 * 
 * Handles all API interactions for customer data.
 * Uses axios for HTTP requests with proper error handling.
 */

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiError {
  message: string;
  status?: number;
}

/**
 * Search for customers based on criteria
 * 
 * @param criteria - Search criteria (firstName, lastName, dateOfBirth)
 * @returns Promise<Customer[]> - Array of matching customers
 * @throws ApiError - If the request fails
 */
export const searchCustomers = async (
  criteria: SearchCriteria
): Promise<Customer[]> => {
  try {
    // Build query parameters from search criteria
    const params: Record<string, string> = {};
    
    if (criteria.firstName) {
      params.firstName_like = criteria.firstName;
    }
    if (criteria.lastName) {
      params.lastName_like = criteria.lastName;
    }
    if (criteria.dateOfBirth) {
      params.dateOfBirth = criteria.dateOfBirth;
    }

    const response = await api.get<Customer[]>(ENDPOINTS.CUSTOMERS, { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get all customers
 * 
 * @returns Promise<Customer[]> - Array of all customers
 * @throws ApiError - If the request fails
 */
export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await api.get<Customer[]>(ENDPOINTS.CUSTOMERS);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get a single customer by ID
 * 
 * @param id - Customer ID
 * @returns Promise<Customer> - Customer data
 * @throws ApiError - If the request fails
 */
export const getCustomerById = async (id: string): Promise<Customer> => {
  try {
    const response = await api.get<Customer>(`${ENDPOINTS.CUSTOMERS}/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handle API errors and convert them to a consistent format
 */
function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      // Server responded with error status
      return {
        message: axiosError.response.data?.message || 'Server error occurred',
        status: axiosError.response.status,
      };
    } else if (axiosError.request) {
      // Request made but no response received
      return {
        message: 'Network error. Please check your connection and ensure the API server is running.',
        status: 0,
      };
    }
  }
  
  // Generic error
  return {
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
  };
}

export default {
  searchCustomers,
  getAllCustomers,
  getCustomerById,
};
