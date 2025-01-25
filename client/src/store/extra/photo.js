import axiosInstance from "@/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  loading: false,
  error: null,
};

export const getPhotos = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get("/get/images");
    dispatch(setImages(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const uploadPhoto = (photoData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post("/upload/images", photoData);
    dispatch(addImage(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deletePhoto = (photoUrl) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axiosInstance.delete("/delete/image", { data: { url: photoUrl } });
    dispatch(removeImage(photoUrl));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action) => {
      state.images = state.images.filter(
        (image) => image.url !== action.payload
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setImages, addImage, removeImage, setError } =
  photoSlice.actions;
export default photoSlice.reducer;
