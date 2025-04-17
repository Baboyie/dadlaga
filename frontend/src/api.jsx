import axios from "axios";

// Use environment variable with fallback to localhost for development
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || " http://192.168.0.110:5000";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Function to get JWT token from localStorage
const getToken = () => {
  return localStorage.getItem("authToken");
};

// Add JWT token in headers dynamically
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Enhanced request function with better error handling
const makeRequest = async (method, url, data = null) => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const errorPayload = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
    console.error(`API Error (${method} ${url}):`, errorPayload);
    throw errorPayload;
  }
};

// API functions
export const getRooms = () => makeRequest("get", "/api/rooms");
export const addRoom = (roomData) =>
  makeRequest("post", "/api/rooms", roomData);
export const updateRoom = (roomId, roomData) =>
  makeRequest("put", `/api/rooms/${roomId}`, roomData);
export const removeRoom = (roomId) =>
  makeRequest("delete", `/api/rooms/${roomId}`);
export const getRoomById = (roomId) =>
  makeRequest("get", `/api/rooms/${roomId}`);
