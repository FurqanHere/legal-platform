// services/ApiService.js
import axios from 'axios';
import { toast } from 'react-toastify';
// Create an Axios instance with default configurations
const language = localStorage.getItem('admin_lang') || 'en'; // Default to 'en' if not set

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5004/EmiratiHub/api', // Use REACT_APP for environment variables in React
  headers: {
    'Accept': 'application/json',
    'language': language,
  },
});

// Main ApiService function for making API requests
const ApiService = {
  async request({ method, url, data, headers = {} }) {
    const token = localStorage.getItem('admin')
      ? JSON.parse(localStorage.getItem('admin')).auth_token
      : null;
    
    const config = {
      method,
      url,
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };

    // Add data to URL as query parameters for GET requests
    if (method === 'GET' && data) {
      config.params = data;
    } else if (data) {
      config.data = data;
    }

    try {
      // Call the API
      const response = await apiClient(config);
      return response;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          // Unauthorized: redirect to login
          toast.error(data.message);
          localStorage.removeItem('admin');
          window.location.href=process.env.REACT_APP_BASE_PATH+'/login';
        } else if (status === 500) {
          // Internal Server Error
          toast.error('An internal server error occurred.');
        } else if (status === 422) {
          // Unprocessable Entity
          toast.error(data.message);
        } else{
          toast.error(data.message);
        }
      } else if (error.request) {
        // No response received
        toast.error('Network error: Please try again later.');
      } else {
        // Other errors
        toast.error('An error occurred: ' + error.message);
      }

      // Re-throw the error for further handling if needed
      throw error;
    }
  },
};

export default ApiService;
