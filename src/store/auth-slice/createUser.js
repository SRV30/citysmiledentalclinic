import axiosInstance from "@/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "createUser/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/admin/create/user", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create user!" }
      );
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create user";
      });
  },
});

export const { clearError } = createUserSlice.actions;
export const selectUser = (state) => state.user;
export default createUserSlice.reducer;
