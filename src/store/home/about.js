import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAboutHome = createAsyncThunk(
  "about/aboutHome",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get/home/about");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "About data is not loading!" }
      );
    }
  }
);

export const updateAboutHome = createAsyncThunk(
  "about/updateaboutHome",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/update/home/about",
        credentials
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update About data!" }
      );
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    heading: "",
    subheading: "",
    description1: "",
    description2: "",
    imageUrl: "",
    loading: true,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAboutHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAboutHome.fulfilled, (state, action) => {
        state.subheading = action.payload.subheading;
        state.heading = action.payload.heading;
        state.description1 = action.payload.description1;
        state.description2 = action.payload.description2;
        state.imageUrl = action.payload.imageUrl;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAboutHome.rejected, (state, action) => {
        state.error = action.payload || {
          message: "Failed to fetch About data!",
        };
        state.loading = false;
      })

      .addCase(updateAboutHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAboutHome.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload.imageUrl;
        state.heading = action.payload.heading;
        state.subheading = action.payload.subheading;
        state.description1 = action.payload.description1;
        state.description2 = action.payload.description2;
        state.error = null;
      })
      .addCase(updateAboutHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update About data!";
      });
  },
});

export const { clearError } = aboutSlice.actions;
export default aboutSlice.reducer;
