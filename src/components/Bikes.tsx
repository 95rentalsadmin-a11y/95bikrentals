import React from "react";
import Dio from "../assets/images/dio.jpg";
import Activa from "../assets/images/activa.jpg";
import fascino from "../assets/images/yamaha-fascino.jpg";
import { BiSolidPhoneCall } from "react-icons/bi";

const bikes = [
  {
    image: Dio,
    name: "Honda Dio",
    rent: 499,
  },
  {
    image: Activa,
    name: "Honda Activa",
    rent: 499,
  },
  {
    image: fascino,
    name: "Yamaha Fascino",
    rent: 499,
  },
];

const Bikes = () => {
  const getWhatsappMessage = (model: string) => {
    const message = `Hello, I would like to book the ${model}. Can you confirm its availability and provide details on the rental cost?`;
    return encodeURIComponent(message);
  };
  return (
    <div className="py-12 max-w-6xl px-4 mx-auto">
      <h2 className="text-3xl text-center font-merriweather font-bold">
        Our Fleet
      </h2>
      <div className="flex flex-col md:flex-row gap-8 my-16">
        {bikes.map((bike) => (
          <div className="bg-[#f7f7f7] pb-5 flex flex-col gap-6 rounded-2xl shadow-md bike-card">
            <img
              style={{ minHeight: 250 }}
              className="bg-white rounded-tl-2xl rounded-tr-2xl"
              src={bike.image}
              alt=""
            />
            <div className="flex flex-col text-center ">
              <h6 className="font-rubik font-bold text-lg">{bike.name}</h6>
              <p className="text-gray-700">
                Rent Starting from ₹{bike.rent}/day
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <a
                className="bg-turquoise-blue px-12 py-2 rounded-full text-white hover:bg-lime-green hover:text-black transition-all"
                href={`https://wa.me/917410192695?text=${getWhatsappMessage(
                  bike.name
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Book now
              </a>
              <a
                className="block md:hidden border-2 border-coral rounded-full p-3"
                href="tel:+917410192695"
              >
                <BiSolidPhoneCall fontSize={20} className="text-coral" />
              </a>
            </div>
          </div>
        ))}
        {/* <div className="bg-[#f7f7f7] pb-5 flex flex-col gap-6 rounded-2xl shadow-md bike-card">
          <img className="rounded-tl-2xl rounded-tr-2xl" src={Dio} alt="" />
          <div className="flex flex-col text-center ">
            <h6 className="font-rubik font-bold text-lg">Honda Dio</h6>
            <p className="text-gray-700">Rent Starting from ₹500/day</p>
          </div>
          <div className="flex justify-center gap-4">
            <button className="bg-turquoise-blue px-12 py-2 rounded-full text-white hover:bg-lime-green hover:text-black transition-all">
              Book now
            </button>
            <button className="border-2 border-coral rounded-full p-3">
              <BiSolidPhoneCall fontSize={20} className="text-coral" />
            </button>
          </div>
        </div> */}
        {/* <div className="bg-[#f7f7f7] pb-5 flex flex-col gap-6 rounded-2xl shadow-md bike-card">
          <img className="rounded-tl-2xl rounded-tr-2xl" src={Activa} alt="" />
          <div className="flex flex-col text-center ">
            <h6 className="font-rubik font-bold text-lg"></h6>
            <p className="text-gray-700">Rent Starting from ₹500/day</p>
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/917410192695"
              target="_blank"
              className="bg-turquoise-blue px-12 py-2 rounded-full text-white hover:bg-lime-green hover:text-black transition-all"
            >
              Book now
            </a>
            <a
              className="block md:hidden border-2 border-coral rounded-full p-3"
              href="tel:+917410192695"
            >
              <BiSolidPhoneCall fontSize={20} className="text-coral" />
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Bikes;
