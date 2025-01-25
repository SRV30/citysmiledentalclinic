import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHomeContact = createAsyncThunk(
  "homeContact/fetchHomeContact",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get/home/contact");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch contact data!" }
      );
    }
  }
);

export const updateHomeContact = createAsyncThunk(
  "homeContact/updateHomeContact",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/update/home/contact",
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update contact data!" }
      );
    }
  }
);

const homeContactSlice = createSlice({
  name: "homeContact",
  initialState: {
    contactInfo: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearState(state) {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchHomeContact.fulfilled, (state, action) => {
        state.contactInfo = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchHomeContact.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Failed to fetch contact data!";
        state.loading = false;
      })

      .addCase(updateHomeContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateHomeContact.fulfilled, (state, action) => {
        state.contactInfo = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(updateHomeContact.rejected, (state, action) => {
        state.error =
          action.payload?.message || "Failed to update contact data!";
        state.loading = false;
        state.success = false;
      });
  },
});

export const { clearState } = homeContactSlice.actions;
export default homeContactSlice.reducer;
