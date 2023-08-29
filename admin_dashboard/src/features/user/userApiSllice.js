import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Permission
export const getAllPermission = createAsyncThunk(
  "user/getAllPermission",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/permission`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Create Permission
export const createPermission = createAsyncThunk(
  "user/createPermission",
  async (name) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/permission/create`,
        { name },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update permission status
export const updatePermissionStatus = createAsyncThunk(
  "user/updatePermissionStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/permission/status/${id}`,
        { status: status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete Permission
export const deletePermission = createAsyncThunk(
  "user/deletePermission",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/permission/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get All Rules
export const getAllRules = createAsyncThunk("user/getRules", async () => {
  try {
    const response = await axios.get(`http://localhost:5050/api/v1/rule`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create Role
export const createRule = createAsyncThunk("user/createRule", async (data) => {
  console.log(data);
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/rule/create`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Delete Rule
export const deleteRule = createAsyncThunk("user/deleteRule", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/rule/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update Rule status
export const updateRuleStatus = createAsyncThunk(
  "user/updateRuleStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/rule/status/${id}`,
        { status: status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Edit Rule Info
export const editRule = createAsyncThunk(
  "user/editRule",
  async ({ id, name, permissions }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/rule/${id}`,
        { name, permissions },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Create User
export const getAllUser = createAsyncThunk("user/getAllUser", async () => {
  try {
    const response = await axios.get(`http://localhost:5050/api/v1/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create User
export const createUser = createAsyncThunk("user/createUser", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/user/create`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// Update Status status
export const updateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/user/status/${id}`,
        { status: status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Delete User
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/user/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
