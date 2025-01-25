import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLogoHome = createAsyncThunk(
  "home/logoHome",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get/logo");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Logo is not loading!" }
      );
    }
  }
);

export const updateLogoHome = createAsyncThunk(
  "home/updatelogoHome",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/update/logo", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong!" }
      );
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    loading: true,
    error: null,
    logoUrl: "",
    heading: "",
    subheading: "",
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getLogoHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLogoHome.fulfilled, (state, action) => {
        state.logoUrl = action.payload.logoUrl;
        state.heading = action.payload.heading;
        state.subheading = action.payload.subheading;
        state.loading = false;
        state.error = null;
      })
      .addCase(getLogoHome.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(updateLogoHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLogoHome.fulfilled, (state, action) => {
        state.loading = false;
        state.logoUrl = action.payload.logoUrl;
        state.heading = action.payload.heading;
        state.subheading = action.payload.subheading;
        state.error = null;
      })
      .addCase(updateLogoHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Update failed!";
      });
  },
});

export const { clearError } = homeSlice.actions;
export default homeSlice.reducer;
