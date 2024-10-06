import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Async Thunk for login API call
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/travelserver/v1/auth/login",
        credentials
      );
      if(response.data)
      {
        return response.data;
      }
       // Assuming it returns user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for logout API call
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (sessionToken, { dispatch, rejectWithValue }) => {
    const userId=sessionToken._id;
    try {
      const response = await axios.post("http://localhost:3002/travelserver/v1/auth/logout",
        { userId },
        {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      if (response.status == 200 || response.status == 204) {
        dispatch(logout()); // Invoke logout reducer function
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
