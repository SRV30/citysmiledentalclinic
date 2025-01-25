import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getService = createAsyncThunk(
  "service/getService",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get/service");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Service data is not loading!" }
      );
    }
  }
);

export const createService = createAsyncThunk(
  "service/createService",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/create/service", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create service!" }
      );
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/delete/service/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete service!" }
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getService.pending, (state) => {
        state.loading = true;
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getService.rejected, (state, action) => {
        state.error = action.payload || {
          message: "Failed to fetch service data!",
        };
        state.loading = false;
      })

      .addCase(createService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createService.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to create service!";
        state.loading = false;
      })

      .addCase(deleteService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (service) => service.id !== action.meta.arg
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete service!";
        state.loading = false;
      });
  },
});

export const { clearError } = serviceSlice.actions;
export default serviceSlice.reducer;
