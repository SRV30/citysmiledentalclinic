import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosPhotos } from "react-icons/io";
import { getPhotos } from "@/store/extra/photo";

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Photo = () => {
  const dispatch = useDispatch();
  const imageFetch = useSelector((state) => state.photo);
  const { loading, error, images } = imageFetch;

  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  useEffect(() => {
    if (images && images.length > 0) {
      setShuffledImages(shuffleArray(images));
    }
  }, [images]);

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="container mx-auto my-20">
        <div className="flex justify-center bg-white p-6 rounded-lg shadow-md mb-8">
          <IoIosPhotos className="mr-2 text-blue-600" />
          <a
            href="/photo"
            className="text-blue-600 hover:text-blue-900 transition-colors duration-300 ease-in-out"
          >
            Photo Gallery
          </a>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {shuffledImages.map((image, index) => (
              <a
                key={image._id}
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-auto hover:opacity-80 transition-opacity duration-300 ease-in-out"
              >
                <img
                  src={image.url}
                  alt="photo"
                  className="w-full h-auto rounded-md shadow-md"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Photo;
