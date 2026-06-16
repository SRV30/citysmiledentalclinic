import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAdminTestimonials = createAsyncThunk(
  "testimonial/getAdminTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/testimonials");
      return response.data.testimonials;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Testimonials are not loading!" }
      );
    }
  }
);

export const getPublicTestimonials = createAsyncThunk(
  "testimonial/getPublicTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/testimonials");
      return response.data.testimonials;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Testimonials are not loading!" }
      );
    }
  }
);

export const createTestimonial = createAsyncThunk(
  "testimonial/createTestimonial",
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/testimonial/new", testimonialData);
      return response.data.testimonial;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create testimonial!" }
      );
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonial/updateTestimonial",
  async ({ id, testimonialData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/testimonial/${id}`, testimonialData);
      return response.data.testimonial;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update testimonial!" }
      );
    }
  }
);

export const updateTestimonialStatus = createAsyncThunk(
  "testimonial/updateTestimonialStatus",
  async ({ id, isApproved }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/testimonial/status/${id}`, { isApproved });
      return response.data.testimonial;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update status!" }
      );
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonial/deleteTestimonial",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/testimonial/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete testimonial!" }
      );
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testimonials: [],
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
      .addCase(getAdminTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminTestimonials.fulfilled, (state, action) => {
        state.testimonials = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAdminTestimonials.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to fetch testimonials!";
        state.loading = false;
      })

      // Get Public Testimonials
      .addCase(getPublicTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPublicTestimonials.fulfilled, (state, action) => {
        state.testimonials = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPublicTestimonials.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to fetch testimonials!";
        state.loading = false;
      })

      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.testimonials.unshift(action.payload);
        state.loading = false;
      })

      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
        state.loading = false;
      })

      .addCase(updateTestimonialStatus.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
        state.loading = false;
      })

      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(t => t._id !== action.payload);
        state.loading = false;
      });
  },
});

export const { clearError } = testimonialSlice.actions;
export default testimonialSlice.reducer;
