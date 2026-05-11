import React from "react";
// import Dio from "../assets/images/dio.jpg";
import shine from '../assets/images/shine_100.jpg';
import Activa from "../assets/images/activa_6g.png";
import fascino from "../assets/images/fascino.jpeg";
import Destini from "../assets/images/destini.jpeg";
import Aether from "../assets/images/aether.jpeg";
import { BiSolidPhoneCall } from "react-icons/bi";

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
  }, {
    image: Destini,
    name: "Hero Destini BS6 Xtec",
    rent12hrs: 425,
    rent24hrs: 580,
  },{
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
    <div className="py-12 max-w-6xl px-4 mx-auto">
      <h2 className="text-3xl text-center font-merriweather font-bold">
        Our Fleet
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        {bikes.map((bike) => (
          <div className="bg-[#f7f7f7] pb-5 flex flex-col gap-6 rounded-2xl shadow-md bike-card w-full">
            <div className="bg-white rounded-tl-2xl rounded-tr-2xl overflow-hidden p-3">
              <img
                style={{ height: 250, width: '100%', objectFit: 'cover' }}
                src={bike.image}
                alt={bike.name}
              />
            </div>
            <div className="flex flex-col text-center ">
              <h6 className="font-rubik font-bold text-lg">{bike.name}</h6>
              <p className="text-gray-700">
                <span>Rents:</span><br />
                <span className="font-bold">12 Hours:</span> ₹{bike.rent12hrs} |{" "}
                <span className="font-bold">24 Hours:</span> ₹{bike.rent24hrs}
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
