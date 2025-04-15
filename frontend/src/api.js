// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Function to get JWT token from localStorage
const getToken = () => {
  return localStorage.getItem("adminToken");
};

// Add JWT token in headers dynamically
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all rooms
export const getRooms = async () => {
  try {
    const response = await api.get("/api/rooms", {
      headers: getAuthHeaders(), // Add JWT token to headers
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

// Add a room
export const addRoom = async (roomData) => {
  try {
    const response = await api.post("/api/rooms", roomData, {
      headers: getAuthHeaders(), // Add JWT token to headers
    });
    return response.data;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

// Update a room
export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await api.put(`/api/rooms/${roomId}`, roomData, {
      headers: getAuthHeaders(), // Add JWT token to headers
    });
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

// Remove a room
export const removeRoom = async (roomId) => {
  try {
    const response = await api.delete(`/api/rooms/${roomId}`, {
      headers: getAuthHeaders(), // Add JWT token to headers
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};
