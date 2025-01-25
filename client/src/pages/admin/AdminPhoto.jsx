import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPhoto, deletePhoto, getPhotos } from "../../store/extra/photo";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { CircularProgress } from "@mui/material";

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.photo);
  const [imageUrl, setImageUrl] = useState("");
  const galleryRef = useRef(null);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  useEffect(() => {
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 }
      );
    }
  }, [images]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      toast.error("Please enter a valid image URL.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    dispatch(uploadPhoto({ url: imageUrl }))
      .then(() => toast.success("Image uploaded successfully!"))
      .catch(() => toast.error("Error uploading image!"));
    setImageUrl("");
  };

  const handleDelete = (photoUrl) => {
    dispatch(deletePhoto(photoUrl))
      .then(() => toast.success("Image deleted successfully!"))
      .catch(() => toast.error("Error deleting image!"));
  };

  if (loading)
    return <CircularProgress />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Photo Gallery
      </h1>
      <div className="flex flex-col items-center mb-10 bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-500 mb-4 text-center">
          Upload Your Image on Cloudinary
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Use Cloudinary to host your image and paste the URL below.
        </p>
        <button
          onClick={() => window.open("https://cloudinary.com/", "_blank")}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300"
        >
          Visit Cloudinary Website
        </button>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}

      <form onSubmit={handleUpload} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-1/3 mr-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Add Image
        </button>
      </form>

      <div
        ref={galleryRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={image.url}
                alt="uploaded"
                className="rounded-lg mb-4"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <button
                onClick={() => handleDelete(image.url)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No images available
          </p>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
