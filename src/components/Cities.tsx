import React from "react";
import nashik from "../assets/images/nashik.jpeg";
import { FaMapMarkerAlt, FaMotorcycle, FaArrowRight } from "react-icons/fa";

const Cities = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-sm font-Inter font-semibold mb-4">
            Our Locations
          </span>
          <h2 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-800 mb-4">
            Ride With Us In
          </h2>
          <p className="text-lg text-gray-600 font-rubik max-w-2xl mx-auto">
            Explore the wine capital of India with our premium bike rentals
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={nashik}
                alt="Nashik"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex items-center gap-2 text-lime-green mb-3">
                <FaMapMarkerAlt />
                <span className="font-Inter font-semibold">Maharashtra, India</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-merriweather font-bold text-white mb-3">
                Nashik
              </h3>
              <p className="text-gray-200 font-rubik max-w-lg mb-6">
                Discover vineyards, temples, and scenic hills. Rent a bike and experience Nashik at your own pace.
              </p>
              <a
                href="/booking"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-green to-sunny-yellow text-black px-6 py-3 rounded-full font-Inter font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <FaMotorcycle />
                <span>Book a Ride in Nashik</span>
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cities;
