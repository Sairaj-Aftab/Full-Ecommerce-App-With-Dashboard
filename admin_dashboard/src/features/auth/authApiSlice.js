import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register User
export const createUser = createAsyncThunk("auth/createUser", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/auth/register`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Login User
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/auth/login`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/auth/logout`,
      "",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Get LogedIn User
export const getLogedInUser = createAsyncThunk("auth/logedInUser", async () => {
  try {
    const response = await axios.get(`http://localhost:5050/api/v1/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update User
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/auth/update/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
