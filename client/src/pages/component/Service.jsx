import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getService } from "@/store/home/service";
import { CircularProgress } from "@mui/material";

const ViewService = () => {
  const dispatch = useDispatch();
  const serviceContainerRef = useRef(null);

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  const serviceList = useSelector((state) => state.service);
  const { loading, error, services = [] } = serviceList;

  useEffect(() => {}, [services]);

  return (
    <div id="viewservice" className="main3 bg-blue-100 py-8 px-4">
      <main className="flex-grow container mx-auto">
        <h2 className="service-header text-3xl font-semibold text-blue-800 mb-4">
          Our Services
        </h2>
        <p className="service-header text-2xl font-semibold text-black mb-4">
          Comprehensive dental solutions
        </p>
        <p className="service-header text-lg text-black mb-4">
          City Smile Dental Clinic offers a wide range of dental services
          including preventive care, cosmetic dentistry, and emergency
          treatments. Experience excellence in dental care with us.
        </p>

        {loading ? (
          <div className="flex justify-center py-4">
            <CircularProgress />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            ref={serviceContainerRef}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  {service.title} <IoIosArrowForward className="ml-1" />
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewService;
