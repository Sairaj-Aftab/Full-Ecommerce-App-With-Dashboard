import { createSlice } from "@reduxjs/toolkit";
import {
  createPermission,
  createRule,
  createUser,
  deletePermission,
  deleteRule,
  deleteUser,
  editRule,
  getAllPermission,
  getAllRules,
  getAllUser,
  updatePermissionStatus,
  updateRuleStatus,
  updateUserStatus,
} from "./userApiSllice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: null,
    permissions: null,
    rules: null,
    status: null,
    error: null,
    message: null,
    success: false,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.error = null;
      state.message = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllPermission.fulfilled, (state, action) => {
        state.permissions = action.payload;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permissions = state.permissions ?? [];
        state.permissions.push(action.payload.permission);
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permissions = state.permissions.filter(
          (item) => item._id !== action.payload.permission._id
        );
      })
      .addCase(updatePermissionStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermissionStatus.fulfilled, (state, action) => {
        state.permissions[
          state.permissions.findIndex(
            (data) => data._id == action.payload.permission._id
          )
        ] = action.payload.permission;
        // state.message = action.payload.message;
      })
      .addCase(getAllRules.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllRules.fulfilled, (state, action) => {
        state.rules = action.payload.rules;
      })
      .addCase(createRule.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createRule.fulfilled, (state, action) => {
        state.rules = state.rules ?? [];
        state.rules.push(action.payload.rule);
      })
      .addCase(deleteRule.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRule.fulfilled, (state, action) => {
        state.rules = state.rules.filter(
          (item) => item._id !== action.payload.rule._id
        );
      })
      .addCase(updateRuleStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRuleStatus.fulfilled, (state, action) => {
        state.rules[
          state.rules.findIndex((data) => data._id == action.payload.rule._id)
        ] = action.payload.rule;
        // state.message = action.payload.message;
      })
      .addCase(editRule.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editRule.fulfilled, (state, action) => {
        state.rules[
          state.rules.findIndex((data) => data._id == action.payload.rule._id)
        ] = action.payload.rule;
        state.message = action.payload.message;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.success = true;
        state.message = action.payload.message;
        state.users = state.users ?? [];
        state.users.push(action.payload.user);
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.users[
          state.users.findIndex((data) => data._id == action.payload.user._id)
        ] = action.payload.user;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (data) => data._id !== action.payload.user._id
        );
      });
  },
});

// Export Selector
export const getAllDataOfUser = (state) => state.user;

// Actions
export const { setMessageEmpty } = userSlice.actions;

// exports
export default userSlice.reducer;
