import axiosInstance from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAboutMe = createAsyncThunk(
    "aboutMe/aboutMe",
    async (_, { rejectWithValue }) => {
        try {
        const response = await axiosInstance.get("/get/aboutMe");
        return response.data;
        } catch (error) {
        return rejectWithValue(
            error.response?.data || { message: "About Me data is not loading!" }
        );
        }
    }
    );

export const updateAboutMe = createAsyncThunk(
    "aboutMe/updateAboutMe",
    async (credentials, { rejectWithValue }) => {
        try {
        const response = await axiosInstance.put(
            "/update/aboutMe",
            credentials
        );
        return response.data;
        } catch (error) {
        return rejectWithValue(
            error.response?.data || { message: "Failed to update About Me data!" }
        );
        }
    }
);

const aboutMeSlice = createSlice({
    name: "aboutMe",
    initialState: {
        about: [],
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
        .addCase(getAboutMe.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAboutMe.fulfilled, (state, action) => {
            state.about = action.payload;
            state.loading = false;
        })
        .addCase(getAboutMe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
        .addCase(updateAboutMe.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateAboutMe.fulfilled, (state, action) => {
            state.about = action.payload;
            state.loading = false;
        })
        .addCase(updateAboutMe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
});

export const { clearError } = aboutMeSlice.actions;
export default aboutMeSlice.reducer;