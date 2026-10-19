import React from "react";
import { Link } from "react-router-dom";
import shine from '../assets/images/shine_100.jpg';
import Activa from "../assets/images/activa_6g.png";
import fascino from "../assets/images/fascino.jpeg";
import Destini from "../assets/images/destini.jpeg";
import Aether from "../assets/images/aether.jpeg";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaMotorcycle, FaWhatsapp, FaClock, FaArrowRight } from "react-icons/fa";

const bikes = [
  {
    image: shine,
    name: "Honda Shine 100 BS6",
    rent12hrs: 425,
    rent24hrs: 580,
  },
  {
    image: Activa,
    name: "Honda Activa BS6",
    rent12hrs: 425,
    rent24hrs: 580,
  },
  {
    image: fascino,
    name: "Yamaha Fascino BS6",
    rent12hrs: 425,
    rent24hrs: 580,
  },
  {
    image: Destini,
    name: "Hero Destini BS6 Xtec",
    rent12hrs: 425,
    rent24hrs: 580,
  },
  {
    image: Aether,
    name: "Aether 450X",
    rent12hrs: 425,
    rent24hrs: 580,
  },
];

const Bikes = () => {
  const getWhatsappMessage = (model: string) => {
    const message = `Hello, I would like to book the ${model}. Can you confirm its availability and provide details on the rental cost?`;
    return encodeURIComponent(message);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-lime-green/20 text-lime-700 px-4 py-1.5 rounded-full text-sm font-Inter font-semibold mb-4">
            Premium Fleet
          </span>
          <h2 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-800 mb-4">
            Choose Your Ride
          </h2>
          <p className="text-lg text-gray-600 font-rubik max-w-2xl mx-auto">
            From daily commuters to premium scooters, we have the perfect bike for every journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes.map((bike, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <img
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  src={bike.image}
                  alt={bike.name}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-Inter font-bold text-gray-700 flex items-center gap-1">
                  <FaMotorcycle className="text-lime-green" />
                  Available
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-merriweather font-bold text-xl text-gray-800 mb-4">
                  {bike.name}
                </h3>
                  {/* PARKED FOR LATER: 12-hour rental plan.
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-1">
                      <FaClock />
                      <span>12 Hours</span>
                    </div>
                    <p className="font-Inter font-bold text-gray-800">₹{bike.rent12hrs}</p>
                  </div>
                  */}
                  <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-1">
                      <FaClock />
                      <span>24 Hours</span>
                    </div>
                    <p className="font-Inter font-bold text-gray-800">₹{bike.rent24hrs}</p>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-2">
                  <p className="px-2 pb-2 text-[11px] font-Inter font-semibold uppercase tracking-wider text-gray-400">
                    Reserve your ride
                  </p>
                  {/* PARKED FOR LATER: online booking entry point. */}
                  {/* <Link
                    className="w-full bg-gradient-to-r from-lime-green to-sunny-yellow text-black py-3 rounded-xl font-Inter font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    to="/booking"
                  >
                    <FaMotorcycle />
                    <span>Book Online</span>
                    <FaArrowRight className="text-xs" />
                  </Link> */}
                  <div className="flex items-center gap-2 my-2 text-[10px] font-Inter font-semibold uppercase tracking-widest text-gray-400">
                    <span className="h-px flex-1 bg-gray-200" />
                    <span>or book directly</span>
                    <span className="h-px flex-1 bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <a
                      className="w-full bg-gradient-to-r from-turquoise-blue to-blue-600 text-white py-2.5 px-2 rounded-xl font-Inter font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    href={`https://wa.me/917410192695?text=${getWhatsappMessage(bike.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    >
                      <FaWhatsapp />
                      <span>Book via WhatsApp</span>
                    </a>
                    <a
                      className="w-11 border border-coral text-coral rounded-xl flex items-center justify-center hover:bg-coral hover:text-white transition-all"
                      href="tel:+917410192695"
                      aria-label="Call us"
                      title="Call us"
                    >
                      <BiSolidPhoneCall fontSize={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bikes;
